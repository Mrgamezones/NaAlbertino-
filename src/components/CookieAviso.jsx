import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./CookieAviso.module.css";

const CHAVE = "naalbertino:cookies";

// Aviso informativo: o site não usa cookies de rastreamento nem ferramentas de
// análise, então não há consentimento a pedir. Se algum dia entrar Google
// Analytics, Meta Pixel ou parecido, este aviso precisa virar uma escolha
// "Aceitar / Recusar" e o script só pode carregar depois do "Aceitar".
export default function CookieAviso() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CHAVE) !== "aceito") setVisivel(true);
    } catch {
      setVisivel(true);
    }
  }, []);

  function fechar() {
    try {
      localStorage.setItem(CHAVE, "aceito");
    } catch {
      /* ignora ambientes sem storage */
    }
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div className={styles.aviso} role="region" aria-label="Aviso de privacidade">
      <p className={styles.texto}>
        Este site não usa cookies de rastreamento. Só guardamos seus favoritos
        aqui no seu navegador. Saiba mais na nossa{" "}
        <Link to="/politica-privacidade" className={styles.link}>
          Política de Privacidade
        </Link>
        .
      </p>
      <button type="button" className={styles.botao} onClick={fechar}>
        Entendi
      </button>
    </div>
  );
}
