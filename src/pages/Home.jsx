import Hero from "../components/Hero.jsx";
import BannerLoja from "../components/BannerLoja.jsx";
import Cupons from "../components/Cupons.jsx";
import Produtos from "../components/Produtos.jsx";
import Selos from "../components/Selos.jsx";

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Selos />
      <Produtos />
      <Cupons />
      <BannerLoja />
    </main>
  );
}
