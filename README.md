# lucasmagdiel.com

Site pessoal de Lucas Magdiel: estático, feito com [Hugo](https://gohugo.io) (≥ 0.146; testado na 0.166) e tema próprio (`themes/lm`), publicado no Cloudflare Pages.

## Estrutura

| Pasta | O que é |
|---|---|
| `content/` | Páginas em Markdown. As fichas do portfólio não têm arquivo próprio: são geradas pelos *content adapters* (`_content.gotmpl`) a partir de `data/`. |
| `data/` | Fichas do portfólio: `livros.yaml`, `audiovisual.yaml`, `ebc.yaml`, `revisao.yaml`, `estatisticas.yaml`. **É aqui que se edita o portfólio.** |
| `assets/capas/` | Capas, pôsteres e frames. O Hugo gera as versões WebP (1x/2x) no build. |
| `themes/lm/` | Tema: layouts (`layouts/`), parciais (`_partials/`) e CSS (`assets/css/main.css`). |
| `functions/` | Cloudflare Pages Functions: `_middleware.js` (senha do preview e `noindex`) e `api/contato.js` (formulário). |
| `deploy/ansible/` | Tarefas de lançamento (domínio no Pages). Não rodar antes da Fase 3. |
| `.github/workflows/deploy.yml` | Build + publicação a cada push. |

## Uso local (PowerShell)

```powershell
winget install Hugo.Hugo.Extended     # uma vez
hugo server                            # http://localhost:1313
hugo --gc --minify                     # build em public/
```

Para testar as Functions localmente: `npx wrangler pages dev public` (lê segredos de `.dev.vars`).

## Portfólio: como acrescentar uma obra

1. Copie a imagem para `assets/capas/<pasta>/` (capa plana, vertical; para séries, pôster oficial de preferência em português).
2. Acrescente um item no YAML correspondente em `data/` (mesmo formato dos outros; `sinopse` curta e original).
3. Itens com `status: aguardando` ficam fora do site (ex.: obras ainda não lançadas).
4. Produções sem pôster usam o card padronizado: informe `frame` (imagem em `assets/capas/`) e `ancora` (recorte: `Center`, `Top`, `Right`…).

## Publicação

- **Cloudflare Pages**, projeto `lucasmagdiel` (upload direto via `wrangler`).
- **GitHub Actions** publica a cada push: `main` → produção; outros ramos → preview.
  Segredos do repositório: `CLOUDFLARE_API_TOKEN` (Account › Cloudflare Pages › Edit) e `CLOUDFLARE_ACCOUNT_ID`.
- Variáveis/segredos do projeto no Pages:
  - `PREVIEW_AUTH` = `usuario:senha` → enquanto existir, o site inteiro pede senha e sai com `noindex`. **Remover no lançamento.**
  - `TURNSTILE_SECRET` (+ `turnstileSiteKey` em `hugo.toml`) → proteção do formulário.
  - `FASTMAIL_API_TOKEN` → entrega das mensagens do formulário na caixa de entrada (JMAP).
  - `CONTATO_DESTINO`, `CONTATO_REMETENTE` → opcionais (endereços ficam só nas variáveis do Cloudflare, nunca no código).

Publicação manual (com `.env` contendo `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID`):

```bash
hugo --gc --minify
npx wrangler pages deploy public --project-name=lucasmagdiel --branch=main
```

## Idiomas

PT ativo; EN e ES configurados em `hugo.toml` com `disabled = true`. Para ativar: traduzir `content/` (ex.: `content/_index.en.md`), criar `i18n/en.yaml` e remover o `disabled`.
