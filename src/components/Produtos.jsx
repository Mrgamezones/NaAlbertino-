import { useEffect, useRef, useState } from "react";
import { PRODUTOS } from "../data/produtos.js";
import ProdutoCard from "./ProdutoCard.jsx";
import Icon from "./Icon.jsx";
import styles from "./Produtos.module.css";

const CHAVE = "naalbertino:favoritos";
const categorias = ["Todos", ...new Set(PRODUTOS.map(p => p.categoria))];
const normalizar = texto => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Produtos() {
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [salvos, setSalvos] = useState(() => {
    try { const itens = JSON.parse(localStorage.getItem(CHAVE) || "[]"); return Array.isArray(itens) ? itens.filter(item => typeof item === "string") : []; } catch { return []; }
  });
  const buscaRef = useRef(null);
  useEffect(() => { try { localStorage.setItem(CHAVE, JSON.stringify(salvos)); } catch { /* A seleção continua funcionando nesta visita. */ } }, [salvos]);
  useEffect(() => {
    function focarBusca() { if (window.location.hash === "#busca-produtos") buscaRef.current?.focus({ preventScroll: true }); }
    focarBusca();
    window.addEventListener("hashchange", focarBusca);
    return () => window.removeEventListener("hashchange", focarBusca);
  }, []);
  const filtrados = PRODUTOS.filter(p => (categoria === "Todos" || (categoria === "Salvos" ? salvos.includes(p.nome) : p.categoria === categoria)) && normalizar(p.nome).includes(normalizar(busca.trim()))).sort((a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)));
  const visiveis = mostrarTodos || categoria !== "Todos" || busca.trim() ? filtrados : filtrados.slice(0, 4);
  function alternarSalvo(nome) { setSalvos(atuais => atuais.includes(nome) ? atuais.filter(item => item !== nome) : [...atuais, nome]); }
  function limpar() { setBusca(""); setCategoria("Todos"); setMostrarTodos(false); }

  return <section id="produtos" className={styles.section} aria-labelledby="titulo-produtos">
    <div className="container">
      <div className={styles.heading}><div><span className="eyebrow">A curadoria NaAlbertino</span><h2 id="titulo-produtos">Pequenos preços.<br className={styles.mobileBreak} /> Grandes <em>encontros.</em></h2></div><p>Do básico que fica ao detalhe que transforma.<br />Seu próximo favorito pode estar aqui.</p></div>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filtrar achadinhos por categoria">
          {categorias.map(item => <button key={item} type="button" aria-pressed={categoria === item} className={categoria === item ? styles.active : ""} onClick={() => { setCategoria(item); setMostrarTodos(false); }}>{item === "Ofertas Populares" ? "Mais amados" : item}</button>)}
          <button type="button" aria-pressed={categoria === "Salvos"} className={categoria === "Salvos" ? styles.active : ""} onClick={() => setCategoria("Salvos")}><Icon name="heart" size={13} />Salvos{salvos.length ? ` (${salvos.length})` : ""}</button>
        </div>
        <label className={styles.search}><Icon name="search" size={16} /><span className="sr-only">Buscar produtos</span><input ref={buscaRef} id="busca-produtos" type="search" value={busca} onChange={event => setBusca(event.target.value)} placeholder="Encontre seu achado" /></label>
      </div>
      <div className={styles.grid}>
        {visiveis.map(produto => <ProdutoCard key={produto.nome} produto={produto} salvo={salvos.includes(produto.nome)} onSalvar={() => alternarSalvo(produto.nome)} />)}
      </div>
      <p className="sr-only" role="status">{visiveis.length} achadinhos exibidos.</p>
      {!visiveis.length && <div className={styles.empty}><Icon name={categoria === "Salvos" ? "heart" : "search"} size={28} /><h3>{categoria === "Salvos" && !busca ? "Seus favoritos começam aqui." : "Ainda não encontramos esse achado."}</h3><p>{categoria === "Salvos" && !busca ? "Toque no coração de uma peça para guardá-la nesta seleção." : "Tente outro nome ou explore todas as categorias."}</p><button className="button button-secondary" onClick={limpar}>Explorar todos os achadinhos</button></div>}
      {visiveis.length < filtrados.length && <div className={styles.more}><button className="button button-secondary" onClick={() => setMostrarTodos(true)}>Ver todos os achadinhos <Icon name="arrow" size={17} /></button></div>}
      <p className={styles.disclaimer}>Imagens ilustrativas. Confira os detalhes, o preço e a disponibilidade na loja parceira.</p>
    </div>
  </section>;
}
