import { CONFIG } from "../data/config.js";
import Icon from "./Icon.jsx";
import styles from "./BannerLoja.module.css";

export default function BannerLoja() {
  const [nome, complemento] = CONFIG.nomeDoSite.split("-").map(p => p.trim());
  return <section id="sobre" className={`container ${styles.section}`} aria-labelledby="titulo-sobre">
    <div className={styles.editorial}>
      <img src="/images/alfaiataria.webp" alt="Inspiração ilustrativa de um conjunto de alfaiataria em tons de areia" loading="lazy" width="640" height="853" />
      <div className={styles.editorialText}><span className="eyebrow">Menos excesso.<br />Mais você.</span><p>O simples<br />também<br />é <em>especial.</em></p><span className={styles.signature}>{nome}</span></div>
      <span className={styles.imageNote}>Imagem ilustrativa</span>
    </div>
    <div className={styles.content}>
      <span className="eyebrow">Prazer, somos a {nome}</span>
      <h2 id="titulo-sobre">Um olhar atento.<br />Um achado <em>de cada vez.</em></h2>
      <p>Acreditamos que se vestir bem começa com boas escolhas. Por isso, reunimos peças para o dia a dia, preços que cabem nos planos e aquele desconto que faz a diferença.</p>
      <p>Você descobre seus favoritos por aqui e conhece cada oferta pelo link da loja parceira. Simples, do seu jeito.</p>
      <a href="#produtos" className="text-link">Encontre seu próximo favorito <Icon name="arrow" size={17} /></a>
      <div className={styles.signoff}><svg viewBox="0 0 120 120" role="img" aria-label={CONFIG.nomeDoSite}>
        <defs><path id="arcoTopo" d="M 15 60 A 45 45 0 0 1 105 60" fill="none" /><path id="arcoBase" d="M 15 60 A 45 45 0 0 0 105 60" fill="none" /></defs>
        <circle cx="60" cy="60" r="58" /><circle cx="60" cy="60" r="36" />
        <text className={styles.arc}><textPath href="#arcoTopo" startOffset="50%" textAnchor="middle">{nome}</textPath></text>
        <text className={styles.arc}><textPath href="#arcoBase" startOffset="50%" textAnchor="middle">{complemento}</textPath></text>
        <text x="60" y="69" textAnchor="middle" className={styles.monogram}>{nome.charAt(0)}.</text>
      </svg><span>Moda para viver.<br /><em>Achados para amar.</em></span></div>
    </div>
  </section>;
}
