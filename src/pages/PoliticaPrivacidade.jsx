import { CONFIG } from "../data/config.js";
import styles from "./PoliticaPrivacidade.module.css";

export default function PoliticaPrivacidade() {
  return (
    <main id="conteudo" className={`container ${styles.pagina}`}>
      <h1 className={styles.titulo}>Política de Privacidade</h1>
      <p className={styles.atualizado}>
        Última atualização: {CONFIG.ano}. Em conformidade com a Lei Geral de
        Proteção de Dados (LGPD — Lei nº 13.709/2018).
      </p>

      <section>
        <h2>1. Quem somos</h2>
        <p>
          O site {CONFIG.nomeDoSite} divulga ofertas de roupas por meio de links
          de afiliado. Não realizamos vendas diretamente: as transações
          acontecem nas lojas parceiras para as quais os links direcionam.
        </p>
      </section>

      <section>
        <h2>2. Quais dados coletamos</h2>
        <p>
          Não solicitamos cadastro nem coletamos dados pessoais sensíveis.
          Podemos coletar automaticamente dados de navegação, como endereço IP,
          tipo de dispositivo, páginas visitadas e origem do acesso, quando você
          interage com o site.
        </p>
      </section>

      <section>
        <h2>3. Cookies</h2>
        <p>
          Utilizamos cookies para lembrar suas preferências e medir o desempenho
          das ofertas divulgadas. Ao continuar navegando e ao clicar em
          &quot;Entendi&quot; no aviso de cookies, você concorda com esse uso.
          Você pode gerenciar ou bloquear cookies nas configurações do seu
          navegador.
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
      </section>

      <section>
        <h2>5. Compartilhamento de dados</h2>
        <p>
          Não vendemos nem alugamos dados pessoais. Dados de navegação podem ser
          processados por ferramentas de análise e pelas próprias plataformas
          parceiras, conforme as políticas de privacidade de cada uma.
        </p>
      </section>

      <section>
        <h2>6. Seus direitos</h2>
        <p>
          Nos termos da LGPD, você pode solicitar confirmação de tratamento,
          acesso, correção, anonimização, portabilidade ou eliminação de dados,
          além de revogar o consentimento. Para exercer seus direitos, entre em
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
          Podemos atualizar esta política a qualquer momento. Recomendamos
          revisá-la periodicamente. O uso contínuo do site após alterações
          representa concordância com a versão vigente.
        </p>
      </section>
    </main>
  );
}
