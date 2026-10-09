import { PRODUTOS } from "../data/produtos.js";
import Icon from "./Icon.jsx";
import styles from "./Hero.module.css";

export default function Hero() {
  const destaque = PRODUTOS.find(produto => produto.destaque);
  return <section className={`container ${styles.hero}`} aria-labelledby="titulo-principal">
    <img className={styles.image} src="/images/hero.webp" alt="Inspiração de look em alfaiataria de linho e tons naturais" fetchpriority="high" width="1536" height="1024" />
    <div className={styles.wash} />
    <div className={styles.content}>
      <span className={`eyebrow ${styles.eyebrow}`}><span />Uma seleção com a sua essência</span>
      <h1 id="titulo-principal">Seu estilo.<br />Seus melhores<br /><em>achados.</em></h1>
      <p>Peças que você vai amar. Preços que fazem sentido.<br className={styles.desktopBreak} /> Descubra nossa curadoria de moda e bons descontos.</p>
      <div className={styles.actions}><a className="button" href="#produtos">Explorar achadinhos <Icon name="arrow" size={17} /></a><a className="button button-secondary" href="#cupons">Ver cupons</a></div>
      <div className={styles.note}><span className={styles.noteIcon}><Icon name="heart" size={14} /></span>Escolhidos com cuidado, para você.</div>
    </div>
    {destaque && <a className={styles.featured} href={destaque.link} target="_blank" rel="noopener sponsored" aria-label={`Ver oferta: ${destaque.nome}`}>
      <img src={destaque.imagem} alt="" width="76" height="96" />
      <div><span className={styles.featuredLabel}>NOSSO ACHADO DA VEZ</span><h2>{destaque.nome}</h2><strong>R$ {destaque.precoAtual}</strong><span className={styles.featuredLink}>Conhecer a peça <Icon name="arrow" size={15} /></span></div>
    </a>}
    <span className={styles.imageCaption}>Imagem editorial ilustrativa</span>
  </section>;
}
