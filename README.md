# NaAlbertino — Promoções

Vitrine de moda e cupons em React + Vite. A identidade usa tons de marfim e areia, Cormorant Garamond nos títulos, Manrope na interface, fotografia editorial, espaçamento amplo e detalhes em bronze.

## Executar

```sh
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # gera dist/ com o HTML pronto de cada página
npm run preview   # serve o dist/ em http://127.0.0.1:5173, como no Netlify
```

## Antes de publicar (pendências de conteúdo)

Estes itens dependem de informações reais e estão marcados com `PENDENTE` no código:

- `src/data/produtos.js`: os `link` ainda apontam para a página inicial da Shopee, sem link de afiliado. As fotos são ilustrativas, geradas por IA.
- `src/data/config.js`: `url` (domínio definitivo), perfis de Instagram/TikTok, número do WhatsApp e os e-mails de contato e do DPO.
- `src/data/cupons.js`: conferir se cada código existe na loja parceira.

## Conteúdo e visual

- `src/styles/tokens.css`: cores, fontes, escala de tamanhos de texto, medidas e raios.
- `src/data/config.js`: marca, URL, slogan, imagens do Hero e da seção Sobre, rótulos de categoria, redes sociais, contatos e data da Política de Privacidade.
- `src/data/paginas.js`: título e descrição de cada página.
- `src/data/produtos.js`: produtos com `id` único. `destaque: true` seleciona o produto do Hero e `imagemIlustrativa: true` identifica fotos conceituais.
- `src/data/cupons.js`: cupons, categorias dos filtros e `validoAte`. Cupons vencidos somem sozinhos.
- `public/images`: imagens em WebP e `og.jpg` (1200×630, prévia ao compartilhar o link). `docs/visual-assets.json` registra os prompts e a origem das imagens.
- `public/fonts`: fontes em WOFF2 (subconjunto latino, ~68 KB no total) e a licença.

## Como o build funciona

`npm run build` executa três etapas:

1. `vite build` gera o JavaScript e o CSS.
2. `vite build --ssr src/entry-server.jsx` gera a versão para servidor.
3. `scripts/prerender.mjs` grava `index.html`, `politica-privacidade.html` e `404.html` com o conteúdo já renderizado, título, descrição, link canônico, tags Open Graph e dados estruturados (schema.org). Também cria `sitemap.xml` e `robots.txt`.

No navegador, o React assume o HTML pronto (hidratação). Por isso os componentes só leem `localStorage` e `window` dentro de `useEffect`. No Netlify, endereços inexistentes recebem o `404.html` com status 404.

## Interações

Busca sem distinção de acentos, filtros por categoria, favoritos salvos neste navegador (os favoritos antigos, salvos pelo nome, são migrados para o `id`), expansão da seleção, filtros e cópia de cupons, menu fixo que indica a seção visível, menu móvel e páginas de privacidade e 404. Links de afiliado mantêm `noopener sponsored`.

## Verificação

Os testes usam o `playwright-core` do projeto com o Google Chrome instalado na máquina. Com o `npm run preview` rodando:

```sh
npm run test:ui
npm run test:regressoes
```

`test:ui` cobre filtros, busca, favoritos, cupons, privacidade, 404, menu fixo e móvel, imagens e 5 larguras de tela, e salva capturas em `artifacts/`. Defina `ESPERA_STATUS_404=1` para exigir o status HTTP 404. `PREVIEW_URL` troca o endereço testado.
