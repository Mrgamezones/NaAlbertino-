import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App, { ROUTER_FUTURE } from "./App.jsx";

export { CONFIG } from "./data/config.js";
export { PAGINAS } from "./data/paginas.js";
export { PRODUTOS } from "./data/produtos.js";

// Usado só no build (scripts/prerender.mjs) para gerar o HTML de cada página.
export function render(url) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url} future={ROUTER_FUTURE}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
