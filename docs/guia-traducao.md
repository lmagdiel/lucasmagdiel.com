# Guia para os rascunhos de tradução do site lucasmagdiel.com (EN e ES)

Repositório (Hugo): /home/claude/lucasmagdiel.com. Site pessoal de Lucas Magdiel, tradutor e legendador brasileiro (inglês e espanhol), tradutor da EBC/Agência Brasil, sócio da Ligna, credenciado no CJF, com interesse em tecnologia (homelab). Os textos originais estão em português do Brasil, em primeira pessoa.

## Regra de ouro
- Os rascunhos foram feitos sem alterar nenhum arquivo existente.
- Os idiomas EN e ES estão desativados no hugo.toml: os arquivos novos não aparecem no site. São rascunhos para o Lucas revisar.

## Estilo
- Tradução natural e idiomática, não literal; mesma voz em primeira pessoa, tom sóbrio e pessoal do original, frases curtas. Preserve todos os fatos, números, nomes e datas.
- Inglês: americano, para clientes internacionais (agências, editoras, produtoras).
- Espanhol: neutro latino-americano (o site fala em "leitor hispanofalante"); use "usted" quando se dirigir ao leitor; nada de "vosotros".
- PROIBIDO travessão (—). Use vírgula, dois-pontos ou parênteses. Hífen comum só em palavras compostas.
- Aspas: use aspas retas "..." no Markdown (o Hugo converte). Itálico e negrito como no original.
- Humor e trocadilhos: adapte com equivalentes naturais; se não houver, mantenha o sentido com leveza. Referências muito brasileiras podem ganhar uma explicação curta.

## Glossário
- Seções: Início = Home / Inicio; Portfólio = Portfolio / Portafolio; Tecnologia = Technology / Tecnología; Sobre = About / Sobre mí; Notas = Notes / Notas; Contato = Contact / Contacto; Meu setup = My setup / Mi setup.
- Portfólio: Legendagem = Subtitling / Subtitulación; Livros = Books / Libros; TV Brasil (não traduzir); Jornalismo = Journalism / Periodismo; Tradução técnica = Technical translation / Traducción técnica; Revisão = Editing / Corrección.
- tradução (para o português) = translation / traducción; versão (do português para outra língua) = translation / traducción inversa (em EN o par de línguas já indica a direção); revisão = editing (ou proofreading, conforme o caso) / revisión o corrección; preparação de originais = copyediting / corrección de estilo; edição (Blend) = editing / edición; legendagem = subtitling / subtitulación; legendador = subtitler / subtitulador; pós-edição de tradução automática = machine translation post-editing / posedición de traducción automática.
- Pares de língua: NÃO traduzir a notação (EN>PT-BR, ES>PT-BR, PT-BR>ES, "EN, ES>PT-BR").
- Instituições: EBC (Empresa Brasil de Comunicação) = Brazil's public media company / la empresa pública de comunicación de Brasil (na 1ª menção); Agência Brasil e TV Brasil ficam como estão; CJF (Conselho da Justiça Federal) = Brazil's Council of Federal Justice (CJF) / Consejo de la Justicia Federal (CJF); CECINT (Centro de Cooperação Jurídica Internacional) = International Legal Cooperation Center (CECINT) / Centro de Cooperación Jurídica Internacional (CECINT); Ligna, Blend (antiga OneHourTranslation), Senac, UFRJ ficam como estão; curso "Tecnologia em Sistemas para Internet" = Internet Systems Technology (associate degree, Senac) / Tecnología en Sistemas para Internet (Senac).
- Títulos de obras: mantenha os títulos brasileiros como estão; quando o original já aparece no texto, pode usá-lo.
- Nomes próprios, marcas, produtos, código e comandos: não traduzir.

## Markdown e Hugo
- Front matter: mantenha as MESMAS chaves e a mesma estrutura; traduza só os valores de texto (title, description, textos em listas). Não traduza: date, url, layout, weight, larga, foto, ids, caminhos de imagem, URLs, outputs, chaves.
- Shortcodes {{< ... >}}: mantenha exatamente; traduza só os parâmetros de texto alt="", legenda="", titulo="", rotulo="" e o texto interno quando houver; o 2º parâmetro de {{< leiamais "/caminho" "Rótulo" >}} é texto.
- Links internos: nos arquivos EN, prefixe com /en/ os caminhos de páginas que terão versão em inglês (todas as páginas de Início, Portfólio, Tecnologia, Sobre, Contato, a lista de Notas e as 5 notas traduzidas: 2024-placa-nas-n100, 2025-nobreak-ts-shara-nut, 2026-do-k6-2-ao-homelab, 2026-fechadura-elsys, 2026-goldendict). Nos arquivos ES, prefixe com /es/ as páginas que terão versão em espanhol (todas, MENOS as notas, que não terão ES: link de nota em ES fica com o caminho em português). Notas não traduzidas (2010-gunter-grass-entrevista, 2014-a-noite-dos-mortos-vivos) ficam sempre com o caminho em português. Os caminhos (slugs) não se traduzem: /en/sobre/, /es/tecnologia/setup/ etc. Links externos ficam iguais. Shortcode leiamais: o caminho do shortcode é o caminho lógico do conteúdo ("/notas/...", "/setup"), NÃO prefixe.
- Front matter "url" (só content/setup.md tem): em EN use "/en/tecnologia/setup/"; em ES "/es/tecnologia/setup/".
- Blocos de código: não traduza o código; traduza só comentários em português dentro deles, se houver.
- Valide cada arquivo: front matter YAML válido (python3 -c "import yaml" lendo o trecho entre os ---), sem "—", shortcodes balanceados.
