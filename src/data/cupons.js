// `validoAte` é o último dia de uso do cupom (formato AAAA-MM-DD). No dia
// seguinte ele some do site sozinho, sem precisar apagar daqui.
// PENDENTE: conferir se cada código existe e funciona na loja parceira.
export const CUPONS = [
  {
    categoria: "Roupas",
    valor: "15% OFF",
    descricao: "Em compras acima de R$ 50",
    codigo: "ACHADO15",
    validoAte: "2026-12-30",
  },
  {
    categoria: "Roupas",
    valor: "R$ 10 OFF",
    descricao: "Primeira compra na loja",
    codigo: "BEMVINDO10",
    validoAte: "2026-12-30",
  },
  {
    categoria: "Calçados",
    valor: "20% OFF",
    descricao: "Tênis e sandálias selecionados",
    codigo: "PES20",
    validoAte: "2026-12-15",
  },
  {
    categoria: "Frete",
    valor: "FRETE GRÁTIS",
    descricao: "Em pedidos acima de R$ 79",
    codigo: "FRETEGRATIS",
    validoAte: "2026-12-31",
  },
];
