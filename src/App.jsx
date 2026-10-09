import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CookieAviso from "./components/CookieAviso.jsx";
import Home from "./pages/Home.jsx";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade.jsx";

function ScrollDaPagina() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollDaPagina />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/politica-privacidade"
          element={<PoliticaPrivacidade />}
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
      <CookieAviso />
    </BrowserRouter>
  );
}
