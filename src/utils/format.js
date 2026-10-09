export function precoParaNumero(preco) {
  if (!preco) return NaN;
  return Number(String(preco).replace(/\./g, "").replace(",", "."));
}

export function calcularDesconto(precoAntigo, precoAtual) {
  const antigo = precoParaNumero(precoAntigo);
  const atual = precoParaNumero(precoAtual);
  if (!antigo || !atual || antigo <= atual) return null;
  return Math.round((1 - atual / antigo) * 100);
}

export function formatarVendidos(vendidos) {
  if (!vendidos || vendidos <= 0) return "";
  if (vendidos >= 1000) {
    const mil = (vendidos / 1000).toFixed(1).replace(".", ",");
    return `${mil} mil vendidos`;
  }
  return `${vendidos} vendidos`;
}

export function agruparPorCategoria(itens) {
  return itens.reduce((acc, item) => {
    const cat = item.categoria || "Outros";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});
}
