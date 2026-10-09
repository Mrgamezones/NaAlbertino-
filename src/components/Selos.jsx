import Icon from "./Icon.jsx";
import styles from "./Selos.module.css";

const SELOS = [
  { icone: "sparkles", titulo: "Curadoria com carinho", texto: "Peças escolhidas uma a uma" },
  { icone: "tag", titulo: "Achados que valem a pena", texto: "Estilo e preço no mesmo lugar" },
  { icone: "ticket", titulo: "Um desconto a mais", texto: "Cupons para aproveitar" },
  { icone: "refresh", titulo: "Sempre uma novidade", texto: "Novos achadinhos toda semana" },
];

export default function Selos() {
  return (
    <section className={`container ${styles.seguranca}`} aria-label="Nossa curadoria">
      {SELOS.map(selo => (
        <div key={selo.titulo} className={styles.item}>
          <Icon name={selo.icone} size={25} />
          <div>
            <h2>{selo.titulo}</h2>
            <p>{selo.texto}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
