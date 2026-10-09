import { useEffect, useRef, useState } from "react";
import { CUPONS } from "../data/cupons.js";
import Icon from "./Icon.jsx";
import styles from "./Cupons.module.css";

async function copiar(texto) {
  if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(texto); return; }
  const campo = document.createElement("textarea");
  campo.value = texto;
  campo.className = "sr-only";
  document.body.appendChild(campo);
  campo.select();
  let sucesso;
  try { sucesso = document.execCommand("copy"); } finally { campo.remove(); }
  if (!sucesso) throw new Error("Cópia indisponível");
}
const categorias = ["Todos", ...new Set(CUPONS.map(c => c.categoria).filter(Boolean))];

export default function Cupons() {
  const [categoria, setCategoria] = useState("Todos");
  const [copiado, setCopiado] = useState("");
  const [mensagem, setMensagem] = useState("");
  const temporizador = useRef();
  useEffect(() => () => clearTimeout(temporizador.current), []);
  const visiveis = categoria === "Todos" ? CUPONS : CUPONS.filter(c => c.categoria === categoria);

  async function aoCopiar(codigo) {
    try {
      await copiar(codigo);
      setCopiado(codigo);
      setMensagem(`Cupom ${codigo} copiado. Use o código na loja parceira.`);
      clearTimeout(temporizador.current);
      temporizador.current = setTimeout(() => setCopiado(""), 2500);
    } catch {
      setCopiado("");
      clearTimeout(temporizador.current);
      setMensagem(`Não foi possível copiar automaticamente. Selecione e copie o código ${codigo}.`);
    }
  }

  return <section id="cupons" className={styles.section} aria-labelledby="titulo-cupons">
    <div className="container">
      <div className={styles.heading}><div><span className="eyebrow">O melhor detalhe? O desconto.</span><h2 id="titulo-cupons">Seu próximo look,<br /><em>por um pouco menos.</em></h2></div><div className={styles.intro}><p>Escolha seu cupom, copie o código e aproveite.<br />Um pequeno gesto. Uma boa economia.</p><div className={styles.filters} role="group" aria-label="Filtrar cupons por categoria">{categorias.map(item => <button key={item} type="button" aria-pressed={item === categoria} className={item === categoria ? styles.active : ""} onClick={() => setCategoria(item)}>{item}</button>)}</div></div></div>
      <div className={styles.list}>{visiveis.map(cupom => <article key={cupom.codigo} className={styles.coupon}>
        <div className={styles.top}><span>{cupom.categoria}</span><Icon name="ticket" size={20} /></div>
        <h3>{cupom.valor}</h3><p className={styles.description}>{cupom.descricao}</p><span className={styles.validity}>{cupom.validade}</span>
        <div className={styles.tear} />
        <button type="button" className={`${styles.copy} ${copiado === cupom.codigo ? styles.copied : ""}`} onClick={() => aoCopiar(cupom.codigo)} aria-label={`Copiar cupom ${cupom.codigo}`}><span>{cupom.codigo}</span><span>{copiado === cupom.codigo ? "Copiado!" : "Copiar"}<Icon name={copiado === cupom.codigo ? "check" : "copy"} size={14} /></span></button>
      </article>)}</div>
      <p className={styles.status} role="status">{mensagem}</p>
      <p className={styles.note}>Consulte as condições de uso e a disponibilidade de cada cupom na loja parceira.</p>
    </div>
  </section>;
}
