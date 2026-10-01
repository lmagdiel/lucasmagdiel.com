---
title: "GoldenDict: a gold mine of dictionaries"
date: 2026-09-28
description: "Basic GoldenDict setup, free sources, supported formats and conversions."
assuntos: ["Translation", "Tools", "Guides"]
---
As a translator, I've been using [GoldenDict](https://github.com/goldendict/goldendict) for at least a decade and a half as my central lookup hub: one search, several stacked dictionaries and a handy keyboard shortcut to translate a selected word anywhere. The original project sat nearly dormant for years. Only recently did I find out it's putting out stable releases again: [1.5.0](https://github.com/goldendict/goldendict/releases) came out in May 2023, the first in more than a decade, and [1.5.1](https://github.com/goldendict/goldendict/releases/tag/1.5.1) in May 2025.

Meanwhile, [GoldenDict-ng](https://github.com/xiaoyifang/goldendict-ng) came along, an active Qt6 fork with builds for Windows, macOS and Linux (via Flathub, `io.github.xiaoyifang.goldendict_ng`). If you're starting out today, it's the one I recommend. The setup below works for both.

## Formats and free sources

GoldenDict reads DSL (ABBYY Lingvo), StarDict, MDict, XDXF and Zim, among other formats. It also reads **.bgl, the format of the old Babylon premium dictionaries**: if you held on to those files, you can use them again without having Babylon installed.

Free sources worth checking out:

- **[FreeDict](https://freedict.org/downloads/)**: free bilingual dictionaries in StarDict format, including English-Portuguese and other pairs with Portuguese.
- **Wiktionary**: [Wiktionary-Dictionaries](https://github.com/Vuizur/Wiktionary-Dictionaries) offers ready-made StarDict versions. [kaikki.org](https://kaikki.org/) provides the structured data in JSON, great as raw material (see the last section).
- **DSL**: lots of dictionaries circulate in this format. It's worth checking the license before downloading.

## Groups

Under **Edit → Dictionaries (F3)**:

1. In the **Sources → Files** tab, point to the folders where your dictionaries live and check "Recursive".
2. In the **Groups** tab, create groups by use, such as "EN→PT". Drag the dictionaries in and sort them by priority. The **Auto groups** button creates language-pair groups for dictionaries that have that information built into their metadata.
3. Pick the active group from the selector in the toolbar.

## Hunspell (morphology)

Hunspell lets GoldenDict find the base form of inflected words: "ran" leads to "run", and the Portuguese "fizéramos" (we had done) leads to "fazer" (to do). It also suggests spellings when you make a typo.

1. Download the `.aff` + `.dic` pairs. The ones from [LibreOffice](https://github.com/LibreOffice/dictionaries) do the job: `pt_BR` (VERO) and `en_US`/`en_GB`.
2. Under **Sources → Morphology**, point to the folder and check the languages.
3. Add morphology to each relevant group, preferably at the top.

## Ivo is the man

For English-to-Portuguese translation, the standout is the [English-Portuguese Translator's Dictionary](https://sites.google.com/site/livrosdeivokorytowski/ivo-korytowski-s-english-portuguese-translator-s-dictionary), by Ivo Korytowski. It has more than 46,000 entries gathered over more than 35 years of translating: idioms, technical terms, acronyms and rare senses that ordinary dictionaries ignore. It's free and comes in .bgl, ready for GoldenDict.

## Converting formats with PyGlossary

[PyGlossary](https://github.com/ilius/pyglossary) converts between dozens of formats, through a graphical interface or from the command line:

```bash
pyglossary dicionario.bgl dicionario.ifo      # BGL → StarDict
pyglossary glossario.txt glossario.ifo        # Tabfile (term<TAB>definition) → StarDict
```

It reads DSL, MDict and XDXF, but doesn't write them. For output, the useful formats are StarDict, Tabfile and BGL itself.

## Building your own DSL

DSL is plain text with simple markup. That means you can generate compatible dictionaries from glossaries, spreadsheets, translation memories or dumps like the ones from kaikki.org:

```
#NAME "Glossário jurídico EN-PT"
#INDEX_LANGUAGE "English"
#CONTENTS_LANGUAGE "Portuguese"

hearing
    [m1][p]n[/p] [trn]audiência[/trn][/m]
    [m2][ex]The hearing was adjourned.[/ex][/m]
```

The headword sits in column zero and the body is indented. The practical route is a Python script that reads the source (CSV, TMX, JSON) and writes the DSL; then `dictzip` produces a compact `.dsl.dz`.

The same process works for converting, for personal use, a digital dictionary you already own. Mobi and epub files are containers (HTML/XHTML plus resources), and the `ebook-convert` tool from [Calibre](https://github.com/kovidgoyal/calibre) turns them into an intermediate format that's easier to work with. If the file is already structured as a dictionary, with a headword and a definition in each entry (like those that follow the Kindle or StarDict dictionary format), the main job is writing the parsing script for that format: identify the headword tag and the definition block and, with BeautifulSoup or lxml, loop through the entries and generate the DSL, converting the HTML tags into their equivalents (`[b]`, `[i]`, `[ref]` etc.) or simplifying everything to plain text. After that, it's just a matter of compiling and testing.

In both cases, AI does more than lend a hand: it writes the parser, maps the fields to the tags, validates the markup and handles the weird edge cases.
