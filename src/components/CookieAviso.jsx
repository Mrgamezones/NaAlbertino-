import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CookieAviso.module.css";

const CHAVE = "naalbertino:cookies";

export default function CookieAviso() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CHAVE) !== "aceito") setVisivel(true);
    } catch {
      setVisivel(true);
    }
  }, []);

  function aceitar() {
    try {
      localStorage.setItem(CHAVE, "aceito");
    } catch {
      /* ignora ambientes sem storage */
    }
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div className={styles.aviso} role="dialog" aria-label="Aviso de cookies" aria-live="polite">
      <p className={styles.texto}>
        Usamos cookies para melhorar sua experiência e medir o desempenho das
        ofertas. Saiba mais na nossa{" "}
        <Link to="/politica-privacidade" className={styles.link}>
          Política de Privacidade
        </Link>
        .
      </p>
      <button type="button" className={styles.botao} onClick={aceitar}>
        Entendi
      </button>
    </div>
  );
}
