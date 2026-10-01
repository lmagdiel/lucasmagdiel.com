---
title: "Tecnología"
larga: true
description: "Homelab, self-hosting y herramientas aplicadas a la traducción y la subtitulación."
---
La tecnología es mi principal interés fuera de los idiomas y, cada vez más, parte del trabajo con ellos. Estudio Tecnología en Sistemas para Internet en el Senac y aplico lo que aprendo en proyectos que unen ambas áreas.

## Homelab y self-hosting

{{< ilustracao img="img/tecnologia/homelab.svg" alt="Ilustración: red doméstica con servidores, Raspberry Pi, computadora de escritorio y switch, conectada por VPN a servidores en la nube" >}}

En lo que hoy parece un pasado lejano, tuve mi primera computadora alrededor del año 2000, a los 15 años: una modesta K6-2 que compró mi padre. A los 16, hice un curso de armado de computadoras en la FAETEC. A los 17, ya en la carrera de Letras, junté algunos ahorros y logré armar desde cero mi propia computadora, una Sempron, que me permitió vivir plenamente los añorados y espinosos años del dial-up, ICQ, MSN, IRC, Napster, etc. Más tarde, alrededor de 2008, usé piezas de computadoras de escritorio que me sobraban para armar mi primer servidor doméstico, con el difunto Windows Home Server. Cuando no estaba leyendo a Gabo o a Machado de Assis, me fui familiarizando con la configuración y el mantenimiento de redes.

{{< leiamais "/notas/2026-do-k6-2-ao-homelab" >}}

## Mi setup

Dos servidores con Unraid, un UPS de rack de onda senoidal, varias Raspberry Pi para DNS, gestión del UPS y VPN, KVM para acceder a las máquinas, VPS en Oracle y en Netcup y, para trabajar, una computadora de escritorio y una mini PC. Cada equipo, con su función y sus especificaciones principales, aparece en la página del setup.

{{< leiamais "/setup" >}}

## Proyectos

{{< projeto img="img/tecnologia/abrflow.svg" alt="Ilustración: una noticia de la Agência Brasil en portugués conectada con las versiones en inglés y en español" >}}
### AbrFlow

Herramienta interna que desarrollé para el equipo de traducción de la Agência Brasil. Sigue cada noticia desde su publicación en portugués hasta las versiones en inglés y en español, con extensión de navegador, editor web, traducción automática, revisión asistida por IA con la guía de estilo de la agencia y panel de producción. [abrflow.app ↗](https://abrflow.app)
{{< /projeto >}}

{{< projeto img="img/tecnologia/legendagem.svg" alt="Ilustración: tabla de revisión con el original, el borrador, la versión final y las métricas de cada subtítulo" >}}
### Subtitulación asistida

Un entorno de trabajo para subtitulación que reúne traducción automática neuronal y modelos de lenguaje, memoria de traducción y búsqueda semántica, lingüística de corpus, análisis sintáctico, revisión gramatical y control de calidad de subtítulos (velocidad de lectura, caracteres por línea, división en líneas y reglas de estilo). La idea no es entregar una traducción lista, sino preparar un borrador informado y una tabla de revisión en la que quien traduce decide cada subtítulo. Los servicios de IA se usan con retención cero de datos.
{{< /projeto >}}

{{< projeto img="img/tecnologia/corpus.svg" alt="Ilustración: fragmentos de Alicia en el país de las maravillas alineados entre inglés y portugués" >}}
### Corpus y alineación

Alineación bilingüe de obras literarias y corpus de subtítulos para estudiar soluciones de traducción, y guías de estilo en inglés y en español de la Agência Brasil elaboradas a partir de un corpus de noticias.
{{< /projeto >}}

{{< projeto img="img/tecnologia/sites.svg" alt="Ilustración: página web genérica con título, texto, imagen y tarjetas" lista="sites" >}}
### Sitios web

Sitios web que desarrollo y mantengo. Cuando el diseño es mío, lo hago con asistencia de IA; cuando es de terceros, el crédito aparece en la tarjeta. En todos, también me ocupo del dominio y del alojamiento, incluido el del correo electrónico.
{{< /projeto >}}

## Cómo trabajo

Concibo, planifico, especifico y reviso todo lo que pasa a producción. Buena parte del código de los proyectos se escribe con asistencia de IA, bajo mi responsabilidad y con pruebas. Programo lo básico en HTML, CSS, JavaScript y Python, pero mi fuerte es concebir, integrar y mantener.

## Herramientas

- **Traducción y subtitulación:** Wordfast, Phrase, XTM Cloud, Crowdin, Subtitle Edit, memorias de traducción, glosarios.
- **Desarrollo:** HTML, CSS, JavaScript, Python, Hugo, React, Cloudflare, Git.
- **Infraestructura:** Linux (Debian, Ubuntu), Windows, Unraid, Docker, Ansible, Restic, Tailscale.
