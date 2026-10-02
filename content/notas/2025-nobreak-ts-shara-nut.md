---
title: "O nobreak, a interface fantasma e o NUT"
date: 2025-09-10
description: "A novela para conseguir a interface de comunicação de um nobreak TS Shara comprado pela internet e como configurá-lo com o NUT."
assuntos: ["Homelab", "Equipamentos", "Guias"]
---
Quando reorganizei o homelab este ano, decidi que era hora de ter um nobreak de verdade: senoidal, de rack e capaz de conversar com os servidores, para que eles se desligassem sozinhos numa queda de energia prolongada. A escolha foi um [nobreak senoidal de rack da TS Shara](https://tsshara.com.br/produto/nobreak-ups-rack-senoidal-universal-1200va-2bs-7ah/) (2U, 1200 VA), comprado pelo Mercado Livre no fim de março. Na página do produto, o argumento decisivo estava lá: "Comunicação inteligente sob demanda USB, RS-232 e SNMP".

*Se quiser pular a história, [vá direto para a parte técnica](#a-arquitetura).*

## A interface fantasma

{{< figura img="img/notas/ts-shara-1200va-pagina.png" ampliar="true" alt="Captura da página do nobreak UPS Rack Senoidal Universal 1200VA no site da TS Shara, com a característica Comunicação inteligente sob demanda USB, RS-232 e SNMP destacada" legenda="Trechos da página do modelo no site da TS Shara, em 29 de setembro de 2025 (destaque meu)." >}}

O que a página não explica é o que significa esse "sob demanda". Tudo indica que é "opcional de fábrica, sob encomenda": o [manual da linha](https://tsshara.com.br/wp-content/uploads/2021/12/Nobreak-UPS-Rack-para-Site.pdf) usa a mesma expressão para o disjuntor ("Circuit Breaker sob demanda") e, na parte de comunicação, fala em conector "USB ou RS-232 (sob demanda)", com o cabo comprado à parte e o software de gerenciamento Power NT. 

O que isso quer dizer na prática eu só descobri depois de receber o equipamento. Ao pesquisar o [vídeo de lançamento da linha](https://www.youtube.com/watch?v=dX3LxBBmAPk), me deparei com a resposta da própria fabricante a um usuário com essa mesma dúvida: "Significa que o nobreak se for comprado em uma revenda, não possui de série essa comunicação."

{{< figura img="img/notas/ts-shara-comentario.png" ampliar="true" alt="Captura de comentário no YouTube: alguém pergunta o que significa sob demanda, e a TS Shara responde que o nobreak comprado em revenda não tem a comunicação de série, que é preciso enviá-lo a uma assistência técnica para a instalação e que dá para comprá-lo com a comunicação de fábrica pelo setor de vendas" legenda="A resposta da TS Shara no vídeo de lançamento, em captura de setembro de 2025 (nome do usuário omitido)." >}}

Ou seja: quem já comprou precisa despachar o nobreak para uma assistência técnica para instalar a interface; quem ainda vai comprar pode encomendá-lo já com a porta instalada direto da fábrica, pelo setor de vendas. No meu caso, restava a primeira opção. No dia seguinte à entrega, o SAC me orientou por telefone a levar o equipamento a uma assistência autorizada em Brasília e garantiu o envio gratuito do módulo USB. A partir daí, começou a novela. A assistência não conseguia retorno da fábrica, e a peça nunca chegava.

Em maio, justificaram o atraso por um problema com os Correios, prometendo reenvio via Sedex no dia seguinte. Em julho, já acumulando quase 100 dias de espera sem conseguir usar o equipamento como planejado, abri uma reclamação no Reclame AQUI e reforcei a cobrança pelo formulário do site. Só então o caso andou: a fabricante me ligou com um pedido de desculpas, respondeu publicamente à queixa e, por fim, enviou o módulo para a assistência técnica. A instalação e a liberação foram rápidas.

Se você planeja comprar um desses pela internet, já sabe dos paranauês. Desde o primeiro contato, ficou claro que aquele não era um procedimento de rotina — a sensação era de que estavam me fazendo um enorme favor.

## Montagem alternativa

A montagem nem seria digna de nota se não fosse um detalhe: eu não tenho rack, nem pretendo ter. Comprei esse modelo simplesmente porque detesto os monstrengos voltados ao consumidor doméstico — lembram um estabilizador comum, só que maiores, mais pesados e mais feios. 

Minha primeira ideia foi instalá-lo sob a bancada que uso como mesa, aproveitando um suporte de micro-ondas. Deu muito, mas muito errado. Não havia bucha nem parafuso que impedissem o equipamento de envergar para a frente, o acesso para cabeamento era horrível e a estrutura ficou instável. Em um daqueles episódios em que a gente repensa as próprias escolhas de vida, o trambolho tombou e foi direto para o chão. Felizmente sobreviveu. Hoje ele repousa sobre a bancada, que ainda não curvou a ponto de me preocupar (mas sigo de olho).