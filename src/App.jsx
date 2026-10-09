import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CookieAviso from "./components/CookieAviso.jsx";
import Home from "./pages/Home.jsx";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";
import { paginaDaRota } from "./data/paginas.js";

function ScrollDaPagina() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, key]);
  useEffect(() => {
    document.title = paginaDaRota(pathname).titulo;
  }, [pathname]);
  return null;
}

export const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };

export default function App() {
  return (
    <>
      <ScrollDaPagina />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
      <Footer />
      <CookieAviso />
    </>
  );
}
