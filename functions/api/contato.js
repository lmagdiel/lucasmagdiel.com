// Formulário de contato: POST /api/contato
// Sem banco de dados: a mensagem é validada, passa pelo Turnstile (se configurado)
// e é entregue diretamente na caixa de entrada do Fastmail via JMAP (Email/set),
// com Reply-To apontando para quem escreveu.
//
// Variáveis/segredos do projeto no Cloudflare Pages:
//   TURNSTILE_SECRET     segredo do widget Turnstile (opcional, recomendado)
//   FASTMAIL_API_TOKEN   token de API do Fastmail com permissão de e-mail (JMAP Mail)
//   CONTATO_DESTINO      endereço exibido como destinatário (opcional)
//   CONTATO_REMETENTE    endereço exibido como remetente (opcional; sem ele, aparece o de quem escreveu)
//
// Nenhum endereço fica no código: o repositório é público e e-mail exposto atrai spam.

const CATEGORIAS = { traducao: 'Tradução e legendagem', desenvolvimento: 'Desenvolvimento', geral: 'Geral' };
const LIMITES = { nome: 120, email: 200, mensagem: 5000 };

const redirecionar = (request, caminho) => Response.redirect(new URL(caminho, request.url).toString(), 303);

// Páginas de retorno no idioma do formulário (campo oculto "idioma"); português na raiz.
const PREFIXOS = { pt: '', en: '/en', es: '/es' };
const IDIOMAS = { pt: 'português', en: 'inglês', es: 'espanhol' };
const prefixo = (form) => (form && PREFIXOS[form.get('idioma')]) || '';

function limpar(valor, max) {
  return String(valor || '').replace(/\r\n?/g, '\n').trim().slice(0, max);
}

async function verificarTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET) return true; // sem segredo configurado: não bloqueia (fase de testes)
  if (!token) return false;
  const corpo = new FormData();
  corpo.append('secret', env.TURNSTILE_SECRET);
  corpo.append('response', token);
  if (ip) corpo.append('remoteip', ip);
  const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: corpo });
  const dados = await r.json();
  return Boolean(dados.success);
}

async function jmap(env) {
  const auth = { Authorization: `Bearer ${env.FASTMAIL_API_TOKEN}` };
  const sessao = await (await fetch('https://api.fastmail.com/jmap/session', { headers: auth })).json();
  const accountId = sessao.primaryAccounts['urn:ietf:params:jmap:mail'];
  const chamar = async (methodCalls) => {
    const r = await fetch(sessao.apiUrl, {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ using: ['urn:ietf:params:jmap:core', 'urn:ietf:params:jmap:mail'], methodCalls }),
    });
    if (!r.ok) throw new Error(`JMAP HTTP ${r.status}`);
    return (await r.json()).methodResponses;
  };
  return { accountId, chamar };
}

async function entregarFastmail(env, msg) {
  const { accountId, chamar } = await jmap(env);
  const [[, caixas]] = await chamar([['Mailbox/query', { accountId, filter: { role: 'inbox' } }, 'a']]);
  const inboxId = caixas.ids && caixas.ids[0];
  if (!inboxId) throw new Error('Caixa de entrada não encontrada');

  const texto = [
    `Nome: ${msg.nome}`,
    `E-mail: ${msg.email}`,
    `Assunto: ${CATEGORIAS[msg.categoria]}`,
    `Página: ${msg.idioma}`,
    `Enviado em: ${new Date().toISOString()}`,
    '',
    msg.mensagem,
  ].join('\n');

  const [[metodo, resultado]] = await chamar([[
    'Email/set',
    {
      accountId,
      create: {
        m: {
          mailboxIds: { [inboxId]: true },
          keywords: {},
          from: [{ name: `${msg.nome} (via site)`, email: env.CONTATO_REMETENTE || msg.email }],
          replyTo: [{ name: msg.nome, email: msg.email }],
          ...(env.CONTATO_DESTINO ? { to: [{ email: env.CONTATO_DESTINO }] } : {}),
          subject: `[site · ${CATEGORIAS[msg.categoria]}] ${msg.nome}`,
          receivedAt: new Date().toISOString(),
          bodyValues: { t: { value: texto, charset: 'utf-8' } },
          textBody: [{ partId: 't', type: 'text/plain' }],
        },
      },
    },
    'b',
  ]]);
  if (metodo !== 'Email/set' || !resultado.created || !resultado.created.m) {
    throw new Error('Falha ao criar a mensagem: ' + JSON.stringify(resultado.notCreated || resultado));
  }
}

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return redirecionar(request, '/contato/erro/');
  }
  const p = prefixo(form);

  // Armadilha para robôs: campo invisível preenchido → finge sucesso.
  if (limpar(form.get('website'), 200)) return redirecionar(request, `${p}/contato/enviado/`);

  const msg = {
    nome: limpar(form.get('nome'), LIMITES.nome),
    email: limpar(form.get('email'), LIMITES.email),
    categoria: CATEGORIAS[form.get('categoria')] ? form.get('categoria') : 'geral',
    mensagem: limpar(form.get('mensagem'), LIMITES.mensagem),
    idioma: IDIOMAS[form.get('idioma')] || IDIOMAS.pt,
  };
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(msg.email);
  if (!msg.nome || !emailValido || msg.mensagem.length < 5) return redirecionar(request, `${p}/contato/erro/`);

  const ip = request.headers.get('CF-Connecting-IP');
  if (!(await verificarTurnstile(env, form.get('cf-turnstile-response'), ip))) {
    return redirecionar(request, `${p}/contato/erro/`);
  }

  if (!env.FASTMAIL_API_TOKEN) {
    console.warn('contato: FASTMAIL_API_TOKEN não configurado');
    return redirecionar(request, `${p}/contato/erro/`);
  }

  try {
    await entregarFastmail(env, msg);
  } catch (e) {
    console.error('contato:', e.message);
    return redirecionar(request, `${p}/contato/erro/`);
  }
  return redirecionar(request, `${p}/contato/enviado/`);
}

export function onRequestGet({ request }) {
  return redirecionar(request, '/contato/');
}
