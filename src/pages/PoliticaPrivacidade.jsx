import { CONFIG, MARCA } from "../data/config.js";
import { formatarDataPorExtenso } from "../utils/format.js";
import styles from "./PoliticaPrivacidade.module.css";

export default function PoliticaPrivacidade() {
  return (
    <main id="conteudo" className={`container ${styles.pagina}`}>
      <h1 className={styles.titulo}>Política de Privacidade</h1>
      <p className={styles.atualizado}>
        Última atualização: {formatarDataPorExtenso(CONFIG.politicaAtualizadaEm)}.
        Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
        13.709/2018).
      </p>

      <section>
        <h2>1. Quem somos</h2>
        <p>
          O site {MARCA.nome} divulga ofertas de roupas por meio de links de
          afiliado. Não realizamos vendas diretamente: as compras acontecem nas
          lojas parceiras para as quais os links direcionam.
        </p>
      </section>

      <section>
        <h2>2. Quais dados tratamos</h2>
        <p>
          Não pedimos cadastro e não temos formulários. Não usamos ferramentas
          de análise de acesso (como Google Analytics) nem pixels de anúncios.
        </p>
        <p>
          Como qualquer site, o serviço de hospedagem registra automaticamente
          dados técnicos de cada acesso, como endereço IP, navegador, página
          visitada e horário. Esses registros servem apenas para manter o site
          funcionando e protegido contra abusos, e são guardados pelo tempo
          definido pela hospedagem.
        </p>
      </section>

      <section>
        <h2>3. Cookies e armazenamento no navegador</h2>
        <p>
          Este site não usa cookies de rastreamento. Ele guarda no seu próprio
          navegador (armazenamento local) apenas duas informações: as peças
          que você marcou como favoritas e o fato de você já ter visto o aviso
          sobre este tema. Esses dados não são enviados para nós e podem ser
          apagados a qualquer momento limpando os dados do site nas
          configurações do navegador.
        </p>
        <p>
          Se um dia passarmos a usar ferramentas de análise ou de publicidade,
          esta política será atualizada e pediremos o seu consentimento antes
          de ativá-las.
        </p>
      </section>

      <section>
        <h2>4. Links de afiliado</h2>
        <p>
          Alguns links deste site são links de afiliado. Isso significa que
          podemos receber uma comissão caso você realize uma compra após clicar
          neles, sem nenhum custo adicional para você. Isso não influencia o
          preço exibido pela loja parceira.
        </p>
        <p>
          Ao clicar em um desses links, você sai deste site. A loja parceira
          pode usar cookies próprios para identificar que a visita veio daqui,
          conforme a política de privacidade dela.
        </p>
      </section>

      <section>
        <h2>5. Compartilhamento de dados</h2>
        <p>
          Não vendemos, alugamos nem compartilhamos dados pessoais. Os registros
          técnicos descritos no item 2 ficam com o serviço de hospedagem, que
          atua como operador desses dados.
        </p>
      </section>

      <section>
        <h2>6. Seus direitos</h2>
        <p>
          Nos termos da LGPD, você pode solicitar confirmação de tratamento,
          acesso, correção, anonimização, portabilidade ou eliminação de dados,
          além de revogar consentimentos. Para exercer seus direitos, entre em
          contato pelo e-mail abaixo.
        </p>
      </section>

      <section>
        <h2>7. Encarregado de Dados (DPO)</h2>
        <p>
          {CONFIG.encarregado.nome}
          <br />
          E-mail:{" "}
          <a href={`mailto:${CONFIG.encarregado.email}`}>
            {CONFIG.encarregado.email}
          </a>
        </p>
      </section>

      <section>
        <h2>8. Alterações desta política</h2>
        <p>
          Podemos atualizar esta política quando o site mudar. A data no topo
          desta página indica a versão em vigor.
        </p>
      </section>
    </main>
  );
}
