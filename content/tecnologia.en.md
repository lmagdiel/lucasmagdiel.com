---
title: "Technology"
larga: true
description: "Homelab, self-hosting, and tools for translation and subtitling."
---
Technology is my main interest outside languages and, more and more, part of my work with them. I'm studying for an associate degree in Internet Systems Technology at Senac, and I put what I learn into projects that bring the two fields together.

## Homelab and self-hosting

{{< ilustracao img="img/tecnologia/homelab.svg" alt="Illustration: a home network with servers, a Raspberry Pi, a desktop, and a switch, connected over VPN to cloud servers" >}}

In what now feels like the distant past, I got my first PC around 2000, at 15: a modest K6-2 my father bought. At 16, I took a PC assembly course at FAETEC. At 17, already in college studying languages and literature, I scraped together some money and built my first PC from scratch, a Sempron, which let me fully live the fondly remembered, thorny years of dial-up, ICQ, MSN, IRC, Napster, and so on. Later, around 2008, I used spare desktop parts to build my first home server, running the late Windows Home Server. When I wasn't reading Gabriel García Márquez or Machado de Assis, I was getting the hang of setting up and maintaining networks.

{{< leiamais "/notas/2026-do-k6-2-ao-homelab" >}}

## My setup

Two servers running Unraid, a rack-mount pure sine wave UPS, Raspberry Pis for DNS, UPS monitoring, and VPN, KVMs to access the machines, VPSs at Oracle and Netcup and, for work, a desktop and a mini PC. Each piece of equipment, with its role and main specs, is listed on the setup page.

{{< leiamais "/setup" >}}

## Projects

{{< projeto img="img/tecnologia/abrflow.svg" alt="Illustration: an Agência Brasil story in Portuguese linked to its English and Spanish versions" >}}
### AbrFlow

An in-house tool I built for the Agência Brasil translation team. It tracks each story from publication in Portuguese through to the English and Spanish versions, with a browser extension, a web editor, machine translation, AI-assisted review based on the agency's style guide, and a production dashboard. [abrflow.app ↗](https://abrflow.app)
{{< /projeto >}}

{{< projeto img="img/tecnologia/legendagem.svg" alt="Illustration: a review table with the source, draft, final version, and metrics for each subtitle" >}}
### Assisted subtitling

A subtitling workspace that brings together neural machine translation and language models, translation memory and semantic search, corpus linguistics, syntactic parsing, grammar checking, and subtitle quality control (reading speed, characters per line, line breaks, and style rules). The idea isn't to deliver a finished translation, but to prepare an informed draft and a review table in which the translator decides on every subtitle. AI services are used with zero data retention.
{{< /projeto >}}

{{< projeto img="img/tecnologia/corpus.svg" alt="Illustration: passages from Alice in Wonderland aligned in English and Portuguese" >}}
### Corpus and alignment

Bilingual alignment of literary works and subtitle corpora for studying translation solutions, plus English and Spanish style guides for Agência Brasil, built from a corpus of news stories.
{{< /projeto >}}

{{< projeto img="img/tecnologia/sites.svg" alt="Illustration: a generic web page with a heading, text, an image, and cards" lista="sites" >}}
### Websites

Websites I build and maintain. When the design is mine, I do it with AI assistance; when it's someone else's, they're credited on the card. For all of them, I also manage the domain and hosting, email included.
{{< /projeto >}}

## How I work

I conceive, plan, specify, and review everything that goes into production. Much of the code in these projects is written with AI assistance, under my responsibility and with tests. I can code the basics in HTML, CSS, JavaScript, and Python, but my strengths are conceiving, integrating, and maintaining.

## Tools

- **Translation and subtitling:** Wordfast, Phrase, XTM Cloud, Crowdin, Subtitle Edit, translation memories, glossaries.
- **Development:** HTML, CSS, JavaScript, Python, Hugo, React, Cloudflare, Git.
- **Infrastructure:** Linux (Debian, Ubuntu), Windows, Unraid, Docker, Ansible, Restic, Tailscale.
