"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Heart, Search, User } from 'lucide-react';
import { navLinks, navCTA, APP_NAME } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.10)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label={APP_NAME}
            >
              <span className="font-playfair text-2xl font-bold tracking-tight text-[#1a1a2e] group-hover:text-[#e94560] transition-colors duration-300">
                {APP_NAME}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e94560] mt-1" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-2 text-sm font-medium text-[#1a1a2e]/70 hover:text-[#1a1a2e] transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-[#e94560] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/5 transition-all duration-200"
                aria-label="Buscar"
              >
                <Search size={18} />
              </button>
              <button
                className="p-2 rounded-full text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/5 transition-all duration-200"
                aria-label="Lista de deseos"
              >
                <Heart size={18} />
              </button>
              <button
                className="p-2 rounded-full text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/5 transition-all duration-200"
                aria-label="Mi cuenta"
              >
                <User size={18} />
              </button>
              <button
                className="relative p-2 rounded-full text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/5 transition-all duration-200"
                aria-label="Carrito de compras"
              >
                <ShoppingBag size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#e94560] rounded-full" />
              </button>
              <Link
                href={getHref(navCTA.href)}
                onClick={(e) => handleNavClick(e, navCTA.href)}
                className="ml-2 px-5 py-2 bg-[#e94560] text-white text-sm font-semibold rounded-full hover:bg-[#c73652] transition-all duration-300 shadow-[0_4px_14px_rgba(233,69,96,0.35)] hover:shadow-[0_6px_20px_rgba(233,69,96,0.45)] hover:-translate-y-0.5"
              >
                {navCTA.label}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                className="relative p-2 rounded-full text-[#1a1a2e]/60 hover:text-[#1a1a2e]"
                aria-label="Carrito"
              >
                <ShoppingBag size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#e94560] rounded-full" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-[#1a1a2e]/70 hover:text-[#1a1a2e] hover:bg-black/5 transition-all duration-200"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur-md"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a2e]/40"
                  />
                  <input
                    type="search"
                    placeholder="Buscar productos, marcas, categorías..."
                    autoFocus
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#f5f5f5] rounded-full border border-transparent focus:border-[#e94560]/30 focus:outline-none focus:ring-2 focus:ring-[#e94560]/10 transition-all duration-200"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col"
              aria-label="Menú móvil"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-black/5">
                <span className="font-playfair text-xl font-bold text-[#1a1a2e]">
                  Menú
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-6 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={getHref(link.href)}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsOpen(false);
                    }}
                    className="flex items-center px-4 py-3 rounded-xl text-[#1a1a2e]/80 hover:text-[#1a1a2e] hover:bg-[#f5f5f5] font-medium transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="px-6 pb-8 pt-4 border-t border-black/5">
                <Link
                  href={getHref(navCTA.href)}
                  onClick={(e) => {
                    handleNavClick(e, navCTA.href);
                    setIsOpen(false);
                  }}
                  className="block w-full text-center px-5 py-3 bg-[#e94560] text-white font-semibold rounded-full hover:bg-[#c73652] transition-all duration-300 shadow-[0_4px_14px_rgba(233,69,96,0.35)]"
                >
                  {navCTA.label}
                </Link>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <button className="p-2 rounded-full text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/5 transition-all" aria-label="Buscar">
                    <Search size={18} />
                  </button>
                  <button className="p-2 rounded-full text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/5 transition-all" aria-label="Favoritos">
                    <Heart size={18} />
                  </button>
                  <button className="p-2 rounded-full text-[#1a1a2e]/60 hover:text-[#1a1a2e] hover:bg-black/5 transition-all" aria-label="Mi cuenta">
                    <User size={18} />
                  </button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}