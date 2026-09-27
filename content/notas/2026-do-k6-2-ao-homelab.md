---
title: "Do K6-2 ao homelab"
date: 2026-09-27
description: "Um panorama de como a informática doméstica virou homelab e self-hosting: do primeiro PC à infraestrutura descrita como código."
---
{{< painel img="img/tecnologia/jonsbo-n2.png" alt="Gabinete Jonsbo N2 preto" rotulo="Servidor principal" titulo="Jonsbo N2 · Unraid" >}}

No que hoje parece um passado distante, tive meu primeiro PC por volta do ano 2000, aos 15 anos, um modesto K6-2. Aos 17, fiz um curso de montagem na FAETEC e, aos 19, já na faculdade (de Letras, veja bem), juntei uns trocados e consegui montar do zero o meu primeiro PC, um Sempron, que me acompanhou por longos anos. Com peças sobressalentes, montei meu primeiro servidor doméstico por volta de 2008, rodando o finado Windows Home Server, o que me permitiu ir me familiarizando com a configuração e a manutenção de redes.

Saltando para 2015, já no meu emprego atual como tradutor, adquiri um HP ProLiant MicroServer Gen8, e aí a brincadeira ficou mais séria. Lembro dessa máquina rodando o OpenMediaVault, servindo arquivos de mídia e fazendo backups. Nos anos seguintes, também experimentei o Ubuntu e outras distros Linux no desktop; o servidor, além de Debian e Ubuntu, passou pelo TrueNAS e pelo Proxmox.

Ali por 2018, me mudei para um apartamento maior e, aproveitando a necessidade de reforma, planejei uma rede do zero, com cabeamento Cat6 passando pelas paredes. De 2020 a 2023, acumulei equipamentos de rede de nível prosumer, como um switch gerenciável gigabit JetStream, vários access points gigabit TP-Link Omada EAP225 com a controladora OC200 e um roteador EdgeRouter X (mais tarde substituído por um TP-Link TL-R605), além de equipamentos importados, como NVIDIA Shield, Sonos PLAY:1, Raspberry Pis e até um HDHomeRun, na época em que era distribuído no Brasil pela M2Play. Também fiz experimentos de casa inteligente: interruptores do padrão Tuya, relés Sonoff, lâmpadas inteligentes e o Echo Dot com a Alexa.

Durante a pandemia, comecei a me aprofundar em aspectos mais técnicos do self-hosting e fiquei obcecado com o potencial infinito do Docker e de descrever toda a infra em Ansible. Comecei também a administrar alguns VPS (servidores virtuais privados, na nuvem), hospedando serviços web open source de armazenamento, mídia e utilitários, para uso familiar e com foco em conveniência, privacidade e controle.

Depois da pandemia, com nova mudança de apartamento, fiz um "downsizing". Hoje tenho um conjunto mais modesto (e mais fácil de manter): modem, roteador e switch, um servidor principal e outro de backup, ambos rodando Unraid, com uns 15 TB de armazenamento no total, um nobreak senoidal TS Shara de rack (2U, 1500 VA) e Raspberry Pis com AdGuard Home e NUT. Também mantenho serviços em produção em VPS da Oracle e da Netcup. Toda essa infraestrutura está descrita como código, com Ansible: serviços em contêineres Docker, backups com restic e rotina de recuperação de desastre, DNS próprio, VPN entre as máquinas, proxy reverso e monitoramento.

Em 2025, resolvi cursar Tecnologia em Sistemas para Internet no Senac. Meu objetivo é integrar e solidificar esses conhecimentos para desenvolver projetos interdisciplinares do meu interesse, tanto de cunho pessoal como profissional, na profunda interseção da TI com a linguística e a tradução, cujo exemplo mais óbvio são os LLMs. Não à toa, aplico tecnologia a tudo na minha área, da literatura e do jornalismo, tradicionalmente mais "analógicos", até campos densamente tecnológicos, como a tradução técnica e a legendagem.
