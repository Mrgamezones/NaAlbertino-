# Prompt base — NaAlbertino - Promoções (React)

Cole este arquivo na raiz do projeto (`PROMPT.md` ou `CLAUDE.md`). Sempre que for
pedir uma alteração pro Claude Code, cole o bloco "PROMPT PARA USAR" abaixo antes
do seu pedido — isso mantém o código no mesmo padrão toda vez.

---

## Sobre o projeto

Landing page de divulgação de roupas via link de afiliado da Shopee, feita em
**React + Vite** (JavaScript, sem TypeScript), em conformidade com a LGPD.

```
naalbertino 2.0/
├── index.html                 → HTML raiz do Vite (só o #root + metadados)
├── package.json               → scripts: dev / build / preview
├── vite.config.js
├── netlify.toml               → build (Netlify)
├── PROMPT.md                  → este arquivo
├── public/
│   ├── logo/                  → logos do site
│   ├── fonts/                 → fontes WOFF2 (subconjunto latino) + licença
│   ├── images/                → fotos dos produtos + og.jpg (prévia de link)
│   └── _headers               → cabeçalhos de segurança e cache do Netlify
├── scripts/
│   ├── prerender.mjs          → gera o HTML pronto de cada página + sitemap/robots
│   ├── check-ui.cjs           → teste completo no Chrome (npm run test:ui)
│   └── check-regressions.cjs  → testes de regressão (npm run test:regressoes)
└── src/
    ├── main.jsx               → bootstrap do React (BrowserRouter)
    ├── entry-server.jsx       → renderização usada só no build
    ├── App.jsx                → layout + rotas (Home, Política e 404)
    ├── data/
    │   ├── config.js          → nome, URL, slogan, imagens, rótulos de categoria, redes, contato, DPO
    │   ├── paginas.js         → título/descrição de cada página (SEO)
    │   ├── produtos.js        → array PRODUTOS
    │   └── cupons.js          → array CUPONS
    ├── components/
    │   ├── Header.jsx         → menu fixo no topo + seção atual pela rolagem
    │   ├── Hero.jsx           → chamada principal
    │   ├── BannerLoja.jsx     → banner com emblema circular (SVG)
    │   ├── Cupons.jsx         → abas de cupom (geradas pela `categoria`)
    │   ├── Produtos.jsx       → seções por categoria (geradas sozinhas)
    │   ├── ProdutoCard.jsx    → card do produto (selo "-XX%" calculado)
    │   ├── Selos.jsx          → seção de confiança (`.seguranca`)
    │   ├── Footer.jsx
    │   ├── CookieAviso.jsx    → aviso de cookies (LGPD, localStorage)
    │   └── *.module.css       → estilos de cada componente
    ├── pages/
    │   ├── Home.jsx
    │   ├── PoliticaPrivacidade.jsx (+ .module.css)
    │   └── NaoEncontrada.jsx (+ .module.css) → página 404
    ├── styles/
    │   ├── tokens.css         → TODAS as cores/fontes/tamanhos de texto no `:root`
    │   └── global.css         → reset + classes utilitárias (.container, .tag-cta…)
    └── utils/
        └── format.js          → desconto, "vendidos", datas
```

## Regras fixas (não mudar sem pedir)

- **Nunca misturar HTML/CSS/JS inline** — cada coisa no seu arquivo. Estilo de
  componente vai no `*.module.css`; nada de `style={{ ... }}` espalhado.
- **Produtos só se editam em `src/data/produtos.js`**, no array `PRODUTOS`.
  Nunca duplicar cards direto no JSX.
- **Cupons e abas só se editam em `src/data/cupons.js`**, no array `CUPONS`. As
  abas são geradas sozinhas a partir da `categoria` de cada cupom — nunca criar
  uma aba fixa no JSX.
- **Cores e fontes só se editam em `src/styles/tokens.css`**, dentro de
  `:root { ... }` (variáveis `--bg`, `--header-bg`, `--text`, `--text-muted`,
  `--surface-2`, `--primary`, `--primary-dark`, `--font-display`, etc.).
  Nunca usar cor "solta" (hex direto) espalhada pelo CSS.
- **Tamanho de texto da interface** usa a escala `--fs-xs` (12px), `--fs-sm`
  (13px), `--fs-base` (15px) e `--fs-md` (16px). Nada de texto menor que 12px.
- **Aviso de cookies** (`CookieAviso.jsx`) é só informativo porque o site não
  rastreia ninguém. Se entrar Google Analytics, Meta Pixel ou parecido, o aviso
  precisa virar "Aceitar / Recusar", o script só carrega depois do aceite, e a
  Política de Privacidade (com `politicaAtualizadaEm` no config) é atualizada.
- **Nada de `localStorage`/`window` na primeira renderização** dos componentes:
  o HTML é gerado no build, então leia o navegador dentro de `useEffect`.
- **Selo de segurança**: a seção `.seguranca` (`Selos.jsx`) não pode virar selo
  falso (tipo logo de certificadora que a página não tem de verdade). Não
  reintroduzir texto dizendo que o pagamento acontece na página oficial da
  Shopee — isso foi removido de propósito.
- **Banner da loja** (`BannerLoja.jsx`): o texto do emblema (as duas linhas
  curvas do círculo) vem automaticamente de `CONFIG.nomeDoSite`, dividido pela
  parte antes/depois do "-". Não escrever esse texto fixo no JSX.
- **Link de afiliado**: todo `<a className="tag-cta">` tem que manter
  `rel="noopener sponsored"` (e `target="_blank"`).
- **Não criar dado fixo no JSX** quando ele puder vir do `config.js`.
- Layout mobile-first, testar sempre em tela pequena antes de dar como pronto.

## Como rodar

```bash
npm install     # instala as dependências
npm run dev     # servidor de desenvolvimento
npm run build   # build de produção (gera dist/)
npm run preview # serve o build de produção localmente
```

## Como adicionar/editar um produto

Abrir `src/data/produtos.js` e mexer só no array `PRODUTOS`:

```js
{
  id: "nome-da-peca",             // único, minúsculas e hífens; não mude depois de publicado
  nome: "Nome da peça",
  imagem: "/images/arquivo.webp", // ou "" para mostrar "Foto em breve"
  imagemIlustrativa: true,        // só se a foto não for a do anúncio
  categoria: "Ofertas Populares", // vira uma seção com esse título automaticamente
  precoAtual: "39,90",
  precoAntigo: "69,90",           // "" se não tiver desconto — o selo "-XX%" na foto é calculado sozinho
  vendidos: 4,                    // opcional — 0 ou remova a linha pra não mostrar
  link: "https://shopee.com.br/SEU-LINK",
}
```

Uma categoria nova cria o filtro sozinha, não precisa mexer no JSX. Para exibir
um nome diferente no filtro/card, use `categorias` no `config.js`. Nada mais precisa ser tocado — o card é gerado sozinho.

## Como adicionar/editar um cupom

Abrir `src/data/cupons.js` e mexer só no array `CUPONS`:

```js
{
  categoria: "Roupas",        // vira aba automaticamente (repetir o nome agrupa no mesmo cupom)
  valor: "15% OFF",
  descricao: "Em compras acima de R$ 50",
  codigo: "ACHADO15",
  validoAte: "2026-08-30",    // último dia (AAAA-MM-DD); depois disso o cupom some sozinho
}
```

- A categoria `"Todos"` é sempre a primeira aba e mostra todos os cupons juntos.
- Uma categoria nova (ex: `"Beleza"`) cria a aba sozinha — não precisa mexer no JSX.
- O botão "Copiar" já copia o código pro clipboard sem precisar editar nada.

## Como mudar a identidade visual

Tudo fica no topo do `src/styles/tokens.css`, dentro de `:root`. Trocar ali
reflete em toda a página automaticamente (não precisa caçar cor em cada seletor).

---

## PROMPT PARA USAR no Claude Code

Copie o bloco abaixo, cole no chat do Claude Code dentro da pasta do projeto,
e complete a última linha com o que você quer mudar:

```
Este é o projeto "NaAlbertino - Promoções" (landing de afiliado Shopee em
React + Vite, em conformidade com a LGPD, com HTML pré-gerado no build por
scripts/prerender.mjs). Estrutura fixa: src/App.jsx (layout + rotas),
src/data/config.js (nome, URL, imagens, redes, contato/encarregado),
src/data/paginas.js (título/descrição de cada página),
src/data/produtos.js (array PRODUTOS), src/data/cupons.js (array CUPONS),
src/components/*.jsx + *.module.css (um componente por arquivo, estilo no CSS
Module), src/styles/tokens.css (todas as cores/fontes no :root) e
src/pages/PoliticaPrivacidade.jsx. Não crie estilo inline nem texto/dado fixo
espalhado no JSX quando puder vir do config.js. Produtos só entram no array
PRODUTOS (cada um com uma `categoria`, que vira seção sozinha) e cupons só no
array CUPONS (idem para abas). O selo de desconto na foto e o emblema do banner
são calculados/preenchidos automaticamente — não escrever esses valores fixos
no JSX. Texto da interface nunca menor que --fs-xs (12px). Não leia
localStorage/window fora de useEffect (o HTML é gerado no build). Mantenha
rel="noopener sponsored" nos links de afiliado, mantenha o _headers, e não
reintroduza texto dizendo que o pagamento acontece na página oficial da
Shopee. Ao terminar, rode npm run build, npm run preview e npm run test:ui.

Pedido: [descreva aqui o que você quer mudar ou adicionar]
```
