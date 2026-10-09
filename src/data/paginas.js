import { CONFIG, MARCA } from "./config.js";

// Título e descrição de cada página. São gravados no HTML gerado pelo build
// (para Google e prévias de compartilhamento) e trocados ao navegar pelo site.
export const PAGINAS = {
  "/": {
    titulo: `${MARCA.nome} — ${CONFIG.slogan}`,
    descricao: CONFIG.descricao,
    arquivo: "index.html",
  },
  "/politica-privacidade": {
    titulo: `Política de Privacidade — ${MARCA.nome}`,
    descricao: `Como o site ${MARCA.nome} trata seus dados, conforme a LGPD.`,
    arquivo: "politica-privacidade.html",
  },
  "/404": {
    titulo: `Página não encontrada — ${MARCA.nome}`,
    descricao: "O endereço acessado não existe ou mudou de lugar.",
    arquivo: "404.html",
    semIndexar: true,
  },
};

export function paginaDaRota(caminho) {
  const limpo = caminho.length > 1 ? caminho.replace(/\/+$/, "") : caminho;
  return PAGINAS[limpo] || PAGINAS["/404"];
}
