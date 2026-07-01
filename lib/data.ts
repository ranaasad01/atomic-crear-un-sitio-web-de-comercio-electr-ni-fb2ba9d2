export const APP_NAME = "Lumière";
export const APP_TAGLINE = "Moda & Estilo Premium";
export const APP_DESCRIPTION =
  "Descubre piezas únicas que definen tu estilo. Calidad excepcional, diseño atemporal.";

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "#tienda" },
  { label: "Novedades", href: "#novedades" },
  { label: "Destacados", href: "#destacados" },
  { label: "Sobre Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export const navCTA = {
  label: "Ver Colección",
  href: "#tienda",
};

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  description: string;
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export const ACCENT = "#e94560";
export const DARK = "#1a1a2e";