---
title: "O nobreak, a interface fantasma e o NUT"
date: 2025-09-10
description: "A novela para conseguir a interface de comunicação de um nobreak TS Shara comprado pela internet e como configurá-lo com o NUT."
---
Quando reorganizei o homelab este ano, decidi que era hora de ter um nobreak de verdade: senoidal, de rack e capaz de conversar com os servidores, para que eles se desligassem sozinhos numa queda de energia prolongada. A escolha foi um [nobreak senoidal de rack da TS Shara](https://tsshara.com.br/produto/nobreak-ups-rack-senoidal-universal-1200va-2bs-7ah/) (2U, 1200 VA), comprado pelo Mercado Livre no fim de março. Na página do produto, o argumento decisivo estava lá: "Comunicação inteligente sob demanda USB, RS-232 e SNMP".

*Se quiser pular a história, [vá direto para a parte técnica](#a-arquitetura).*

## A interface fantasma

{{< figura img="img/notas/ts-shara-1200va-pagina.png" alt="Captura da página do nobreak UPS Rack Senoidal Universal 1200VA no site da TS Shara, com a característica Comunicação inteligente sob demanda USB, RS-232 e SNMP destacada" legenda="Trechos da página do modelo no site da TS Shara, em 29 de setembro de 2026 (destaque meu)." >}}

O que a página não explica é o que significa esse "sob demanda": em compras feitas por revenda, a interface não vem instalada. Descobri isso só depois de receber o equipamento, num comentário de um vídeo de divulgação da própria fabricante. Para ter acesso a ela, é preciso solicitá-la diretamente ao fabricante. Foi o que fiz. No dia seguinte à entrega, após contato telefônico, o atendimento me orientou a levar o nobreak a uma assistência autorizada em Brasília e garantiu o envio gratuito do módulo USB. A partir daí, começou a espera. A assistência não conseguia retorno da fábrica, e a peça não chegava.

Em maio, a explicação foi um problema com os Correios, com a promessa de reenvio por Sedex no dia seguinte. Em julho, com quase 100 dias de espera sem poder usar o equipamento como planejado, abri uma reclamação no Reclame AQUI e reforcei o pedido pelo formulário do site. Só então as coisas andaram: o fabricante me contatou pedindo desculpas, respondeu à reclamação no site, e por fim, enviou o módulo para a assistência. A instalação e liberação foram rápidas.

Se você pretende comprar um desses pela internet, já sabe dos paranauês. Desde o primeiro contato, percebi que não era um procedimento corriqueiro e até parecia que me faziam um favor.

## Montagem alternativa

A montagem nem seria digna de nota se não fosse um detalhe: eu não tenho rack, nem pretendo. Comprei esse modelo porque não gosto dos monstrengos que vendem para o consumidor padrão – me lembra um estabilizador, só que maior, mais pesado e mais feio. Tentei instalá-lo embaixo do prateleirão que faço de mesa, com um suporte de micro-ondas, e deu muito, mas muito errado. Não havia bucha e parafuso que impedisse o nobreak de envergar para frente, não tinha como prender direito, e era um inferno de mexer. Em um desses momentos que fazem a pessoa questionar as escolhas na vida, o troço tombou e foi parar no chão. Mas sobreviveu, e agora está em cima do prateleirão, que ainda não envergou a ponto de me deixar preocupado (mas estou de olho).

## Do outro lado do cabo

Com o módulo instalado, a porta USB do nobreak aparece no Linux como uma porta serial virtual da STMicroelectronics (`0483:5740`, "Virtual COM Port"), que fala o protocolo Megatec/Q1. No [NUT (Network UPS Tools)](https://networkupstools.org/), isso significa usar o driver `blazer_ser` (o `nutdrv_qx` com `protocol = megatec` é a alternativa). O ponto de partida foi o repositório [ups-nut-tsshara](https://github.com/mrmodolo/ups-nut-tsshara), que documenta um modelo irmão da mesma linha.

Duas lições práticas:

- **Dê um nome fixo à porta.** O dispositivo pode aparecer como `/dev/ttyACM0` hoje e `/dev/ttyACM1` amanhã. Uma regra udev baseada em fabricante, produto e número de série cria um link estável (`/dev/ttyTSSHARA0`).
- **Não confie na porcentagem de carga nem na autonomia estimada.** Nesse modelo, `battery.charge` e `battery.runtime` não são confiáveis via NUT. A política de desligamento deve se basear nos eventos de status (`ONBATT`, `ONLINE`, `LOWBATT`): faltou energia, dispara um cronômetro; se a energia não voltar antes do fim, o servidor aciona o desligamento forçado (FSD) de todas as máquinas.

## A arquitetura

O nobreak fica ligado por USB a um Raspberry Pi 4, que roda o servidor NUT (`upsd`, porta 3493) e é o único que conversa diretamente com o aparelho. As demais máquinas (outro Raspberry Pi e os dois servidores Unraid) são clientes de rede: acompanham o estado do nobreak e se desligam quando o servidor manda. No mesmo Pi, o [PeaNUT](https://github.com/Brandawg93/PeaNUT) oferece um painel web, e o `upslog` registra tensão, frequência, carga e status a cada minuto.

A política é simples: 120 segundos em bateria (o suficiente para ignorar oscilações rápidas) e o Pi aciona o FSD. Se o nobreak sinalizar bateria baixa antes disso, o desligamento é imediato. A seguir, três jeitos de montar isso: com Ansible, à mão ou no Unraid.

## 1. Via Ansible

Toda essa configuração está no role `nut-tools` da versão pública do meu repositório de infraestrutura, o [ansible-homelab](https://github.com/lmagdiel/ansible-homelab). O role decide o que instalar pelo inventário:

```ini
[nut_server]
pi4

[nut_clients]
pizero
```

No servidor, ele instala `nut-server`, `nut-client` e `nut-monitor`, aplica a regra udev, gera todos os arquivos de `/etc/nut` a partir de templates, cria o serviço de log (`nut-logger`), instala o script do `upssched` e sobe o PeaNUT em Docker. Nos clientes, instala só o `nut-client` e aponta o `upsmon` para o servidor. As variáveis principais ficam nos defaults do role:

```yaml
nut_ups_name: tsshara
nut_ups_driver: blazer_ser
nut_onbatt_shutdown_delay: '120'
nut_udev_id_vendor: '0483'
nut_udev_id_product: '5740'
nut_udev_serial: '00000000001A'   # confira o do seu aparelho
nut_udev_symlink: ttyTSSHARA0
nut_upsd_port: 3493
nut_upsmon_password: "{{ vault_nut_upsmon_password }}"
nut_upsmon_secondary_password: "{{ vault_nut_upsmon_secondary_password }}"
```

As senhas ficam no Ansible Vault. Para aplicar só essa parte:

```bash
ansible-playbook run_homelab.yml -l pi_servers --tags nut
```

## 2. Avulso (Debian ou Raspberry Pi OS)

Sem Ansible, o resultado é o mesmo com alguns arquivos à mão. No computador que vai ficar ligado ao nobreak:

```bash
sudo apt install nut
lsusb | grep 0483:5740
udevadm info -a -n /dev/ttyACM0 | grep -m1 'ATTRS{serial}'
```

Crie `/etc/udev/rules.d/99-ups-tsshara.rules` (em uma linha só) com o número de série encontrado:

```
SUBSYSTEM=="tty", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="5740", ATTRS{serial}=="SEU_SERIAL", GROUP="nut", MODE="0660", SYMLINK+="ttyTSSHARA0"
```

Depois, rode `sudo udevadm control --reload-rules && sudo udevadm trigger` e configure o NUT:

```ini
# /etc/nut/nut.conf
MODE=netserver

# /etc/nut/ups.conf
maxretry = 3
[tsshara]
  driver = blazer_ser
  port = /dev/ttyTSSHARA0
  pollinterval = 15
  desc = "TS Shara"

# /etc/nut/upsd.conf
LISTEN 0.0.0.0 3493
MAXAGE 25

# /etc/nut/upsd.users
[upsmon]
  password = "SENHA_PRIMARIA"
  upsmon primary
[upsmonsecondary]
  password = "SENHA_SECUNDARIA"
  upsmon secondary
```

No `/etc/nut/upsmon.conf`, o essencial é:

```
MONITOR tsshara@localhost 1 upsmon "SENHA_PRIMARIA" primary
SHUTDOWNCMD "/sbin/shutdown -h +0"
NOTIFYCMD /usr/sbin/upssched
NOTIFYFLAG ONBATT SYSLOG+WALL+EXEC
NOTIFYFLAG ONLINE SYSLOG+WALL+EXEC
NOTIFYFLAG LOWBATT SYSLOG+WALL+EXEC
DEADTIME 15
HOSTSYNC 15
POWERDOWNFLAG /etc/killpower
```

E o cronômetro fica no `/etc/nut/upssched.conf`:

```
CMDSCRIPT /usr/sbin/upssched-cmd
PIPEFN /run/nut/upssched.pipe
LOCKFN /run/nut/upssched.lock
AT ONBATT * START-TIMER onbatt_shutdown 120
AT ONLINE * CANCEL-TIMER onbatt_shutdown online
AT LOWBATT * EXECUTE lowbatt_shutdown
```

O script `/usr/sbin/upssched-cmd` (dono `root:nut`, permissão `0750`) só precisa chamar `/usr/sbin/upsmon -c fsd` nos casos `onbatt_shutdown` e `lowbatt_shutdown` e registrar os demais com `logger`. Reinicie com `sudo systemctl restart nut-server nut-monitor` e confira com `upsc tsshara@localhost`.

Nos clientes, basta `sudo apt install nut-client`, `MODE=netclient` no `nut.conf` e, no `upsmon.conf`, uma linha apontando para o IP do servidor (e não para o próprio cliente, senão ele nunca recebe o FSD):

```
MONITOR tsshara@IP_DO_SERVIDOR 1 upsmonsecondary SENHA_SECUNDARIA secondary
SHUTDOWNCMD "/sbin/shutdown -h now"
```

Dois ajustes finos que valem a pena:

- **Tensão da bateria.** O `blazer_ser` estima a carga a partir da tensão, e os valores padrão (`default.battery.voltage.high/low/nominal`) dependem de como o seu aparelho reporta a bateria: o role usa valores de 12 V; o repositório de referência, de 24 V. Veja o que aparece em `battery.voltage` no `upsc` e ajuste. Mesmo assim, trate a porcentagem como indicativa.
- **Corte de energia no final.** Com o `POWERDOWNFLAG`, o servidor, ao terminar de desligar, pede ao nobreak que corte a saída e religue quando a energia voltar. Se algum cliente demora para desligar (caso do Unraid), aumente o `offdelay` no `ups.conf` para que o corte não o pegue no meio do caminho.

## 3. No Unraid

O suporte nativo do Unraid a nobreaks (em Settings › UPS Settings) é baseado no apcupsd, feito para aparelhos APC, e não serve aqui. Deixe-o desativado e instale, pela Community Applications, o plugin [Network UPS Tools (NUT) for UNRAID](https://github.com/desertwitch/NUT-unRAID). Como a USB do nobreak fica no Raspberry Pi, o Unraid entra como cliente de rede:

- no plugin, ative o NUT em modo cliente de rede (netclient), apontando para o IP do Pi, porta 3493, nome `tsshara` e o usuário secundário;
- não dependa dos gatilhos do plugin por porcentagem de bateria ou autonomia, que leem os mesmos números pouco confiáveis. Quem decide é o servidor, e o FSD chega ao Unraid pela rede. Se quiser uma rede de segurança local, use o gatilho por tempo em bateria, com um valor um pouco maior que o do servidor;
- confira em Settings › Disk Settings o tempo limite de desligamento: parar o array, as VMs e os contêineres leva tempo, e tudo precisa caber na autonomia do nobreak (e no `offdelay`, se você usa o corte de energia);
- teste pelo terminal do Unraid com `upsc tsshara@IP_DO_PI` e, num dia calmo, tire o nobreak da tomada para ver a cadeia inteira funcionar.

## Conclusão

Com a interface instalada, a parte técnica fluiu bem, mas precisei dedicar um bom tempo para testar e configurar tudo. Fica o registro aqui para quem precisar.
