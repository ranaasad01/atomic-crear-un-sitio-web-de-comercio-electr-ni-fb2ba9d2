"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Star, ArrowRight, ShoppingBag, Heart, Truck, RotateCcw, Shield, Sparkles, ChevronRight, Quote } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, ACCENT, DARK } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const categories = [
  { id: "vestidos", name: "Vestidos", image: "https://media.vogue.es/photos/68590b23601491ceea59599d/2:3/w_2560%2Cc_limit/GettyImages-2220400315.jpg", count: 48 },
  { id: "abrigos", name: "Abrigos", image: "https://media.vogue.es/photos/68590b23601491ceea59599d/2:3/w_2560%2Cc_limit/GettyImages-2220400315.jpg", count: 32 },
  { id: "accesorios", name: "Accesorios", image: "https://media.vogue.es/photos/68590b23601491ceea59599d/2:3/w_2560%2Cc_limit/GettyImages-2220400315.jpg", count: 64 },
  { id: "zapatos", name: "Zapatos", image: "https://media.vogue.es/photos/68590b23601491ceea59599d/2:3/w_2560%2Cc_limit/GettyImages-2220400315.jpg", count: 29 },
];

const featuredProducts = [
  {
    id: "p1",
    name: "Vestido Seda Noir",
    price: 289,
    originalPrice: 380,
    category: "Vestidos",
    image: "https://i.ebayimg.com/images/g/1xkAAOSwJB1lAsGq/s-l1200.jpg",
    badge: "Oferta",
    rating: 4.9,
    reviews: 128,
    colors: ["#1a1a2e", "#c8a96e", "#e94560"],
  },
  {
    id: "p2",
    name: "Abrigo Cachemira Beige",
    price: 495,
    originalPrice: undefined,
    category: "Abrigos",
    image: "https://wholesale.wessi.com/cdn/shop/files/KP-3120-55.jpg?v=1770731833&width=1080",
    badge: "Nuevo",
    rating: 5.0,
    reviews: 74,
    colors: ["#d4c5a9", "#8b7355", "#1a1a2e"],
  },
  {
    id: "p3",
    name: "Bolso Cuero Milán",
    price: 345,
    originalPrice: undefined,
    category: "Accesorios",
    image: "https://www.liberteleather.com/cdn/shop/files/Folding-Tote-Brown-12.1_7bbc821f-2599-4799-bc6c-40ced2e160e1.jpg?v=1723450184",
    badge: undefined,
    rating: 4.8,
    reviews: 203,
    colors: ["#8b4513", "#1a1a2e", "#c8a96e"],
  },
  {
    id: "p4",
    name: "Tacones Satén Dorado",
    price: 198,
    originalPrice: 260,
    category: "Zapatos",
    image: "https://m.media-amazon.com/images/I/61P5aMVrdBL._AC_UF894,1000_QL80_.jpg",
    badge: "Oferta",
    rating: 4.7,
    reviews: 91,
    colors: ["#c8a96e", "#e8e0d0", "#1a1a2e"],
  },
  {
    id: "p5",
    name: "Blusa Lino Parisina",
    price: 145,
    originalPrice: undefined,
    category: "Tops",
    image: "https://images.squarespace-cdn.com/content/v1/57cfe232be6594f911122a06/1644424251442-X0T2K6O1NXYZO8CX4VD2/TELAS22.jpg?format=1000w",
    badge: "Nuevo",
    rating: 4.9,
    reviews: 56,
    colors: ["#f5f0e8", "#e8d5c4", "#c8a96e"],
  },
  {
    id: "p6",
    name: "Collar Perlas Clásico",
    price: 220,
    originalPrice: undefined,
    category: "Accesorios",
    image: "https://www.mondaymonarch.com/cdn/shop/files/SHP_2764_cut_1024x1024.jpg?v=1698350561",
    badge: undefined,
    rating: 5.0,
    reviews: 47,
    colors: ["#f5f0e8", "#c8a96e"],
  },
];

const newArrivals = [
  {
    id: "n1",
    name: "Conjunto Tweed Parisino",
    price: 420,
    image: "https://www.hola.com/horizon/original_aspect_ratio/ad3647e4dd63-sidney4-sweeney-tweed-a.jpg",
    category: "Conjuntos",
  },
  {
    id: "n2",
    name: "Falda Plisada Midi",
    price: 175,
    image: "https://www.hola.com/horizon/original_aspect_ratio/ad3647e4dd63-sidney4-sweeney-tweed-a.jpg",
    category: "Faldas",
  },
  {
    id: "n3",
    name: "Cinturón Cuero Trenzado",
    price: 89,
    image: "https://i.pinimg.com/474x/f2/16/3c/f2163c634b99b3ce5f3b28df26b7ccce.jpg",
    category: "Accesorios",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Sofía Martínez",
    role: "Diseñadora de interiores",
    avatar: "https://m.media-amazon.com/images/I/71ck50X4B3L._AC_UF894,1000_QL80_.jpg",
    text: "Lumière ha transformado mi guardarropa por completo. La calidad de cada pieza es excepcional y el servicio al cliente es impecable. Mis pedidos siempre llegan perfectamente empaquetados.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Valentina Cruz",
    role: "Directora de marketing",
    avatar: "https://yt3.googleusercontent.com/kYF-sElxpogIczPYtGn1p0XzxMaM5s5sfgara3SnbVo-7aJfPBW3FbmODz4Nf2loupBdIX_Slw=s900-c-k-c0x00ffffff-no-rj",
    text: "Llevo dos años siendo clienta fiel. Los tejidos son de una calidad que no encuentras en ningún otro lugar. El vestido de seda que compré el año pasado sigue siendo mi favorito.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Isabella Romero",
    role: "Arquitecta",
    avatar: "https://gowarriorathletics.com/images/2025/10/31/isabella_romero_0C4A0910_copy.jpg",
    text: "Finalmente una marca que entiende el estilo atemporal. Nada de tendencias pasajeras, solo piezas que duran y que siempre quedan bien. Totalmente recomendada.",
    rating: 5,
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Envío gratuito",
    description: "En pedidos superiores a 150€. Entrega en 24-48 horas en toda España.",
  },
  {
    icon: RotateCcw,
    title: "Devoluciones fáciles",
    description: "30 días para devolver cualquier artículo sin preguntas ni complicaciones.",
  },
  {
    icon: Shield,
    title: "Pago seguro",
    description: "Tus datos siempre protegidos con cifrado SSL de última generación.",
  },
  {
    icon: Sparkles,
    title: "Calidad garantizada",
    description: "Cada pieza pasa por un riguroso control de calidad antes de llegar a ti.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" data-atomic-id="amgf7s">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? "fill-[#e94560] text-[#e94560]" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, index }: { product: (typeof featuredProducts)[0]; index: number }) {
  const [wished, setWished] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cardVariant: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: index * 0.08 },
    },
  };

  return (
    <motion.div
      variants={shouldReduceMotion ? fadeIn : cardVariant}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col"
    >
      {/* Image */}
      <div
        className="relative overflow-hidden aspect-[3/4] bg-gray-50"
        data-atomic-id="axv46hd">
        <img
          src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/fb2ba9d2-54a7-49be-8983-7efd164729a4/images/uploaded-1782909438941-bd5lza.png?v=1782909442488"
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          data-atomic-id="a2mt99q" />
        {product.badge && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ backgroundColor: product.badge === "Oferta" ? ACCENT : DARK }}
            data-atomic-id="a7vxwdt">
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setWished((w) => !w)}
          aria-label={wished ? "Quitar de favoritos" : "Añadir a favoritos"}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:scale-110 transition-all duration-200"
          data-atomic-id="a7ccm9d">
          <Heart
            size={16}
            className={wished ? "fill-[#e94560] text-[#e94560]" : "text-gray-400"}
          />
        </button>
        <div
          className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3"
          data-atomic-id="a2r1ncq">
          <button
            className="w-full py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#e94560] transition-colors duration-300"
            data-atomic-id="ap1cdxy">
            <ShoppingBag size={15} />
            Añadir al carrito
          </button>
        </div>
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1" data-atomic-id="axxxuqd">
        <span
          className="text-xs text-[#e94560] font-medium uppercase tracking-wide"
          data-atomic-id="a10t46qv">
          {product.category}
        </span>
        <h3
          className="font-semibold text-[#1a1a2e] text-sm leading-snug"
          data-atomic-id="a1dzxcgi">{product.name}</h3>
        <div className="flex items-center gap-1.5" data-atomic-id="ag9dxx8">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-400" data-atomic-id="a1hpdn2o">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2 mt-auto pt-1" data-atomic-id="agass1q">
          <span className="text-base font-bold text-[#1a1a2e]" data-atomic-id="a1qvdihc">€{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through" data-atomic-id="a52hg8u">€{product.originalPrice}</span>
          )}
        </div>
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-1" data-atomic-id="a1ctj5ho">
            {product.colors.map((c, __atomicIdx) => (<span
              key={c}
              className="w-3.5 h-3.5 rounded-full border border-black/10 cursor-pointer hover:scale-125 transition-transform duration-150"
              style={{ backgroundColor: c }}
              data-atomic-id="a1g56rqh"
              data-atomic-instance={__atomicIdx} />))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [email, setEmail] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const motionProps = (variants: Variants) =>
    shouldReduceMotion
      ? {}
      : { variants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <main className="overflow-x-hidden" data-atomic-id="ayd58ec">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100svh] flex items-center bg-[#1a1a2e] overflow-hidden"
        data-atomic-id="a12bmc8p">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(233,69,96,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 20% 80%, rgba(200,169,110,0.12) 0%, transparent 60%)",
          }}
          data-atomic-id="abokm6k" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,1) 79px, rgba(255,255,255,1) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(255,255,255,1) 79px, rgba(255,255,255,1) 80px)",
          }}
          data-atomic-id="abpzgb2" />

        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-0 grid md:grid-cols-2 gap-12 items-center w-full"
          data-atomic-id="abreafk">Viste tu historiacon</div>

        {/* Scroll indicator */}
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs uppercase tracking-widest" data-atomic-id="ao1ypql">Scroll</span>
          <div
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
            data-atomic-id="a1r6swyo" />
        </motion.div>
      </section>
      {/* ── VALUE PROPS ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-black/5" data-atomic-id="apjl0u5">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          data-atomic-id="ap6wwr2">
          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {valueProps.map((vp, __atomicIdx) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4"
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#e94560]/10 flex items-center justify-center"
                    data-atomic-id="a1qgtzr0"
                    data-atomic-instance={__atomicIdx}>
                    <Icon size={18} className="text-[#e94560]" />
                  </div>
                  <div data-atomic-id="a1qi8tvi" data-atomic-instance={__atomicIdx}>
                    <p
                      className="font-semibold text-[#1a1a2e] text-sm"
                      data-atomic-id="a8qu4we"
                      data-atomic-instance={__atomicIdx}>{vp.title}</p>
                    <p
                      className="text-gray-500 text-xs leading-relaxed mt-0.5"
                      data-atomic-id="a8qu6kw"
                      data-atomic-instance={__atomicIdx}>{vp.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section className="bg-[#faf9f7] py-20 md:py-28" data-atomic-id="a122k58o">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="audx5rt">
          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="flex flex-col items-center text-center gap-4 mb-14"
          >
            <motion.span variants={fadeInUp} className="text-[#e94560] text-sm font-semibold uppercase tracking-widest">
              Explora por categoría
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight text-balance"
            >
              Encuentra tu estilo
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-500 max-w-md text-pretty leading-relaxed">
              Desde vestidos de noche hasta accesorios del día a día, cada categoría es una invitación a reinventarte.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {categories.map((cat, i) => (
              <motion.a
                key={cat.id}
                href="#tienda"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#tienda")?.scrollIntoView({ behavior: "smooth" });
                }}
                variants={i % 2 === 0 ? scaleIn : fadeInUp}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                  i === 0 ? "lg:row-span-2 aspect-[3/4] lg:aspect-auto" : "aspect-square"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  data-atomic-id="a14y145l"
                  data-atomic-instance={i} />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/70 via-[#1a1a2e]/20 to-transparent"
                  data-atomic-id="a14zftzl"
                  data-atomic-instance={i} />
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                  data-atomic-id="a150uo43"
                  data-atomic-instance={i}>
                  <p
                    className="font-playfair text-white font-bold text-xl leading-tight"
                    data-atomic-id="aozy2ir"
                    data-atomic-instance={i}>{cat.name}</p>
                  <p
                    className="text-white/70 text-sm mt-1"
                    data-atomic-id="aozy479"
                    data-atomic-instance={i}>{cat.count} artículos</p>
                </div>
                <div
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  data-atomic-id="a1529i8l"
                  data-atomic-instance={i}>
                  <ChevronRight size={14} className="text-white" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section id="tienda" className="bg-white py-20 md:py-28" data-atomic-id="apaitu4">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a17xoagt">
          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          >
            <div className="flex flex-col gap-3" data-atomic-id="a9c663n">
              <motion.span variants={fadeInUp} className="text-[#e94560] text-sm font-semibold uppercase tracking-widest">
                Selección premium
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight"
              >
                Piezas destacadas
              </motion.h2>
            </div>
            <motion.a
              variants={fadeInUp}
              href="#tienda"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a1a2e] hover:text-[#e94560] transition-colors duration-200 group"
            >
              Ver todo el catálogo
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── NEW ARRIVALS BANNER ───────────────────────────────────────────── */}
      <section
        id="novedades"
        className="bg-[#1a1a2e] py-20 md:py-28 overflow-hidden"
        data-atomic-id="acihifk">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a1lhff5t">
          <div
            className="grid md:grid-cols-2 gap-12 items-center"
            data-atomic-id="apussh0">
            {/* Left */}
            <motion.div
              variants={slideInLeft}
              {...motionProps(slideInLeft)}
              className="flex flex-col gap-6"
            >
              <span
                className="text-[#c8a96e] text-sm font-semibold uppercase tracking-widest"
                data-atomic-id="a1cdh4qj">
                Recién llegado
              </span>
              <h2
                className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance"
                data-atomic-id="agqrgit">
                Novedades de la temporada
              </h2>
              <p
                className="text-white/60 leading-relaxed text-pretty"
                data-atomic-id="a1g5zgpp">
                Las últimas incorporaciones a nuestra colección. Piezas pensadas para la mujer que marca tendencia sin seguirla. Descúbrelas antes que nadie.
              </p>
              <div className="flex flex-col gap-4" data-atomic-id="a1je7dsi">
                {newArrivals.map((item, __atomicIdx) => (<motion.div
                  key={item.id}
                  whileHover={shouldReduceMotion ? {} : { x: 6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 hover:border-[#e94560]/40 hover:bg-white/5 transition-all duration-300 cursor-pointer group"
                >
                  <div
                    className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                    data-atomic-id="arvh8g3"
                    data-atomic-instance={__atomicIdx}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      data-atomic-id="a1qx0eg0"
                      data-atomic-instance={__atomicIdx} />
                  </div>
                  <div
                    className="flex-1 min-w-0"
                    data-atomic-id="arww2kl"
                    data-atomic-instance={__atomicIdx}>
                    <p
                      className="text-xs text-[#c8a96e] font-medium uppercase tracking-wide"
                      data-atomic-id="atvecxh"
                      data-atomic-instance={__atomicIdx}>{item.category}</p>
                    <p
                      className="text-white font-semibold text-sm mt-0.5 truncate"
                      data-atomic-id="atveelz"
                      data-atomic-instance={__atomicIdx}>{item.name}</p>
                    <p
                      className="text-white/50 text-sm"
                      data-atomic-id="atvegah"
                      data-atomic-instance={__atomicIdx}>€{item.price}</p>
                  </div>
                  <ChevronRight size={16} className="text-white/30 group-hover:text-[#e94560] transition-colors duration-200 flex-shrink-0" />
                </motion.div>))}
              </div>
              <a
                href="#tienda"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#tienda")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#e94560] text-white font-semibold rounded-full text-sm hover:bg-[#c73652] transition-all duration-300 shadow-[0_4px_20px_rgba(233,69,96,0.4)] w-fit"
                data-atomic-id="a1g5zk2a">
                Ver todas las novedades
                <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Right image */}
            <motion.div
              variants={slideInRight}
              {...motionProps(slideInRight)}
              className="relative"
            >
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
                data-atomic-id="a1wtq040">
                <img
                  src="https://p16-common-sign.tiktokcdn-us.com/tos-maliva-p-0068/364241a40c6e465d9e7853342396986d_1706575421~tplv-photomode-video-share-card:630:630:20.jpeg?dr=9616&refresh_token=5f3fdde5&x-expires=1814328000&x-signature=QpOPB3ufSCBrat3T4E7camkf3pU%3D&t=4d5b0474&ps=13740610&shp=55bbe6a9&shcp=f07906a3&idc=useast5&ftpl=1"
                  alt="Nuevas llegadas Lumière"
                  className="w-full h-full object-cover"
                  data-atomic-id="a1ydvxfx" />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/30 to-transparent"
                  data-atomic-id="a1yfan9x" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #e94560, transparent)" }}
                data-atomic-id="a1wv4u8i" />
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-15"
                style={{ background: "radial-gradient(circle, #c8a96e, transparent)" }}
                data-atomic-id="a1wwjod0" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section
        id="destacados"
        className="bg-[#faf9f7] py-20 md:py-28"
        data-atomic-id="awswpez">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="a6vjfwc">
          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="flex flex-col items-center text-center gap-4 mb-14"
          >
            <motion.span variants={fadeInUp} className="text-[#e94560] text-sm font-semibold uppercase tracking-widest">
              Lo que dicen nuestras clientas
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight text-balance"
            >
              Historias reales, estilo real
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={i === 1 ? scaleIn : fadeInUp}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`bg-white rounded-2xl p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)] border border-black/5 flex flex-col gap-5 ${
                  i === 1 ? "md:-mt-4 md:mb-4" : ""
                }`}
              >
                <Quote size={28} className="text-[#e94560]/30" />
                <p
                  className="text-gray-600 leading-relaxed text-sm text-pretty flex-1"
                  data-atomic-id="au3boxt"
                  data-atomic-instance={i}
                  style={i === 1 ? {
                    color: "#f59e0b",
                    backgroundColor: "#ffffff",
                    fontSize: "12px",
                    borderRadius: "6px"
                  } : undefined}>{i === 0 ? "Lumière ha transformado mi guardarropa por completo. La calidad de cada pieza es excepcional y el servicio al cliente es impecable.1234" : t.text}</p>
                <div
                  className="flex items-center gap-3 pt-2 border-t border-black/5"
                  data-atomic-id="apd6qt2"
                  data-atomic-instance={i}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#e94560]/20"
                    data-atomic-id="ax9hw8j"
                    data-atomic-instance={i} />
                  <div data-atomic-id="axawm2j" data-atomic-instance={i}>
                    <p
                      className="font-semibold text-[#1a1a2e] text-sm"
                      data-atomic-id="a6vl3sb"
                      data-atomic-instance={i}>{t.name}</p>
                    <p
                      className="text-gray-400 text-xs"
                      data-atomic-id="a6vl5gt"
                      data-atomic-instance={i}>{t.role}</p>
                  </div>
                  <div
                    className="ml-auto flex items-center gap-0.5"
                    data-atomic-id="axcbg71"
                    data-atomic-instance={i}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={11} className="fill-[#e94560] text-[#e94560]" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-black/8"
          >
            {[
              { value: "4.800+", label: "Clientas satisfechas" },
              { value: "98%", label: "Valoraciones positivas" },
              { value: "120+", label: "Piezas en colección" },
              { value: "5 años", label: "Vistiendo a mujeres únicas" },
            ].map((stat, __atomicIdx) => (<motion.div key={stat.label} variants={fadeInUp} className="text-center">
              <p
                className="font-playfair text-4xl font-bold text-[#1a1a2e]"
                data-atomic-id="a1xk0txf"
                data-atomic-instance={__atomicIdx}>{stat.value}</p>
              <p
                className="text-gray-500 text-sm mt-1"
                data-atomic-id="a1xk0vlx"
                data-atomic-instance={__atomicIdx}>{stat.label}</p>
            </motion.div>))}
          </motion.div>
        </div>
      </section>
      {/* ── ABOUT SPLIT ──────────────────────────────────────────────────── */}
      <section
        id="nosotros"
        className="bg-white py-20 md:py-28 overflow-hidden"
        data-atomic-id="ak0ve0f">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-atomic-id="akfaklc">
          <div
            className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
            data-atomic-id="a1faedj7">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              {...motionProps(slideInLeft)}
              className="relative order-2 md:order-1"
            >
              <div
                className="relative rounded-3xl overflow-hidden aspect-square shadow-[0_24px_60px_rgba(0,0,0,0.12)]"
                data-atomic-id="aawtwob">
                <img
                  src="https://www.atelier-lumieres.com/sites/default/files/2023-04/09._spiller_0076_bd.jpg"
                  alt="Atelier Lumière"
                  className="w-full h-full object-cover"
                  data-atomic-id="a13e2gug" />
              </div>
              <div
                className="absolute -bottom-5 -right-5 bg-[#e94560] rounded-2xl p-5 shadow-[0_8px_32px_rgba(233,69,96,0.35)]"
                data-atomic-id="aay8qst">
                <p
                  className="text-white font-playfair text-3xl font-bold"
                  data-atomic-id="aqnk9el">5+</p>
                <p
                  className="text-white/80 text-xs font-medium mt-0.5"
                  data-atomic-id="aqnkb33">Años de excelencia</p>
              </div>
              <div
                className="absolute top-6 -left-5 bg-white rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.10)] border border-black/5"
                data-atomic-id="aaznkxb">
                <div className="flex items-center gap-2" data-atomic-id="a1gxth8y">
                  <Sparkles size={16} className="text-[#c8a96e]" />
                  <p className="text-[#1a1a2e] font-semibold text-sm" data-atomic-id="avr6mqs">Diseño artesanal</p>
                </div>
                <p className="text-gray-400 text-xs mt-1" data-atomic-id="a1nj8tpd">Cada pieza, única</p>
              </div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              {...motionProps(staggerContainer)}
              className="flex flex-col gap-6 order-1 md:order-2"
            >
              <motion.span variants={fadeInUp} className="text-[#e94560] text-sm font-semibold uppercase tracking-widest">
                Nuestra historia
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a2e] tracking-tight leading-tight text-balance"
              >
                Moda con alma, creada con propósito
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-500 leading-relaxed text-pretty">
                Lumière nació de la convicción de que la moda debe ser más que tendencia. Fundada en 2020, nuestra marca selecciona cada tejido, cada hilo y cada botón con la misma dedicación que un artesano pone en su obra maestra.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-500 leading-relaxed text-pretty">
                Trabajamos con talleres europeos de tradición centenaria para garantizar que cada prenda que llega a tus manos sea una inversión en calidad duradera, no en moda efímera.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col gap-3 pt-2">
                {[
                  "Tejidos certificados de origen sostenible",
                  "Producción limitada para garantizar exclusividad",
                  "Talleres artesanales en España, Italia y Francia",
                ].map((point, __atomicIdx) => (<div
                  key={point}
                  className="flex items-start gap-3"
                  data-atomic-id="a1sznxz9"
                  data-atomic-instance={__atomicIdx}>
                  <div
                    className="w-5 h-5 rounded-full bg-[#e94560]/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                    data-atomic-id="anm05ig"
                    data-atomic-instance={__atomicIdx}>
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-[#e94560]"
                      data-atomic-id="a1vqaf57"
                      data-atomic-instance={__atomicIdx} />
                  </div>
                  <p
                    className="text-gray-600 text-sm leading-relaxed"
                    data-atomic-id="a1i82rzr"
                    data-atomic-instance={__atomicIdx}>{point}</p>
                </div>))}
              </motion.div>
              <motion.a
                variants={fadeInUp}
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a1a2e] hover:text-[#e94560] transition-colors duration-200 group w-fit mt-2"
              >
                Conoce nuestro proceso
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
      {/* ── CONTACT / CTA ────────────────────────────────────────────────── */}
      <section
        id="contacto"
        className="bg-[#1a1a2e] py-20 md:py-28 relative overflow-hidden"
        data-atomic-id="a14bakzu">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(233,69,96,0.25) 0%, transparent 70%)",
          }}
          data-atomic-id="a14uinaz" />
        <div
          className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          data-atomic-id="a14vxhfh">
          <motion.div
            variants={staggerContainer}
            {...motionProps(staggerContainer)}
            className="flex flex-col items-center gap-6"
          >
            <motion.span variants={fadeInUp} className="text-[#c8a96e] text-sm font-semibold uppercase tracking-widest">
              Mantente al día
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-playfair text-4xl md:text-5xl font-bold text-white tracking-tight text-balance"
            >
              Acceso exclusivo a nuevas colecciones
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/60 leading-relaxed max-w-lg text-pretty">
              Suscríbete y sé la primera en conocer nuestras nuevas llegadas, ventas privadas y eventos exclusivos. Sin spam, solo lo mejor de Lumière.
            </motion.p>
            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#e94560]/60 focus:ring-2 focus:ring-[#e94560]/20 transition-all duration-200"
                data-atomic-id="a6qvda1" />
              <button
                type="submit"
                className="px-7 py-3.5 bg-[#e94560] text-white font-semibold rounded-full text-sm hover:bg-[#c73652] transition-all duration-300 shadow-[0_4px_14px_rgba(233,69,96,0.35)] hover:shadow-[0_6px_20px_rgba(233,69,96,0.45)] whitespace-nowrap"
                data-atomic-id="a1t81kw7">
                Suscribirme
              </button>
            </motion.form>
            <motion.p variants={fadeInUp} className="text-white/30 text-xs">
              Al suscribirte aceptas nuestra política de privacidad. Puedes darte de baja en cualquier momento.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}