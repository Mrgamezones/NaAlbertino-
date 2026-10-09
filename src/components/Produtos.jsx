import { useEffect, useRef, useState } from "react";
import { MARCA, rotuloDaCategoria } from "../data/config.js";
import { PRODUTOS } from "../data/produtos.js";
import ProdutoCard from "./ProdutoCard.jsx";
import Icon from "./Icon.jsx";
import styles from "./Produtos.module.css";

const CHAVE = "naalbertino:favoritos";
const LIMITE_INICIAL = 4;
const categorias = ["Todos", ...new Set(PRODUTOS.map(produto => produto.categoria))];
const normalizar = texto => texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Lê os favoritos salvos. Versões antigas do site guardavam o nome do produto
// em vez do `id`; esses nomes são convertidos aqui.
function lerFavoritos() {
  try {
    const itens = JSON.parse(localStorage.getItem(CHAVE) || "[]");
    if (!Array.isArray(itens)) return [];
    const ids = itens
      .filter(item => typeof item === "string")
      .map(item => PRODUTOS.find(produto => produto.id === item || produto.nome === item)?.id)
      .filter(Boolean);
    return [...new Set(ids)];
  } catch {
    return [];
  }
}

export default function Produtos() {
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [salvos, setSalvos] = useState([]);
  const [favoritosCarregados, setFavoritosCarregados] = useState(false);
  const buscaRef = useRef(null);

  useEffect(() => {
    setSalvos(lerFavoritos());
    setFavoritosCarregados(true);
  }, []);
  useEffect(() => {
    if (!favoritosCarregados) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify(salvos));
    } catch {
      /* A seleção continua funcionando nesta visita. */
    }
  }, [salvos, favoritosCarregados]);
  useEffect(() => {
    function focarBusca() {
      if (window.location.hash === "#busca-produtos") buscaRef.current?.focus({ preventScroll: true });
    }
    focarBusca();
    window.addEventListener("hashchange", focarBusca);
    return () => window.removeEventListener("hashchange", focarBusca);
  }, []);

  const termo = normalizar(busca.trim());
  const filtrados = PRODUTOS
    .filter(produto => {
      if (categoria === "Salvos") return salvos.includes(produto.id);
      return categoria === "Todos" || produto.categoria === categoria;
    })
    .filter(produto => normalizar(produto.nome).includes(termo))
    .sort((a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)));
  const visiveis = mostrarTodos || categoria !== "Todos" || termo ? filtrados : filtrados.slice(0, LIMITE_INICIAL);
  const vazioDeFavoritos = categoria === "Salvos" && !termo;

  function alternarSalvo(id) {
    setSalvos(atuais => (atuais.includes(id) ? atuais.filter(item => item !== id) : [...atuais, id]));
  }
  function escolherCategoria(item) {
    setCategoria(item);
    setMostrarTodos(false);
  }
  function limpar() {
    setBusca("");
    escolherCategoria("Todos");
  }

  return (
    <section id="produtos" className={styles.section} aria-labelledby="titulo-produtos">
      <div className="container">
        <div className={styles.heading}>
          <div>
            <span className="eyebrow">A curadoria {MARCA.nome}</span>
            <h2 id="titulo-produtos">
              Pequenos preços.<br className={styles.mobileBreak} /> Grandes <em>encontros.</em>
            </h2>
          </div>
          <p>Do básico que fica ao detalhe que transforma.<br />Seu próximo favorito pode estar aqui.</p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.filters} role="group" aria-label="Filtrar achadinhos por categoria">
            {categorias.map(item => (
              <button
                key={item}
                type="button"
                aria-pressed={categoria === item}
                className={categoria === item ? styles.active : ""}
                onClick={() => escolherCategoria(item)}
              >
                {rotuloDaCategoria(item, "filtro")}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={categoria === "Salvos"}
              className={categoria === "Salvos" ? styles.active : ""}
              onClick={() => escolherCategoria("Salvos")}
            >
              <Icon name="heart" size={13} />
              Salvos{salvos.length ? ` (${salvos.length})` : ""}
            </button>
          </div>
          <label className={styles.search}>
            <Icon name="search" size={16} />
            <span className="sr-only">Buscar produtos</span>
            <input
              ref={buscaRef}
              id="busca-produtos"
              type="search"
              value={busca}
              onChange={event => setBusca(event.target.value)}
              placeholder="Encontre seu achado"
            />
          </label>
        </div>

        <div className={styles.grid}>
          {visiveis.map(produto => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              salvo={salvos.includes(produto.id)}
              onSalvar={() => alternarSalvo(produto.id)}
            />
          ))}
        </div>
        <p className="sr-only" role="status">{visiveis.length} achadinhos exibidos.</p>

        {!visiveis.length && (
          <div className={styles.empty}>
            <Icon name={categoria === "Salvos" ? "heart" : "search"} size={28} />
            <h3>{vazioDeFavoritos ? "Seus favoritos começam aqui." : "Ainda não encontramos esse achado."}</h3>
            <p>
              {vazioDeFavoritos
                ? "Toque no coração de uma peça para guardá-la nesta seleção."
                : "Tente outro nome ou explore todas as categorias."}
            </p>
            <button type="button" className="button button-secondary" onClick={limpar}>
              Explorar todos os achadinhos
            </button>
          </div>
        )}
        {visiveis.length < filtrados.length && (
          <div className={styles.more}>
            <button type="button" className="button button-secondary" onClick={() => setMostrarTodos(true)}>
              Ver todos os achadinhos <Icon name="arrow" size={17} />
            </button>
          </div>
        )}
        <p className={styles.disclaimer}>
          Imagens ilustrativas. Confira os detalhes, o preço e a disponibilidade na loja parceira.
        </p>
      </div>
    </section>
  );
}
