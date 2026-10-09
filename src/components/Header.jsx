import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CONFIG } from "../data/config.js";
import Icon from "./Icon.jsx";
import styles from "./Header.module.css";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const location = useLocation();
  const secaoAtual = location.pathname === "/"
    ? (location.hash === "#busca-produtos" ? "#produtos" : location.hash)
    : null;
  const inicioAtual = secaoAtual !== null && ["", "#topo", "#conteudo"].includes(secaoAtual);
  const [nome, complemento] = CONFIG.nomeDoSite.split("-").map(p => p.trim());
  useEffect(() => { setAberto(false); }, [location]);
  useEffect(() => {
    if (aberto) document.getElementById("navegacao-principal")?.querySelector("a")?.focus();
  }, [aberto]);

  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <div id="topo" className={styles.announcement}><Icon name="sparkles" size={13} /><span>Bom gosto, bons preços. Novos achadinhos toda semana.</span><a href="/#cupons">Encontre seu cupom <Icon name="arrow" size={13} /></a></div>
    <header className={styles.header} onKeyDown={event => {
      if (event.key === "Escape" && aberto) {
        setAberto(false);
        document.getElementById("menu-toggle")?.focus();
      }
    }}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label={`${CONFIG.nomeDoSite} — início`}><span>{nome}</span><small>{complemento}</small></Link>
        <nav id="navegacao-principal" className={`${styles.nav} ${aberto ? styles.open : ""}`} aria-label="Navegação principal" onClick={() => setAberto(false)}>
          <Link to="/" className={inicioAtual ? styles.active : ""} aria-current={inicioAtual ? "page" : undefined}>Início</Link>
          <a href="/#produtos" className={secaoAtual === "#produtos" ? styles.active : ""} aria-current={secaoAtual === "#produtos" ? "location" : undefined}>Achadinhos</a>
          <a href="/#cupons" className={secaoAtual === "#cupons" ? styles.active : ""} aria-current={secaoAtual === "#cupons" ? "location" : undefined}>Cupons <span className={styles.navDot} /></a>
          <a href="/#sobre" className={secaoAtual === "#sobre" ? styles.active : ""} aria-current={secaoAtual === "#sobre" ? "location" : undefined}>Sobre a curadoria</a>
        </nav>
        <div className={styles.actions}>
          <a href="/#busca-produtos" aria-label="Buscar achadinhos" className={styles.icon}><Icon name="search" /></a>
          <a href={`mailto:${CONFIG.contato.email}`} aria-label="Entre em contato" className={styles.contact}><Icon name="mail" /></a>
          <span className={styles.separator} />
          <a href="/#cupons" aria-label="Ver cupons de desconto" className={styles.icon}><Icon name="ticket" /></a>
          <button id="menu-toggle" className={styles.menu} aria-label={aberto ? "Fechar menu" : "Abrir menu"} aria-expanded={aberto} aria-controls="navegacao-principal" onClick={() => setAberto(!aberto)}><Icon name={aberto ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
  </>;
}
