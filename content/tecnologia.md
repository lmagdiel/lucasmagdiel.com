---
title: "Tecnologia"
description: "Homelab, self-hosting e ferramentas aplicadas à tradução e à legendagem."
---
Tecnologia é o meu principal interesse fora das línguas — e, cada vez mais, parte do trabalho com elas. Curso Tecnologia em Sistemas para Internet no Senac e uso o que aprendo em projetos que juntam as duas áreas.

## Homelab e self-hosting

Montei meu primeiro servidor doméstico por volta de 2006, com o Windows Home Server. Depois vieram o OpenMediaVault, o TrueNAS e o Proxmox; hoje mantenho um servidor Unraid em casa e alguns servidores Debian e Ubuntu na nuvem, para os dados e serviços da família e para os meus projetos.

A infraestrutura é descrita como código, com Ansible: serviços em contêineres Docker, backups com restic e rotina de recuperação de desastre, DNS próprio, VPN entre as máquinas, proxy reverso e monitoramento. O gosto por hardware vem de antes: fiz um curso de montagem e manutenção de micros em 2002 e desde então monto meus computadores e servidores.

## Projetos

### AbrFlow

Ferramenta interna que desenvolvi para a equipe de tradução da Agência Brasil. Acompanha cada matéria da publicação em português até as versões em inglês e espanhol, com extensão de navegador, editor web, tradução automática, revisão assistida por IA com o guia de estilo da agência e painel de produção. [abrflow.app ↗](https://abrflow.app)

### Legendagem assistida

Um ambiente de trabalho para legendagem que reúne tradução automática neural e modelos de linguagem, memória de tradução e busca semântica, linguística de corpus, análise sintática, verificação gramatical e controle de qualidade de legendas — velocidade de leitura, caracteres por linha, quebras e regras de estilo. Não entrega tradução pronta: prepara um rascunho informado e uma tabela de revisão em que cada legenda é decidida por quem traduz. Os serviços de IA são usados com retenção zero de dados.

### Corpus e alinhamento

Alinhamento bilíngue de obras literárias e corpus de legendas para estudar soluções de tradução, e guias de estilo em inglês e espanhol da Agência Brasil construídos a partir de um corpus de matérias.

### Sites

Este site (Hugo, com tema próprio), o [coizassim.com.br](https://coizassim.com.br) e o site do AbrFlow. Na [Ligna](https://ligna.pro), cuido do domínio, da hospedagem e dos e-mails.

## Como trabalho

Concebo, planejo, especifico e reviso tudo o que vai para produção; boa parte do código dos projetos é escrita com assistência de IA, sob minha responsabilidade e com testes. Programo o básico em HTML, CSS, JavaScript e Python — meu forte é conceber, integrar e manter.

## Ferramentas

- **Tradução e legendagem:** Wordfast, Phrase, XTM Cloud, Crowdin, Subtitle Edit, memórias de tradução, glossários, GoldenDict, tradução automática e pós-edição.
- **Desenvolvimento:** HTML, CSS, JavaScript, Python, Hugo, React, extensões de navegador, Cloudflare, Git.
- **Infraestrutura:** Linux (Debian, Ubuntu), Windows, Unraid, Docker, Ansible, Tailscale, restic.
