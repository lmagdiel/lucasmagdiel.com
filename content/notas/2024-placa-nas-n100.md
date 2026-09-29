---
title: "Placa NAS com N100, tintim por tintim"
date: 2024-03-20
description: "A ficha completa da placa-mãe mini-ITX com Intel N100, seis portas SATA e quatro de 2,5 GbE, comprada para o servidor principal."
---
Comprei hoje, no AliExpress, a placa-mãe para o servidor principal: uma placa NAS mini-ITX com Intel N100, da CWWK (também vendida como Topton), por R$ 1.198,50 (US$ 224,99). Placas assim juntam em 17 × 17 cm o que antes pedia placas de expansão: 6 portas SATA, 2 slots M.2 NVMe e 4 portas de rede de 2,5 Gb, com um processador que gasta pouca energia. O problema é que a informação sobre elas fica espalhada entre o anúncio, fóruns e a serigrafia da própria placa, então juntei aqui a ficha completa.

{{< figura img="img/notas/placa-nas-n100.jpg" alt="Placa-mãe mini-ITX preta com placa de cobre sobre o processador, quatro portas de rede, seis conectores SATA e dois slots M.2, ao lado de um pente de memória DDR5 e de um cooler" legenda="A placa na imagem do anúncio." >}}

## Ficha técnica

### Identificação

- Fabricante (OEM): CWWK (ChangWang), também vendida como Topton; no anúncio, marca SZJN
- Código na placa: CW-ADLN-NAS, versão 1.0.0
- Origem: China continental

### Processador e memória

- Intel N100 (Alder Lake-N) soldado na placa (BGA), com placa de cobre sobre o chip e furação para coolers LGA 115X (75 × 75 mm)
- 1 slot DDR5 SO-DIMM: 4800 MT/s nativos, compatível com módulos de 5200 e 5600 sem ECC, até 32 GB

### Armazenamento

- 6 portas SATA 3.0: a SATA1 é nativa do N100; as SATA 2 a 6 passam por uma controladora JMicron JMB585
- 2 slots M.2 2280 NVMe, cada um em PCIe 3.0 x1
- 1 slot PCIe 3.0 x1, que divide as linhas com o segundo M.2: é um ou outro, não dá para usar os dois ao mesmo tempo

### Rede

- 4 portas RJ-45 de 2,5 Gb, com controladoras Intel I226-V
- Por ser uma controladora recente, pede kernel atualizado: Proxmox VE 8.x, OPNsense 23.x ou posterior, pfSense CE 2.7 ou posterior, TrueNAS Scale e distribuições Linux recentes

### Vídeo, USB e áudio

- HDMI 2.1 e DisplayPort 1.4b, ambos até 4K a 60 Hz
- 1 USB 3.0 tipo A, 2 USB 2.0 tipo A e 1 USB-C (na velocidade do USB 2.0)
- Áudio Realtek ALC897, com conector P3 (3,5 mm) combinado de fone e microfone

### Formato e energia

- Mini-ITX, 17 × 17 cm
- Conector ATX de 24 pinos e conector de 12 V de 4 pinos: os dois são obrigatórios para a placa ligar
- Jumper de modo AT/ATX (no modo AT, a placa liga sozinha assim que recebe energia)

### Conectores internos

- 2 conectores de ventoinha PWM (CPU_FAN e SYS_FAN)
- Conector de TPM (padrão ASUS, SPI de 14 pinos)
- Conector USB 2.0 e 2 portas USB 2.0 tipo A internas
- Conector de painel frontal (FPANEL)

## Antes de montar

Um aviso do anúncio que vale repetir: a bateria CR2032 do CMOS vem removida, por causa das regras de transporte aéreo internacional, então é preciso comprar uma e instalar.

## O anúncio

Anúncios desse tipo mudam ou saem do ar sem aviso, então guardei uma [cópia do anúncio no momento da compra](/arquivos/placa-nas-n100-anuncio.pdf) (PDF, 2,4 MB), com as fotos e a descrição completa do vendedor.

## Atualização (setembro de 2026)

Dois anos e meio depois, a placa segue firme no servidor principal. A configuração completa está na página do [setup](/tecnologia/setup/).
