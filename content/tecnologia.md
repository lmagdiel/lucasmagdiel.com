---
title: "Tecnologia"
description: "Homelab, self-hosting e ferramentas aplicadas à tradução e à legendagem."
---
Tecnologia é o meu principal interesse fora das línguas e, cada vez mais, parte do trabalho com elas. Curso Tecnologia em Sistemas para Internet no Senac e uso o que aprendo em projetos que juntam as duas áreas.

## Homelab e self-hosting

No que hoje parece um passado distante, tive meu primeiro PC por volta do ano 2000, aos 15 anos, um modesto K6-2. Aos 17, fiz um curso de montagem na FAETEC e, aos 19, já na faculdade (de Letras, veja bem), juntei uns trocados e consegui montar do zero o meu primeiro PC, um Sempron, que me acompanhou por longos anos. Com peças sobressalentes, montei meu primeiro servidor doméstico por volta de 2008, rodando o finado Windows Home Server, o que me permitiu ir me familiarizando com a configuração e a manutenção de redes.

Saltando para 2015, já no meu emprego atual como tradutor, adquiri um HP ProLiant MicroServer Gen8, e aí a brincadeira ficou mais séria. Lembro dessa máquina rodando o OpenMediaVault, servindo arquivos de mídia e fazendo backups. Nos anos seguintes, também experimentei o Ubuntu e outras distros Linux no desktop; o servidor, além de Debian e Ubuntu, passou pelo TrueNAS e pelo Proxmox.

Ali por 2018, me mudei para um apartamento maior e, aproveitando a necessidade de reforma, planejei uma rede do zero, com cabeamento Cat6 passando pelas paredes. De 2020 a 2023, acumulei equipamentos de rede de nível prosumer, como um switch gerenciável gigabit JetStream, vários access points gigabit TP-Link Omada EAP225 com a controladora OC200 e um roteador EdgeRouter X (mais tarde substituído por um TP-Link TL-R605), além de equipamentos importados, como NVIDIA Shield, Sonos PLAY:1, Raspberry Pis e até um HDHomeRun, na época em que era distribuído no Brasil pela M2Play. Também fiz experimentos de casa inteligente: interruptores do padrão Tuya, relés Sonoff, lâmpadas inteligentes e o Echo Dot com a Alexa.

Durante a pandemia, comecei a me aprofundar em aspectos mais técnicos do self-hosting e fiquei obcecado com o potencial infinito do Docker e de descrever toda a infra em Ansible. Comecei também a administrar alguns VPS (servidores virtuais privados, na nuvem), hospedando serviços web open source de armazenamento, mídia e utilitários, para uso familiar e com foco em conveniência, privacidade e controle.

Depois da pandemia, com nova mudança de apartamento, fiz um "downsizing". Hoje tenho um conjunto mais modesto (e mais fácil de manter): modem, roteador e switch, um servidor principal e outro de backup, ambos rodando Unraid, com uns 15 TB de armazenamento no total, um nobreak senoidal TS Shara de rack (2U, 1500 VA) e Raspberry Pis com AdGuard Home e NUT. Também mantenho serviços em produção em VPS da Oracle e da Netcup. Toda essa infraestrutura está descrita como código, com Ansible: serviços em contêineres Docker, backups com restic e rotina de recuperação de desastre, DNS próprio, VPN entre as máquinas, proxy reverso e monitoramento.

Em 2025, resolvi cursar Tecnologia em Sistemas para Internet no Senac. Meu objetivo é integrar e solidificar esses conhecimentos para desenvolver projetos interdisciplinares do meu interesse, tanto de cunho pessoal como profissional, na profunda interseção da TI com a linguística e a tradução, cujo exemplo mais óbvio são os LLMs. Não à toa, aplico tecnologia a tudo na minha área, da literatura e do jornalismo, tradicionalmente mais "analógicos", até campos densamente tecnológicos, como a tradução técnica e a legendagem.

## Projetos

### AbrFlow

Ferramenta interna que desenvolvi para a equipe de tradução da Agência Brasil. Acompanha cada matéria da publicação em português até as versões em inglês e espanhol, com extensão de navegador, editor web, tradução automática, revisão assistida por IA com o guia de estilo da agência e painel de produção. [abrflow.app ↗](https://abrflow.app)

### Legendagem assistida

Um ambiente de trabalho para legendagem que reúne tradução automática neural e modelos de linguagem, memória de tradução e busca semântica, linguística de corpus, análise sintática, verificação gramatical e controle de qualidade de legendas (velocidade de leitura, caracteres por linha, quebras e regras de estilo). Não entrega tradução pronta: prepara um rascunho informado e uma tabela de revisão em que cada legenda é decidida por quem traduz. Os serviços de IA são usados com retenção zero de dados.

### Corpus e alinhamento

Alinhamento bilíngue de obras literárias e corpus de legendas para estudar soluções de tradução, e guias de estilo em inglês e espanhol da Agência Brasil construídos a partir de um corpus de matérias.

### Sites

Este site (Hugo, com tema próprio), o [coizassim.com.br](https://coizassim.com.br) e o site do AbrFlow. Na [Ligna](https://ligna.pro), cuido do domínio, da hospedagem e dos e-mails.

## Como trabalho

Concebo, planejo, especifico e reviso tudo o que vai para produção; boa parte do código dos projetos é escrita com assistência de IA, sob minha responsabilidade e com testes. Programo o básico em HTML, CSS, JavaScript e Python; meu forte é conceber, integrar e manter.

## Ferramentas

- **Tradução e legendagem:** Wordfast, Phrase, XTM Cloud, Crowdin, Subtitle Edit, memórias de tradução, glossários, GoldenDict, tradução automática e pós-edição.
- **Desenvolvimento:** HTML, CSS, JavaScript, Python, Hugo, React, extensões de navegador, Cloudflare, Git.
- **Infraestrutura:** Linux (Debian, Ubuntu), Windows, Unraid, Docker, Ansible, Tailscale, restic.
