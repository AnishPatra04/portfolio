"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Certificates", id: "certificates" },
  { label: "DSA", id: "dsa" },
  { label: "Fun Zone", id: "funzone" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll progress indicator
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }

      // Track active section for high-light
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 select-none pointer-events-none">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5 rounded-full border border-zinc-200/50 bg-white/75 dark:border-zinc-800/50 dark:bg-zinc-950/75 backdrop-blur-md shadow-lg pointer-events-auto">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 font-mono font-bold text-sm tracking-widest text-zinc-900 dark:text-zinc-50 clickable focus:outline-none"
          >
            <Terminal className="w-5 h-5 text-indigo-500" />
            <span>ANISH.DEV</span>
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-full transition-colors relative clickable focus:outline-none ${
                    isActive
                      ? "text-white dark:text-zinc-900 font-bold"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-indigo-600 dark:bg-white rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Actions: Theme toggle & mobile menu trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-zinc-200/50 hover:bg-zinc-100 dark:border-zinc-800/50 dark:hover:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 transition-colors clickable focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Ctrl+K hint */}
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] text-zinc-400 bg-zinc-100/50 dark:bg-zinc-900/50 px-2 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 font-mono select-none">
              Ctrl+K
            </kbd>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full border border-zinc-200/50 hover:bg-zinc-100 dark:border-zinc-800/50 dark:hover:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 transition-colors clickable focus:outline-none"
              aria-label="Open navigation menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Scroll Progress Indicator Bar */}
        <div className="absolute left-0 right-0 bottom-0 px-8">
          <div className="max-w-6xl mx-auto h-[2.5px] rounded-full overflow-hidden bg-transparent">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              style={{ scaleX: scrollProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 p-4 rounded-3xl border border-zinc-200 bg-white/95 dark:border-zinc-850 dark:bg-zinc-950/95 backdrop-blur-md shadow-2xl md:hidden font-mono"
          >
            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-2xl transition-colors clickable ${
                      isActive
                        ? "bg-indigo-600 text-white font-bold"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-350 dark:hover:bg-zinc-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
