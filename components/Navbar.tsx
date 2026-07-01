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
              <Link
                href="/cart"
                className="relative p-2 text-[#1a1a2e]/70 hover:text-[#e94560] transition-colors duration-200"
                aria-label="Carrito"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#e94560] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <Link
                href={getHref(navCTA.href)}
                onClick={(e) => handleNavClick(e, navCTA.href)}
                className="ml-2 px-5 py-2 bg-[#1a1a2e] text-white text-sm font-semibold rounded-full hover:bg-[#e94560] transition-all duration-300 shadow-sm"
              >
                {navCTA.label}
              </Link>
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/cart"
                className="relative p-2 text-[#1a1a2e]/70 hover:text-[#e94560] transition-colors duration-200"
                aria-label="Carrito"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#e94560] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-[#1a1a2e]/70 hover:text-[#1a1a2e] hover:bg-black/5 transition-all duration-200"
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
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
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-black/5 bg-white/95 backdrop-blur-md"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="relative max-w-xl mx-auto">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1a2e]/40"
                  />
                  <input
                    type="search"
                    placeholder="Buscar productos, categorías…"
                    autoFocus
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-[#f5f5f5] border border-transparent focus:border-[#e94560]/30 focus:ring-2 focus:ring-[#e94560]/10 text-sm text-[#1a1a2e] placeholder-[#1a1a2e]/40 outline-none transition-all duration-200"
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 bg-white/98 backdrop-blur-md shadow-xl border-t border-black/5 md:hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getHref(link.href)}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 text-base font-medium text-[#1a1a2e]/80 hover:text-[#e94560] hover:bg-[#e94560]/5 rounded-xl transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-base font-medium text-[#1a1a2e]/80 hover:text-[#e94560] hover:bg-[#e94560]/5 rounded-xl transition-all duration-200 flex items-center gap-2"
              >
                <ShoppingBag size={18} />
                Carrito
              </Link>
              <div className="mt-4 pt-4 border-t border-black/5">
                <Link
                  href={getHref(navCTA.href)}
                  onClick={(e) => {
                    handleNavClick(e, navCTA.href);
                    setIsOpen(false);
                  }}
                  className="block w-full text-center px-6 py-3 bg-[#1a1a2e] text-white font-semibold rounded-full hover:bg-[#e94560] transition-all duration-300"
                >
                  {navCTA.label}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
