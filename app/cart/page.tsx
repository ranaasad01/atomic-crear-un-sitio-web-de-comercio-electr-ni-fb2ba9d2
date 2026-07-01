"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingCart, X, Package, Shield, Truck, RotateCcw, ChevronRight } from 'lucide-react';
import {
  fadeInUp,
  staggerContainer,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { ACCENT, DARK } from "@/lib/data";

interface CartItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  size: string;
  color: string;
  quantity: number;
}

const initialItems: CartItem[] = [
  {
    id: "p1",
    name: "Vestido Seda Noir",
    category: "Vestidos",
    image: "https://i.ebayimg.com/images/g/1xkAAOSwJB1lAsGq/s-l1200.jpg",
    price: 289,
    originalPrice: 380,
    size: "M",
    color: "#1a1a2e",
    quantity: 1,
  },
  {
    id: "p2",
    name: "Abrigo Cachemira Beige",
    category: "Abrigos",
    image:
      "https://wholesale.wessi.com/cdn/shop/files/KP-3120-55.jpg?v=1770731833&width=1080",
    price: 495,
    size: "S",
    color: "#d4c5a9",
    quantity: 2,
  },
  {
    id: "p3",
    name: "Bolso Cuero Milán",
    category: "Accesorios",
    image:
      "https://www.liberteleather.com/cdn/shop/files/Folding-Tote-Brown-12.1_7bbc821f-2599-4799-bc6c-40ced2e160e1.jpg?v=1723450184",
    price: 345,
    size: "Único",
    color: "#8b4513",
    quantity: 1,
  },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [couponInput, setCouponInput] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  function updateQuantity(id: string, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function applyCoupon() {
    if (couponInput.trim().toUpperCase() === "LUMIERE20") {
      setCouponApplied(true);
      setDiscount(0.2);
      setCouponCode(couponInput.trim().toUpperCase());
      setCouponError("");
    } else {
      setCouponError("Cupón no válido. Prueba con LUMIERE20");
      setCouponApplied(false);
      setDiscount(0);
    }
  }

  function removeCoupon() {
    setCouponApplied(false);
    setDiscount(0);
    setCouponCode("");
    setCouponInput("");
    setCouponError("");
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 200 ? 0 : 9.99;
  const total = subtotal - discountAmount + shipping;

  const features = [
    {
      icon: Truck,
      title: "Envío Gratis",
      subtitle: "En pedidos superiores a €200",
    },
    {
      icon: RotateCcw,
      title: "Devolución 30 días",
      subtitle: "Sin preguntas, sin complicaciones",
    },
    {
      icon: Shield,
      title: "Pago Seguro",
      subtitle: "Encriptación SSL de 256 bits",
    },
    {
      icon: Package,
      title: "Embalaje Premium",
      subtitle: "Cada pedido, una experiencia",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a2e] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/40 text-sm mb-6">
                <Link href="/" className="hover:text-white/70 transition-colors">
                  Inicio
                </Link>
                <ChevronRight size={14} />
                <span className="text-white/70">Carrito</span>
              </div>

              <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white leading-tight">
                Tu Carrito
                <span style={{ color: ACCENT }}>.</span>
              </h1>
              <p className="mt-4 text-white/60 text-lg max-w-md leading-relaxed">
                Revisa tus artículos seleccionados y procede al pago de forma
                segura.
              </p>
            </motion.div>

            {/* Right — decorative card */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="flex justify-center lg:justify-end"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-8 w-full max-w-sm">
                {/* Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${ACCENT}20` }}
                  >
                    <ShoppingBag size={28} style={{ color: ACCENT }} />
                    {items.length > 0 && (
                      <span
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {items.length}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {items.length} artículo{items.length !== 1 ? "s" : ""} en
                      tu carrito
                    </p>
                    <p className="text-white/50 text-sm">
                      Total: €{total.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="space-y-3">
                  {[
                    { icon: Truck, text: "Envío gratis +200€" },
                    { icon: RotateCcw, text: "Devolución 30 días" },
                    { icon: Shield, text: "Pago seguro" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={14} style={{ color: ACCENT }} />
                      </div>
                      <span className="text-white/70 text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN CART SECTION ────────────────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            /* Empty state */
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <ShoppingCart
                size={64}
                className="text-[#1a1a2e]/20 mb-6"
              />
              <h2 className="font-playfair text-3xl font-bold text-[#1a1a2e] mb-3">
                Tu carrito está vacío
              </h2>
              <p className="text-[#1a1a2e]/50 text-lg mb-8 max-w-md">
                Parece que aún no has añadido ningún artículo. ¡Explora nuestra
                colección y encuentra algo que te encante!
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base transition-all duration-300 hover:opacity-90 shadow-lg"
                style={{ backgroundColor: ACCENT }}
              >
                Explorar Tienda
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ── LEFT: Items + Coupon ── */}
              <div className="lg:col-span-2 space-y-4">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={fadeInUp}
                      className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-4"
                    >
                      <div className="flex gap-4 md:gap-6">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://placehold.co/128x128/f5f5f5/1a1a2e?text=Imagen";
                            }}
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              {/* Category badge */}
                              <span
                                className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1"
                                style={{
                                  backgroundColor: `${ACCENT}15`,
                                  color: ACCENT,
                                }}
                              >
                                {item.category}
                              </span>
                              <h3 className="font-semibold text-[#1a1a2e] text-base md:text-lg leading-tight truncate">
                                {item.name}
                              </h3>

                              {/* Size & Color */}
                              <div className="flex items-center gap-3 mt-1.5">
                                <span className="text-sm text-[#1a1a2e]/50">
                                  Talla: <span className="font-medium text-[#1a1a2e]/70">{item.size}</span>
                                </span>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-sm text-[#1a1a2e]/50">Color:</span>
                                  <span
                                    className="w-4 h-4 rounded-full border border-black/10 inline-block"
                                    style={{ backgroundColor: item.color }}
                                  />
                                </div>
                              </div>

                              {/* Price */}
                              <div className="flex items-center gap-2 mt-2">
                                <span
                                  className="font-bold text-lg"
                                  style={{ color: ACCENT }}
                                >
                                  €{item.price.toFixed(2)}
                                </span>
                                {item.originalPrice && (
                                  <span className="text-sm text-[#1a1a2e]/40 line-through">
                                    €{item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 rounded-full text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 flex-shrink-0"
                              aria-label="Eliminar artículo"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>

                          {/* Bottom row: quantity + subtotal */}
                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity === 1}
                                className="w-8 h-8 rounded-full border border-[#1a1a2e]/20 flex items-center justify-center text-[#1a1a2e]/60 hover:border-[#1a1a2e]/40 hover:text-[#1a1a2e] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                                aria-label="Reducir cantidad"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center font-semibold text-[#1a1a2e]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 rounded-full border border-[#1a1a2e]/20 flex items-center justify-center text-[#1a1a2e]/60 hover:border-[#e94560] hover:text-[#e94560] transition-all duration-200"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            {/* Item subtotal */}
                            <span className="font-bold text-[#1a1a2e] text-base">
                              €{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Coupon section */}
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-sm p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={20} style={{ color: ACCENT }} />
                    <h3 className="font-semibold text-[#1a1a2e] text-base">
                      Cupón de descuento
                    </h3>
                  </div>

                  {couponApplied ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-semibold text-sm">
                          ¡Cupón aplicado! 20% de descuento
                        </span>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          {couponCode}
                        </span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-green-500 hover:text-green-700 transition-colors"
                        aria-label="Eliminar cupón"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                          placeholder="Ingresa tu cupón (prueba LUMIERE20)"
                          className="flex-1 px-4 py-3 rounded-full border border-[#1a1a2e]/15 text-sm text-[#1a1a2e] placeholder-[#1a1a2e]/30 focus:outline-none focus:border-[#e94560]/50 focus:ring-2 focus:ring-[#e94560]/10 transition-all duration-200"
                        />
                        <button
                          onClick={applyCoupon}
                          className="px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:opacity-90 whitespace-nowrap"
                          style={{ backgroundColor: ACCENT }}
                        >
                          Aplicar
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-red-500 text-sm pl-2">{couponError}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* ── RIGHT: Order Summary ── */}
              <div className="lg:col-span-1">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="sticky top-24 bg-white rounded-2xl shadow-sm p-6"
                >
                  <h2 className="font-playfair text-xl font-bold text-[#1a1a2e] mb-6">
                    Resumen del pedido
                  </h2>

                  <div className="space-y-3 mb-4">
                    {/* Subtotal */}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#1a1a2e]/60">Subtotal</span>
                      <span className="font-medium text-[#1a1a2e]">
                        €{subtotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Discount */}
                    {couponApplied && (
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#1a1a2e]/60">Descuento</span>
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {couponCode}
                          </span>
                        </div>
                        <span className="font-medium text-green-600">
                          -€{discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {/* Shipping */}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#1a1a2e]/60">Envío</span>
                      {shipping === 0 ? (
                        <span className="font-medium text-green-600">Gratis</span>
                      ) : (
                        <span className="font-medium text-[#1a1a2e]">€9.99</span>
                      )}
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-[#1a1a2e]/8 my-4" />

                  {/* Total */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-[#1a1a2e] text-lg">Total</span>
                    <span
                      className="font-bold text-2xl"
                      style={{ color: ACCENT }}
                    >
                      €{total.toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout button */}
                  <Link
                    href="/checkout"
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:opacity-90 shadow-lg mb-4"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Proceder al Pago
                    <ArrowRight size={20} />
                  </Link>

                  {/* Continue shopping */}
                  <div className="text-center mb-6">
                    <span className="text-[#1a1a2e]/40 text-sm">o </span>
                    <Link
                      href="/shop"
                      className="text-sm font-medium transition-colors duration-200 hover:underline"
                      style={{ color: ACCENT }}
                    >
                      continuar comprando
                    </Link>
                  </div>

                  {/* Trust badges */}
                  <div className="border-t border-[#1a1a2e]/8 pt-4 space-y-3">
                    {[
                      { icon: Shield, text: "Pago 100% seguro" },
                      { icon: Package, text: "Envío en 24-48h" },
                      { icon: Truck, text: "Devolución gratuita" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2">
                        <Icon size={15} className="text-[#1a1a2e]/40 flex-shrink-0" />
                        <span className="text-xs text-[#1a1a2e]/50">{text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. FEATURES STRIP ───────────────────────────────────────────── */}
      <section className="bg-white py-12 border-t border-[#1a1a2e]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="flex flex-col items-center text-center gap-3"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${ACCENT}15` }}
                >
                  <feature.icon size={22} style={{ color: ACCENT }} />
                </div>
                <div>
                  <p className="font-semibold text-[#1a1a2e] text-sm md:text-base">
                    {feature.title}
                  </p>
                  <p className="text-[#1a1a2e]/50 text-xs md:text-sm mt-0.5">
                    {feature.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
