---
title: "GoldenDict: dicionário paca, só o ouro"
date: 2026-09-28
description: "Configuração básica do GoldenDict, fontes gratuitas, formatos compatíveis e conversões."
---
Como tradutor, uso o [GoldenDict](https://github.com/goldendict/goldendict) há pelo menos uma década e meia como painel central de consulta: uma busca só, vários dicionários empilhados e um atalho conveniente de teclado para traduzir uma palavra selecionada em qualquer lugar. O projeto original ficou anos quase parado. Só recentemente descobri que ele voltou a ter versões estáveis: a [1.5.0](https://github.com/goldendict/goldendict/releases) saiu em maio de 2023, a primeira em mais de uma década, e a [1.5.1](https://github.com/goldendict/goldendict/releases/tag/1.5.1) em maio de 2025.

Enquanto isso, surgiu o [GoldenDict-ng](https://github.com/xiaoyifang/goldendict-ng), um fork ativo em Qt6 com versões para Windows, macOS e Linux (via Flathub, `io.github.xiaoyifang.goldendict_ng`). Para quem está começando hoje, é a opção que recomendo. A configuração abaixo vale para os dois.

## Formatos e fontes gratuitas

O GoldenDict lê DSL (ABBYY Lingvo), StarDict, MDict, XDXF, Zim, entre outros formatos. Também lê **.bgl, o formato dos antigos dicionários premium do Babylon**: quem guardou esses arquivos pode voltar a usá-los sem o Babylon instalado.

Fontes gratuitas que valem a pena:

- **[FreeDict](https://freedict.org/downloads/)**: dicionários bilíngues livres em StarDict, incluindo inglês–português e outros pares com português.
- **Wiktionary**: o [Wiktionary-Dictionaries](https://github.com/Vuizur/Wiktionary-Dictionaries) já entrega versões prontas em StarDict. O [kaikki.org](https://kaikki.org/) oferece os dados estruturados em JSON, ótimos como matéria-prima (veja a última seção).
- **DSL**: muitos dicionários circulam nesse formato. Vale checar a licença antes de baixar.

## Grupos

Em **Editar → Dicionários (F3)**:

1. Na aba **Fontes → Arquivos**, aponte as pastas onde ficam os dicionários e marque "Recursivo".
2. Na aba **Grupos**, crie grupos por uso, como "EN→PT". Arraste os dicionários para dentro e ordene pela prioridade. O botão **Grupos automáticos** cria grupos por par de idiomas para os dicionários que têm essa informação embutida nos metadados.
3. Escolha o grupo ativo no seletor da barra de ferramentas.

## Hunspell (morfologia)

O Hunspell faz o GoldenDict encontrar a forma base de palavras flexionadas: "ran" leva a "run", "fizéramos" leva a "fazer". Também sugere grafias quando você digita errado.

1. Baixe os pares `.aff` + `.dic`. Os do [LibreOffice](https://github.com/LibreOffice/dictionaries) servem: `pt_BR` (VERO) e `en_US`/`en_GB`.
2. Em **Fontes → Morfologia**, aponte a pasta e marque os idiomas.
3. Inclua a morfologia em cada grupo relevante, de preferência no topo.

## O Ivo é o cara

Para tradução inglês–português, o destaque é o [English-Portuguese Translator's Dictionary](https://sites.google.com/site/livrosdeivokorytowski/ivo-korytowski-s-english-portuguese-translator-s-dictionary), de Ivo Korytowski. São mais de 46 mil entradas reunidas em mais de 35 anos de tradução: expressões idiomáticas, termos técnicos, siglas e acepções raras que os dicionários comuns ignoram. É gratuito e vem em .bgl, pronto para o GoldenDict.

## Converter formatos com PyGlossary

O [PyGlossary](https://github.com/ilius/pyglossary) converte entre dezenas de formatos, com interface gráfica ou pela linha de comando:

```bash
pyglossary dicionario.bgl dicionario.ifo      # BGL → StarDict
pyglossary glossario.txt glossario.ifo        # Tabfile (termo<TAB>definição) → StarDict
```

Ele lê DSL, MDict e XDXF, mas não escreve nesses formatos. Para gerar arquivos, os formatos úteis são StarDict, Tabfile e o próprio BGL.

## Construindo seu próprio DSL

O DSL é texto puro com uma marcação simples. Isso permite gerar dicionários compatíveis a partir de glossários, planilhas, memórias de tradução ou dumps como os do kaikki.org:

```
#NAME "Glossário jurídico EN-PT"
#INDEX_LANGUAGE "English"
#CONTENTS_LANGUAGE "Portuguese"

hearing
    [m1][p]n[/p] [trn]audiência[/trn][/m]
    [m2][ex]The hearing was adjourned.[/ex][/m]
```

O verbete fica na coluna zero e o corpo vai indentado. O caminho prático é um script em Python que lê a fonte (CSV, TMX, JSON) e escreve o DSL; depois, o `dictzip` gera um `.dsl.dz` compacto.

O mesmo processo serve para converter, para uso pessoal, um dicionário digital que você já tenha. Arquivos mobi e epub são contêineres (HTML/XHTML + recursos), e o `ebook-convert` do [Calibre](https://github.com/kovidgoyal/calibre) os leva para um formato intermediário mais fácil de tratar. Se o arquivo já estiver estruturado como dicionário, com palavra-chave e definição em cada entrada (como os que seguem o formato de dicionário do Kindle ou do StarDict), o trabalho principal é escrever o script de parsing para aquele formato: identificar a tag do verbete e o bloco da definição e, com BeautifulSoup ou lxml, percorrer as entradas e gerar o DSL, convertendo as tags HTML nas equivalentes (`[b]`, `[i]`, `[ref]` etc.) ou simplificando para texto puro. Depois, é compilar e testar.

Nos dois casos, as IAs quebram uma árvore: escrevem o parser, mapeiam os campos para as tags, validam a marcação e tratam os casos estranhos.
