---
title: "Tecnologia"
larga: true
description: "Homelab, self-hosting e ferramentas aplicadas à tradução e à legendagem."
---
Tecnologia é o meu principal interesse fora das línguas e, cada vez mais, parte do trabalho com elas. Curso Tecnologia em Sistemas para Internet no Senac e uso o que aprendo em projetos que juntam as duas áreas.

## Homelab e self-hosting

{{< ilustracao img="img/tecnologia/homelab.svg" alt="Ilustração: rede doméstica com servidores, Raspberry Pi, desktop e switch, ligada por VPN a servidores na nuvem" >}}

No que hoje parece um passado distante, tive meu primeiro PC por volta do ano 2000, aos 15 anos, um modesto K6-2 comprado pelo meu pai. Aos 16, fiz um curso de montagem de micros na FAETEC. Aos 17, já na faculdade de Letras, juntei uns trocados e consegui montar do zero o meu primeiro PC, um Sempron, que me permitiu viver plenamente os anos saudosos e espinhosos da conexão discada, ICQ, MSN, IRC, Napster etc. Mais tarde, por volta de 2008, usei peças sobressalentes de desktop para montar meu primeiro servidor doméstico, rodando o finado Windows Home Server. Quando não estava lendo o Gabo ou o Machado, fui me familiarizando com a configuração e a manutenção de redes.

{{< leiamais "/notas/2026-do-k6-2-ao-homelab" >}}

## Meu setup

Dois servidores com Unraid, um nobreak senoidal de rack, Raspberry Pis para DNS, nobreak e VPN, KVMs para acessar as máquinas, VPS na Oracle e na Netcup e, para trabalhar, um desktop e um mini PC. Cada equipamento, com a função e as especificações principais, está na página do setup.

{{< leiamais "/setup" >}}

## Projetos

{{< projeto img="img/tecnologia/abrflow.svg" alt="Ilustração: uma matéria da Agência Brasil em português ligada às versões em inglês e em espanhol" >}}
### AbrFlow

Ferramenta interna que desenvolvi para a equipe de tradução da Agência Brasil. Acompanha cada matéria da publicação em português até as versões em inglês e espanhol, com extensão de navegador, editor web, tradução automática, revisão assistida por IA com o guia de estilo da agência e painel de produção. [abrflow.app ↗](https://abrflow.app)
{{< /projeto >}}

{{< projeto img="img/tecnologia/legendagem.svg" alt="Ilustração: tabela de revisão com original, rascunho, versão final e métricas de cada legenda" >}}
### Legendagem assistida

Um ambiente de trabalho para legendagem que reúne tradução automática neural e modelos de linguagem, memória de tradução e busca semântica, linguística de corpus, análise sintática, verificação gramatical e controle de qualidade de legendas (velocidade de leitura, caracteres por linha, quebras e regras de estilo). A ideia não é entregar tradução pronta, mas preparar um rascunho informado e uma tabela de revisão em que cada legenda é decidida por quem traduz. Os serviços de IA são usados com retenção zero de dados.
{{< /projeto >}}

{{< projeto img="img/tecnologia/corpus.svg" alt="Ilustração: trechos de Alice no País das Maravilhas alinhados entre inglês e português" >}}
### Corpus e alinhamento

Alinhamento bilíngue de obras literárias e corpus de legendas para estudar soluções de tradução, e guias de estilo em inglês e espanhol da Agência Brasil construídos a partir de um corpus de matérias.
{{< /projeto >}}

{{< projeto img="img/tecnologia/sites.svg" alt="Ilustração: página web genérica com título, texto, imagem e cartões" lista="sites" >}}
### Sites

Sites que desenvolvo e mantenho. Quando o design é meu, faço com assistência de IA; quando é de terceiros, o crédito vem no cartão. Em todos, cuido também do domínio e da hospedagem, inclusive a do e‑mail.
{{< /projeto >}}

## Como trabalho

Concebo, planejo, especifico e reviso tudo o que vai para produção. Boa parte do código dos projetos é escrita com assistência de IA, sob minha responsabilidade e com testes. Programo o básico em HTML, CSS, JavaScript e Python, mas meu forte é conceber, integrar e manter.

## Ferramentas

- **Tradução e legendagem:** Wordfast, Phrase, XTM Cloud, Crowdin, Subtitle Edit, memórias de tradução, glossários.
- **Desenvolvimento:** HTML, CSS, JavaScript, Python, Hugo, React, Cloudflare, Git.
- **Infraestrutura:** Linux (Debian, Ubuntu), Windows, Unraid, Docker, Ansible, Restic, Tailscale.
