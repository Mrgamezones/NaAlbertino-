import { Link } from "react-router-dom";
import { CONFIG, MARCA, redesAtivas } from "../data/config.js";
import Icon from "./Icon.jsx";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link to="/">
            <span>{MARCA.nome}</span>
            <small>{MARCA.complemento}</small>
          </Link>
          <p>{CONFIG.slogan}</p>
        </div>
        <div className={styles.column}>
          <h2>Explore</h2>
          <a href="/#produtos">Nossos achadinhos</a>
          <a href="/#cupons">Cupons de desconto</a>
          <a href="/#sobre">Sobre a curadoria</a>
        </div>
        <div className={styles.column}>
          <h2>Vamos conversar</h2>
          <a href={`mailto:${CONFIG.contato.email}`}>{CONFIG.contato.email}</a>
          {redesAtivas.length > 0 && (
            <div className={styles.socials}>
              {redesAtivas.map(rede => (
                <a key={rede.nome} href={rede.url} target="_blank" rel="noopener noreferrer">
                  {rede.nome}
                  <Icon name="diagonal" size={11} />
                </a>
              ))}
            </div>
          )}
          <Link to="/politica-privacidade">Política de Privacidade</Link>
        </div>
      </div>
      <div className={`container ${styles.base}`}>
        <span>© {CONFIG.ano} {MARCA.nome}. Todos os direitos reservados.</span>
        <p>Alguns links geram uma comissão para nós, sem custo extra para você.</p>
        <a href="#topo">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}
