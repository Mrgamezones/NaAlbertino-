import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App, { ROUTER_FUTURE } from "./App.jsx";
import "./styles/global.css";

const raiz = document.getElementById("root");
const app = (
  <StrictMode>
    <BrowserRouter future={ROUTER_FUTURE}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// No build, o HTML já vem pronto (gerado por scripts/prerender.mjs) e o React
// só assume o controle. No `npm run dev`, a página é montada do zero.
if (raiz.hasChildNodes()) hydrateRoot(raiz, app);
else createRoot(raiz).render(app);
