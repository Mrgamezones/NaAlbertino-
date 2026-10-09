# NaAlbertino — Promoções

Vitrine de moda e cupons em React + Vite. A identidade foi adaptada à referência visual fornecida: tons de marfim e areia, Cormorant Garamond nos títulos, Manrope na interface, fotografia editorial, espaçamento amplo e detalhes em bronze.

## Executar

```sh
npm install
npm run dev
npm run build
```

Se a instalação global do npm estiver quebrada e as dependências já estiverem instaladas, os comandos equivalentes são:

```sh
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173
node node_modules/vite/bin/vite.js build
```

## Conteúdo e visual

- `src/styles/tokens.css`: cores, fontes, medidas e raios.
- `src/data/config.js`: marca, redes sociais e contatos.
- `src/data/produtos.js`: produtos, categorias, preços, links e imagens. `destaque: true` seleciona o produto do hero. `imagemIlustrativa: true` identifica fotos conceituais.
- `src/data/cupons.js`: cupons e categorias dos filtros.
- `public/images`: imagens originais geradas com a ferramenta integrada image_gen e otimizadas para WebP.
- `docs/visual-assets.json`: prompts e procedência das imagens.
- `public/fonts`: fontes servidas localmente e sua licença.

Os preços, cupons e URLs comerciais existentes foram preservados. As fotos geradas são ilustrativas, não fotos verificadas de anúncios. Os links de produtos atualmente apontam para a página inicial da Shopee; as redes sociais e o WhatsApp também contêm endereços genéricos na configuração original.

## Interações

Busca sem distinção de acentos, categorias dinâmicas, favoritos salvos neste navegador, expansão da seleção, filtros e cópia de cupons, menu móvel e rota de privacidade. Links de afiliado mantêm `noopener sponsored`.

## Verificação

`scripts/check-ui.cjs` verifica os fluxos no Chrome sem interface e gera capturas em `artifacts/`. Requer Playwright e Chrome disponíveis. O script usa o runtime do Codex desta máquina por padrão; para outra instalação, informe `CODEX_NODE_MODULES`. A URL padrão é `http://127.0.0.1:5173`, configurável por `PREVIEW_URL`.

```sh
node scripts/check-ui.cjs
node scripts/check-regressions.cjs
```

O teste de regressões verifica avisos do console, retorno ao início ao clicar na marca, link de voltar ao topo, indicação da seção atual no menu e contenção do texto editorial no tablet.
