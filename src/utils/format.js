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

// Datas no formato AAAA-MM-DD, comparadas como texto (sem fuso horário).
export function dataDeHoje(data = new Date()) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

export function formatarData(iso, { comAno = true } = {}) {
  const [ano, mes, dia] = iso.split("-");
  return comAno ? `${dia}/${mes}/${ano}` : `${dia}/${mes}`;
}

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

export function formatarDataPorExtenso(iso) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
}
