import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CONFIG, MARCA } from "../data/config.js";
import Icon from "./Icon.jsx";
import styles from "./Header.module.css";

const SECOES = [
  { id: "produtos", rotulo: "Achadinhos" },
  { id: "cupons", rotulo: "Cupons", destaque: true },
  { id: "sobre", rotulo: "Sobre a curadoria" },
];

// Descobre qual seção da página inicial está na tela para marcar no menu.
function useSecaoVisivel(ativo) {
  const [secao, setSecao] = useState(null);
  useEffect(() => {
    if (!ativo) {
      setSecao(null);
      return undefined;
    }
    function atualizar() {
      const linha = window.innerHeight * 0.35;
      let atual = null;
      for (const { id } of SECOES) {
        const elemento = document.getElementById(id);
        if (elemento && elemento.getBoundingClientRect().top <= linha) atual = id;
      }
      const noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setSecao(noFim ? SECOES[SECOES.length - 1].id : atual);
    }
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);
    return () => {
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, [ativo]);
  return secao;
}

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const location = useLocation();
  const naInicial = location.pathname === "/";
  const secaoAtual = useSecaoVisivel(naInicial);
  const inicioAtual = naInicial && !secaoAtual;

  useEffect(() => { setAberto(false); }, [location]);
  useEffect(() => {
    if (aberto) document.getElementById("navegacao-principal")?.querySelector("a")?.focus();
  }, [aberto]);
  useEffect(() => {
    function atualizar() { setRolou(window.scrollY > 40); }
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    return () => window.removeEventListener("scroll", atualizar);
  }, []);

  function aoPressionarTecla(event) {
    if (event.key === "Escape" && aberto) {
      setAberto(false);
      document.getElementById("menu-toggle")?.focus();
    }
  }

  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <div id="topo" className={styles.announcement}>
        <Icon name="sparkles" size={13} />
        <span>Bom gosto, bons preços. Novos achadinhos toda semana.</span>
        <a href="/#cupons">Encontre seu cupom <Icon name="arrow" size={13} /></a>
      </div>
      <header className={`${styles.header} ${rolou ? styles.scrolled : ""}`} onKeyDown={aoPressionarTecla}>
        <div className={`container ${styles.inner}`}>
          <Link to="/" className={styles.brand} aria-label={`${CONFIG.nomeDoSite} — início`}>
            <span>{MARCA.nome}</span>
            <small>{MARCA.complemento}</small>
          </Link>
          <nav
            id="navegacao-principal"
            className={`${styles.nav} ${aberto ? styles.open : ""}`}
            aria-label="Navegação principal"
            onClick={() => setAberto(false)}
          >
            <Link to="/" className={inicioAtual ? styles.active : ""} aria-current={inicioAtual ? "page" : undefined}>
              Início
            </Link>
            {SECOES.map(({ id, rotulo, destaque }) => (
              <a
                key={id}
                href={`/#${id}`}
                className={secaoAtual === id ? styles.active : ""}
                aria-current={secaoAtual === id ? "location" : undefined}
              >
                {rotulo}
                {destaque && <span className={styles.navDot} />}
              </a>
            ))}
          </nav>
          <div className={styles.actions}>
            <a href="/#busca-produtos" aria-label="Buscar achadinhos" className={styles.icon}>
              <Icon name="search" />
            </a>
            <a href={`mailto:${CONFIG.contato.email}`} aria-label="Entre em contato" className={styles.contact}>
              <Icon name="mail" />
            </a>
            <span className={styles.separator} />
            <a href="/#cupons" aria-label="Ver cupons de desconto" className={styles.icon}>
              <Icon name="ticket" />
            </a>
            <button
              id="menu-toggle"
              type="button"
              className={styles.menu}
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={aberto}
              aria-controls="navegacao-principal"
              onClick={() => setAberto(!aberto)}
            >
              <Icon name={aberto ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
