import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import styles from "./NaoEncontrada.module.css";

export default function NaoEncontrada() {
  return (
    <main id="conteudo" className={`container ${styles.pagina}`}>
      <span className="eyebrow">Erro 404</span>
      <h1 className={styles.titulo}>
        Esse achado <em>não está aqui.</em>
      </h1>
      <p className={styles.texto}>
        O endereço que você acessou não existe ou mudou de lugar. Que tal
        voltar para a vitrine?
      </p>
      <div className={styles.acoes}>
        <Link className="button" to="/">
          Voltar ao início <Icon name="arrow" size={17} />
        </Link>
        <a className="button button-secondary" href="/#cupons">
          Ver cupons
        </a>
      </div>
    </main>
  );
}
