import { useEffect, useRef, useState } from "react";
import { CUPONS } from "../data/cupons.js";
import { dataDeHoje, formatarData } from "../utils/format.js";
import Icon from "./Icon.jsx";
import styles from "./Cupons.module.css";

/* global __DATA_DO_BUILD__ */
// No HTML gerado pelo build, os cupons são filtrados pela data do build. Logo
// que a página abre, o filtro passa a usar a data do aparelho do visitante.
const DATA_INICIAL = typeof __DATA_DO_BUILD__ === "string" ? __DATA_DO_BUILD__ : dataDeHoje();

async function copiar(texto) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(texto);
    return;
  }
  const campo = document.createElement("textarea");
  campo.value = texto;
  campo.className = "sr-only";
  document.body.appendChild(campo);
  campo.select();
  let sucesso;
  try {
    sucesso = document.execCommand("copy");
  } finally {
    campo.remove();
  }
  if (!sucesso) throw new Error("Cópia indisponível");
}

function textoDaValidade(validoAte, hoje) {
  if (validoAte === hoje) return "Válido só hoje";
  const mesmoAno = validoAte.slice(0, 4) === hoje.slice(0, 4);
  return `Válido até ${formatarData(validoAte, { comAno: !mesmoAno })}`;
}

export default function Cupons() {
  const [hoje, setHoje] = useState(DATA_INICIAL);
  const [categoria, setCategoria] = useState("Todos");
  const [copiado, setCopiado] = useState("");
  const [mensagem, setMensagem] = useState("");
  const temporizador = useRef();
  useEffect(() => { setHoje(dataDeHoje()); }, []);
  useEffect(() => () => clearTimeout(temporizador.current), []);

  const validos = CUPONS.filter(cupom => !cupom.validoAte || cupom.validoAte >= hoje);
  const categorias = ["Todos", ...new Set(validos.map(cupom => cupom.categoria).filter(Boolean))];
  const categoriaAtual = categorias.includes(categoria) ? categoria : "Todos";
  const visiveis = categoriaAtual === "Todos" ? validos : validos.filter(cupom => cupom.categoria === categoriaAtual);

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

  return (
    <section id="cupons" className={styles.section} aria-labelledby="titulo-cupons">
      <div className="container">
        <div className={styles.heading}>
          <div>
            <span className="eyebrow">O melhor detalhe? O desconto.</span>
            <h2 id="titulo-cupons">Seu próximo look,<br /><em>por um pouco menos.</em></h2>
          </div>
          {validos.length > 0 && (
            <div className={styles.intro}>
              <p>Escolha seu cupom, copie o código e aproveite.<br />Um pequeno gesto. Uma boa economia.</p>
              <div className={styles.filters} role="group" aria-label="Filtrar cupons por categoria">
                {categorias.map(item => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={item === categoriaAtual}
                    className={item === categoriaAtual ? styles.active : ""}
                    onClick={() => setCategoria(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        {validos.length === 0 ? (
          <div className={styles.empty}>
            <Icon name="ticket" size={28} />
            <p>Novos cupons chegam em breve. Enquanto isso, confira os achadinhos com desconto.</p>
            <a className="button button-secondary" href="#produtos">Ver achadinhos</a>
          </div>
        ) : (
          <div className={styles.list}>
            {visiveis.map(cupom => {
              const foiCopiado = copiado === cupom.codigo;
              return (
                <article key={cupom.codigo} className={styles.coupon}>
                  <div className={styles.top}>
                    <span>{cupom.categoria}</span>
                    <Icon name="ticket" size={20} />
                  </div>
                  <h3>{cupom.valor}</h3>
                  <p className={styles.description}>{cupom.descricao}</p>
                  {cupom.validoAte && <span className={styles.validity}>{textoDaValidade(cupom.validoAte, hoje)}</span>}
                  <div className={styles.tear} />
                  <button
                    type="button"
                    className={`${styles.copy} ${foiCopiado ? styles.copied : ""}`}
                    onClick={() => aoCopiar(cupom.codigo)}
                    aria-label={`Copiar cupom ${cupom.codigo}`}
                  >
                    <span>{cupom.codigo}</span>
                    <span>
                      {foiCopiado ? "Copiado!" : "Copiar"}
                      <Icon name={foiCopiado ? "check" : "copy"} size={14} />
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        )}
        <p className={styles.status} role="status">{mensagem}</p>
        <p className={styles.note}>Consulte as condições de uso e a disponibilidade de cada cupom na loja parceira.</p>
      </div>
    </section>
  );
}
