"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp, Rocket } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/40 select-none py-12 px-6 sm:px-12 font-sans relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Name and Copy */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="text-center md:text-left space-y-1">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">Anish Kumar Patra</p>
            <p className="text-[11px] text-zinc-500 font-mono">
              &copy; {new Date().getFullYear()} &bull; Made with ❤️
            </p>
          </div>
          
          <a
            href="https://internship.flyrank.ai/verify?id=FR-D1-0E9D4-CDEB5&first_name=Anish"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all focus:outline-none clickable select-none"
            title="Verify FlyRank Internship Credential"
          >
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500 text-white shrink-0">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-left leading-none">
              <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-600 dark:text-emerald-450 leading-none">FlyRank Verified</p>
              <p className="text-[8px] font-mono text-zinc-500 dark:text-zinc-400 mt-1 leading-none">ID: FR-D1-0E9D4-CDEB5</p>
            </div>
          </a>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-zinc-650 dark:text-zinc-400">
          <button onClick={() => handleNavClick("hero")} className="hover:text-indigo-500 transition-colors clickable focus:outline-none">
            Home
          </button>
          <button onClick={() => handleNavClick("projects")} className="hover:text-indigo-500 transition-colors clickable focus:outline-none">
            Projects
          </button>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Resume download will be active soon! (Placeholder)");
            }}
            className="hover:text-indigo-500 transition-colors clickable"
          >
            Resume
          </a>
          <button onClick={() => handleNavClick("contact")} className="hover:text-indigo-500 transition-colors clickable focus:outline-none">
            Contact
          </button>
        </div>

        {/* Social connections */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/AnishPatra04"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-450 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 hover:scale-108 transition-all clickable"
            title="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/anish-patra-60543630a/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-450 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 hover:scale-108 transition-all clickable"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Floating Scroll-to-Top Rocket Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={handleScrollTop}
            className="fixed bottom-6 left-6 z-[80] p-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl hover:shadow-indigo-500/20 hover:scale-108 transition-all border border-indigo-450/20 clickable focus:outline-none flex items-center justify-center"
            title="Scroll to Top"
          >
            <Rocket className="w-4 h-4 -rotate-45" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
