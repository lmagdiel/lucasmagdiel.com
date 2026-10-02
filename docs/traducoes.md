# Traduções EN e ES (rascunhos)

Situação em 01/10/2026: rascunhos prontos para revisão. Os idiomas EN e ES estão **desativados** no `hugo.toml` (`disabled = true`), então nada disso aparece no site. O build em português é idêntico, byte a byte, ao de antes dos rascunhos.

Em 02/10/2026, depois dos rascunhos, o Lucas revisou os originais do Início, do Sobre, de Tecnologia (resumo do homelab) e das notas do nobreak, do K6-2, da fechadura e do GoldenDict. Os rascunhos dessas páginas foram devidamente atualizados a partir da versão nova e revisados para garantir fluidez e naturalidade.

Decisões do Lucas:
- Todas as páginas em EN e ES.
- Notas de tecnologia só em EN. As duas notas mais antigas (Günter Grass, 2010; A Noite dos Mortos-Vivos, 2014) e as de assuntos gerais não terão tradução.
- Nunca esconder nada. Nas versões EN e ES, o menu é o mesmo e a lista de Notas mostra todas as notas. As que não tiverem tradução levam à versão em português, com a indicação do idioma.

## Onde estão os textos

| O quê | Onde | EN | ES |
|---|---|---|---|
| Páginas (Início, Portfólio e subpáginas, Tecnologia, Meu setup, Sobre, Contato, lista de Notas) | `content/**/*.en.md` e `*.es.md`, ao lado do original | 15 | 15 |
| Notas de tecnologia (placa NAS, nobreak, K6-2, fechadura, GoldenDict) | `content/notas/*.en.md` | 5 | não |
| Textos dos dados do portfólio (sinopses, gêneros, papéis, prêmios) | `data/traducoes/<idioma>/{audiovisual,livros,revisao,ebc}.yaml`, mapas pelo `id` com só os campos traduzidos | sim | sim |
| Frases de estatística | `data/traducoes/<idioma>/estatisticas.yaml` | sim | sim |
| Setup e lista de sites | `data/traducoes/<idioma>/{setup,sites}.yaml`, cópias completas traduzidas | sim | sim |
| Textos fixos do tema (rótulos, formulário, 404, resumos do portfólio etc.) | `i18n/en.yaml` e `i18n/es.yaml` (mesmas chaves do `pt.yaml`) | sim | sim |
| Menu e descrição do site | `hugo.toml`, em `[languages.en]` e `[languages.es]` | sim | sim |

Convenções usadas nos rascunhos:
- **Endereços:** os caminhos não foram traduzidos (`/en/sobre/`, `/es/tecnologia/setup/`). Os links internos levam `/en/` ou `/es/` quando a página existe no idioma; as notas sem tradução continuam com o caminho em português.
- **Variantes:** inglês americano e espanhol neutro latino-americano, tratando o leitor por "usted".
- **Sem travessão:** como no resto do site.
- **Glossário e regras de estilo:** estão em `docs/guia-traducao.md`, o mesmo guia usado para fazer os rascunhos.

## O que falta para ativar

1. **Revisão.** Revisar os textos, a começar pelas escolhas de terminologia: Revisão = Editing / Corrección; versão = Translation / Traducción inversa; Pis e KVMs = "Raspberry Pi y KVM" em ES.
2. **Portfólio (obras).** As páginas de cada obra vêm dos content adapters (`content/portfolio/*/_content.gotmpl`), que hoje só geram páginas em português. Para EN e ES, cada adapter precisa de `.EnableAllLanguages` e de juntar aos dados os campos de `data/traducoes/<idioma>/<arquivo>.yaml`. As listas (`edicoes`, `volumes`, `titulos`, `premios`, `itens`) entram item por item, na mesma ordem. Sem isso, a lista "Trabalhos recentes" da página inicial fica vazia em EN e ES.
3. **Setup e sites.** `setup.html` e `_partials/lista-sites.html` devem ler `data/traducoes/<idioma>/setup.yaml` e `sites.yaml` quando o idioma não for o português.
4. **Lista de Notas em EN e ES.** Mostrar também as notas só em português, com o rótulo "(em português)", e manter as notas traduzidas apontando para a versão do idioma.
5. **Leia mais.** O shortcode `leiamais` deve cair na página em português quando não houver tradução. Hoje, em ES, o "Leia mais" da nota do homelab some.
6. **Seletor de idioma** no cabeçalho, mostrando só as traduções existentes, e `hreflang` no `head`.
7. **Formulário de contato.** A função `functions/api/contato.js` precisa redirecionar para `/en/contato/enviado/` e `/es/contato/enviado/` (e para os equivalentes de erro) conforme o idioma da página de origem. A categoria e o assunto do e-mail continuam em português.
8. **Ativar.** Trocar `disabled = true` por `false` nos dois idiomas, gerar o site, conferir e publicar.

Teste rápido sem mexer no repositório: copiar o projeto para uma pasta temporária, trocar `disabled = true` por `false` e rodar `hugo`. Em 01/10/2026 esse teste gerou 30 páginas em EN e 19 em ES, sem erros.
