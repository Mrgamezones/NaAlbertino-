import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function dataDeHoje() {
  const agora = new Date();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${agora.getFullYear()}-${mes}-${dia}`;
}

// No `npm run preview`, imita o Netlify: endereço sem arquivo correspondente
// recebe o dist/404.html com status 404 (em vez da página inicial).
function paginaNaoEncontradaNoPreview() {
  return {
    name: "pagina-nao-encontrada-no-preview",
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const caminho = decodeURIComponent(req.url.split("?")[0]).replace(/\/+$/, "") || "/";
        const existe = caminho === "/" || [caminho, `${caminho}.html`].some(arquivo => fs.existsSync(path.join(dist, arquivo)) && fs.statSync(path.join(dist, arquivo)).isFile());
        if (existe || !req.headers.accept?.includes("text/html")) return next();
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(fs.readFileSync(path.join(dist, "404.html")));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), paginaNaoEncontradaNoPreview()],
  define: {
    // Usada para esconder cupons vencidos no HTML gerado pelo build.
    __DATA_DO_BUILD__: JSON.stringify(dataDeHoje()),
  },
  build: {
    outDir: "dist",
  },
});
