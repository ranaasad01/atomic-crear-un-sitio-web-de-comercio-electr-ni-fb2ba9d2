"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Globe as Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, navLinks } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Navegación",
    links: navLinks,
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", href: "#contacto" },
      { label: "Política de devoluciones", href: "#contacto" },
      { label: "Guía de tallas", href: "#tienda" },
      { label: "Envíos y entregas", href: "#contacto" },
      { label: "Términos y condiciones", href: "#contacto" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
];

export default function Footer() {
  const pathname = usePathname();

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <footer className="bg-[#1a1a2e] text-white/80">
      {/* Top CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <motion.div variants={fadeInUp} className="text-center md:text-left">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white tracking-tight">
                Únete a nuestra comunidad
              </h2>
              <p className="mt-2 text-white/60 text-base max-w-md">
                Recibe las últimas novedades, ofertas exclusivas y tendencias directamente en tu bandeja de entrada.
              </p>
            </motion.div>
            <motion.form
              variants={fadeInUp}
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 md:w-64 px-4 py-3 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#e94560]/60 focus:ring-2 focus:ring-[#e94560]/20 transition-all duration-200"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#e94560] text-white font-semibold rounded-full text-sm hover:bg-[#c73652] transition-all duration-300 shadow-[0_4px_14px_rgba(233,69,96,0.35)] hover:shadow-[0_6px_20px_rgba(233,69,96,0.45)] whitespace-nowrap"
              >
                Suscribirme
              </button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-4 group">
              <span className="font-playfair text-2xl font-bold text-white group-hover:text-[#e94560] transition-colors duration-300">
                {APP_NAME}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e94560] mt-1" />
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              {APP_TAGLINE}. Piezas únicas que definen tu estilo con calidad excepcional y diseño atemporal.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#e94560] hover:border-[#e94560] transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav Sections */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={getHref(link.href)}
                      onClick={(e) => handleClick(e, link.href)}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#e94560] mt-0.5 shrink-0" />
                <span className="text-sm text-white/50 leading-relaxed">
                  Calle Gran Vía 42, 28013 Madrid, España
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#e94560] shrink-0" />
                <a
                  href="tel:+34910000000"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  +34 910 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#e94560] shrink-0" />
                <a
                  href="mailto:hola@lumiere.es"
                  className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  hola@lumiere.es
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Hecho con <Heart size={11} className="text-[#e94560] fill-[#e94560]" /> en Madrid
          </p>
        </div>
      </div>
    </footer>
  );
}