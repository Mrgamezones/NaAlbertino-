// Gera o HTML pronto de cada página depois do `vite build`, para que o Google
// e as prévias de link (WhatsApp, Instagram…) vejam o conteúdo sem rodar
// JavaScript. Também cria sitemap.xml e robots.txt.
// Executado por `npm run build`; não precisa ser chamado à mão.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(raiz, "dist");
const distSsr = path.join(raiz, "dist-ssr");

const { render, CONFIG, PAGINAS, PRODUTOS } = await import(
  pathToFileURL(path.join(distSsr, "entry-server.js")).href
);

const modelo = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const base = CONFIG.url.replace(/\/+$/, "");

const escapar = texto =>
  String(texto).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function precoEmNumero(preco) {
  return Number(String(preco).replace(/\./g, "").replace(",", ".")).toFixed(2);
}

function dadosEstruturados() {
  const dados = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: CONFIG.nomeDoSite,
        url: `${base}/`,
        description: CONFIG.descricao,
        inLanguage: "pt-BR",
      },
      {
        "@type": "ItemList",
        name: "Achadinhos selecionados",
        itemListElement: PRODUTOS.map((produto, indice) => ({
          "@type": "ListItem",
          position: indice + 1,
          item: {
            "@type": "Product",
            name: produto.nome,
            image: `${base}${produto.imagem}`,
            category: produto.categoria,
            offers: {
              "@type": "Offer",
              url: produto.link,
              price: precoEmNumero(produto.precoAtual),
              priceCurrency: "BRL",
              availability: "https://schema.org/InStock",
            },
          },
        })),
      },
    ],
  };
  // "<" escapado para o JSON nunca fechar a tag <script> por engano.
  return `<script type="application/ld+json">${JSON.stringify(dados).replace(/</g, "\\u003c")}</script>`;
}

function cabecalho(rota, pagina) {
  const endereco = rota === "/" ? `${base}/` : `${base}${rota}`;
  const imagem = `${base}${CONFIG.imagemCompartilhamento}`;
  const linhas = [
    `<title>${escapar(pagina.titulo)}</title>`,
    `<meta name="description" content="${escapar(pagina.descricao)}" />`,
  ];
  if (pagina.semIndexar) {
    linhas.push(`<meta name="robots" content="noindex" />`);
  } else {
    linhas.push(
      `<link rel="canonical" href="${endereco}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:locale" content="pt_BR" />`,
      `<meta property="og:site_name" content="${escapar(CONFIG.nomeDoSite)}" />`,
      `<meta property="og:title" content="${escapar(pagina.titulo)}" />`,
      `<meta property="og:description" content="${escapar(pagina.descricao)}" />`,
      `<meta property="og:url" content="${endereco}" />`,
      `<meta property="og:image" content="${imagem}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta name="twitter:card" content="summary_large_image" />`
    );
  }
  if (rota === "/") linhas.push(dadosEstruturados());
  return linhas.join("\n    ");
}

for (const [rota, pagina] of Object.entries(PAGINAS)) {
  const html = modelo
    .replace(/<!--head:inicio-->[\s\S]*?<!--head:fim-->/, cabecalho(rota, pagina))
    .replace('<div id="root"></div>', `<div id="root">${render(rota)}</div>`);
  fs.writeFileSync(path.join(dist, pagina.arquivo), html);
  console.log(`  ${rota} → dist/${pagina.arquivo}`);
}

const indexaveis = Object.entries(PAGINAS).filter(([, pagina]) => !pagina.semIndexar);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexaveis.map(([rota]) => `  <url><loc>${rota === "/" ? `${base}/` : `${base}${rota}`}</loc></url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
fs.rmSync(distSsr, { recursive: true, force: true });
console.log("  sitemap.xml e robots.txt gerados");
