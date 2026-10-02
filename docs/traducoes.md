# Traduções EN e ES

No ar desde 02/10/2026, em `/en/` e `/es/`. O português continua na raiz.

Histórico: rascunhos feitos em 01/10/2026 com os idiomas desativados; em 02/10/2026 o Lucas revisou os originais do Início, do Sobre, de Tecnologia e das notas de tecnologia, atualizou e revisou as traduções, e os idiomas foram ativados.

Decisões do Lucas:
- Todas as páginas em EN e ES.
- Notas de tecnologia só em EN. As duas notas mais antigas (Günter Grass, 2010; A Noite dos Mortos-Vivos, 2014) e as de assuntos gerais não têm tradução.
- Nunca esconder nada. Nas versões EN e ES, o menu é o mesmo e a lista de Notas mostra todas as notas. As que não têm tradução levam à versão em português, com a indicação do idioma.

## Onde estão os textos

| O quê | Onde | EN | ES |
|---|---|---|---|
| Páginas (Início, Portfólio e subpáginas, Tecnologia, Meu setup, Sobre, Contato, lista de Notas) | `content/**/*.en.md` e `*.es.md`, ao lado do original | 15 | 15 |
| Notas de tecnologia (placa NAS, nobreak, K6-2, fechadura, GoldenDict) | `content/notas/*.en.md` | 5 | não |
| Textos dos dados do portfólio (sinopses, gêneros, papéis, prêmios, créditos descritivos) | `data/traducoes/<idioma>/{audiovisual,livros,revisao,ebc}.yaml`, mapas pelo `id` com só os campos traduzidos | sim | sim |
| Frases de estatística | `data/traducoes/<idioma>/estatisticas.yaml` | sim | sim |
| Setup e lista de sites | `data/traducoes/<idioma>/{setup,sites}.yaml`, cópias completas traduzidas | sim | sim |
| Textos fixos do tema (rótulos, formulário, 404, resumos do portfólio etc.) | `i18n/en.yaml` e `i18n/es.yaml` (mesmas chaves do `pt.yaml`) | sim | sim |
| Menu e descrição do site | `hugo.toml`, em `[languages.en]` e `[languages.es]` | sim | sim |

Convenções:
- **Endereços:** os caminhos não são traduzidos (`/en/sobre/`, `/es/tecnologia/setup/`). Os links internos levam `/en/` ou `/es/` quando a página existe no idioma; as notas sem tradução continuam com o caminho em português.
- **Variantes:** inglês americano e espanhol neutro latino-americano, tratando o leitor por "usted".
- **Sem travessão:** como no resto do site.
- **Glossário e regras de estilo:** `docs/guia-traducao.md`.

## Ao mexer no conteúdo

- **Texto novo ou alterado em português:** atualizar o `.en.md` / `.es.md` correspondente. Página sem tradução simplesmente não aparece no idioma (o seletor some), exceto as notas, que entram na lista em português.
- **Item novo no portfólio** (`data/audiovisual.yaml`, `livros.yaml`, `ebc.yaml`, `revisao.yaml`): acrescentar o mesmo `id` em `data/traducoes/en/` e `es/` com os campos de texto (sinopse, gênero, papel etc.). Sem isso, a página da obra sai em EN/ES com os textos em português. Nomes, títulos, emissoras e links ficam só no original.
- **Listas dentro de um item** (`edicoes`, `volumes`, `titulos`, `premios`, `itens`): na tradução, mesma ordem e mesmo tamanho do original; `{}` para item sem texto a traduzir.
- **Créditos em texto corrido:** o " e " entre nomes vira " and " / " y " sozinho; frases (como "romance de...") vão traduzidas em `creditos` no arquivo do idioma.
- **Setup e sites:** as cópias em `data/traducoes/<idioma>/` são completas; qualquer mudança no original precisa ser repetida nelas.
- **Nota de tecnologia nova:** a tradução em inglês (`.en.md`) usa assuntos em inglês, na mesma ordem dos assuntos em português (é por essa ordem que o site liga, por exemplo, "Tradução" a "Translation" na barra de assuntos).

## Como funciona (tema)

- `_partials/dados.html`: devolve os dados no idioma da página (o original mais os campos de `data/traducoes/<idioma>/`). Usado pelos templates do portfólio, do setup e dos sites, e pelos content adapters (`content/portfolio/*/_content.gotmpl`, com `.EnableAllLanguages`).
- `_partials/notas-idioma.html`: em EN e ES, monta a lista de notas (tradução quando existe, senão a nota em português), os assuntos com as contagens e as notas em português de cada assunto. Usado na lista de Notas, nas páginas de assunto, na barra de assuntos e no RSS.
- `_partials/pagina.html`: página no idioma atual ou, se não houver, em português. Usado pelo `leiamais` e pelos links de notas no setup, com a indicação "(in Portuguese)" / "(en portugués)".
- Seletor de idioma no cabeçalho (só aparece em páginas com tradução), `hreflang` e `og:locale` no `head`.
- Formulário: campo oculto `idioma`; `functions/api/contato.js` devolve a pessoa para `/en/contato/enviado/` etc. e informa o idioma no e-mail. Categoria e assunto do e-mail continuam em português.
- Para tirar um idioma do ar sem apagar nada: `disabled = true` no `hugo.toml`.
