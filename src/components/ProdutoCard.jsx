import { useState } from "react";
import { calcularDesconto, formatarVendidos } from "../utils/format.js";
import Icon from "./Icon.jsx";
import styles from "./ProdutoCard.module.css";

export default function ProdutoCard({ produto, salvo, onSalvar }) {
  const desconto = calcularDesconto(produto.precoAntigo, produto.precoAtual);
  const vendidos = formatarVendidos(produto.vendidos);
  const [erroImagem, setErroImagem] = useState(false);
  return <article className={styles.card}>
    <div className={styles.photo}>
      <a href={produto.link} target="_blank" rel="noopener sponsored" aria-label={`Ver ${produto.nome} na Shopee`}>
        {produto.imagem && !erroImagem ? <img src={produto.imagem} alt={`${produto.nome}${produto.imagemIlustrativa ? " — imagem ilustrativa" : ""}`} onError={() => setErroImagem(true)} loading="lazy" width="640" height="853" /> : <div className={styles.fallback}><Icon name="bag" size={45} /><span>Foto em breve</span></div>}
      </a>
      {desconto && <span className={styles.discount}>−{desconto}%</span>}
      <button className={`${styles.save} ${salvo ? styles.saved : ""}`} aria-label={`${salvo ? "Remover dos" : "Salvar nos"} favoritos: ${produto.nome}`} aria-pressed={salvo} onClick={onSalvar}><Icon name="heart" size={17} /></button>
      {produto.imagemIlustrativa && <span className={styles.caption}>Imagem ilustrativa</span>}
    </div>
    <div className={styles.body}>
      <span className={styles.category}>{produto.categoria === "Ofertas Populares" ? "Entre os mais amados" : produto.categoria}</span>
      <h3>{produto.nome}</h3>
      <div className={styles.prices}><strong>R$ {produto.precoAtual}</strong>{produto.precoAntigo && <s>R$ {produto.precoAntigo}</s>}</div>
      <div className={styles.bottom}><a className={styles.offer} href={produto.link} target="_blank" rel="noopener sponsored">Ver na Shopee <Icon name="diagonal" size={14} /></a>{vendidos && <span className={styles.sold}>{vendidos}</span>}</div>
    </div>
  </article>;
}
