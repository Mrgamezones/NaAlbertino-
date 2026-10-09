export const CONFIG = {
  nomeDoSite: "NaAlbertino - Promoções",
  slogan: "Seu estilo. Seus melhores achados.",
  descricao:
    "Achadinhos de roupas com desconto. Cupons e ofertas selecionadas com link de afiliado da Shopee.",

  // Endereço público do site, sem barra no final. Usado no link canônico,
  // nas prévias de compartilhamento (WhatsApp, Instagram…) e no sitemap.xml.
  // PENDENTE: confirmar o domínio definitivo.
  url: "https://naalbertino.com",

  logo: "/logo/logo-naalbertino.jpg",
  imagemCompartilhamento: "/images/og.jpg",

  imagens: {
    hero: {
      src: "/images/hero.webp",
      alt: "Inspiração de look em alfaiataria de linho e tons naturais",
      largura: 1536,
      altura: 1024,
    },
    sobre: {
      src: "/images/alfaiataria.webp",
      alt: "Inspiração ilustrativa de um conjunto de alfaiataria em tons de areia",
      largura: 640,
      altura: 853,
    },
  },

  // Nome exibido para cada categoria de produto. Categorias que não estão
  // aqui aparecem com o próprio nome. `filtro` é o texto do botão de filtro
  // e `selo` é a etiqueta pequena acima do nome no card.
  categorias: {
    "Ofertas Populares": { filtro: "Mais amados", selo: "Entre os mais amados" },
  },

  // PENDENTE: trocar pelos perfis reais. Rede com `url` vazia não aparece no site.
  redes: [
    { nome: "Instagram", url: "https://instagram.com/", icone: "IG" },
    { nome: "TikTok", url: "https://tiktok.com/", icone: "TT" },
    { nome: "WhatsApp", url: "https://wa.me/5500000000000", icone: "WA" },
  ],

  // PENDENTE: confirmar que os e-mails existem e recebem mensagens.
  contato: {
    email: "contato@naalbertino.com",
    whatsapp: "(00) 00000-0000",
  },

  encarregado: {
    nome: "Encarregado de Dados (DPO)",
    email: "dpo@naalbertino.com",
  },

  // Data da última alteração real do texto da Política de Privacidade
  // (formato AAAA-MM-DD). Atualize sempre que mudar o texto da política.
  politicaAtualizadaEm: "2026-10-09",

  ano: new Date().getFullYear(),
};

export function rotuloDaCategoria(categoria, tipo) {
  return CONFIG.categorias[categoria]?.[tipo] || categoria;
}

export const redesAtivas = CONFIG.redes.filter(rede => rede.url);

// "NaAlbertino - Promoções" → { nome: "NaAlbertino", complemento: "Promoções" }
const [nome, complemento = ""] = CONFIG.nomeDoSite.split("-").map(parte => parte.trim());
export const MARCA = { nome, complemento };
