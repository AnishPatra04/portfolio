"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Download, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import TechOrbit from "./TechOrbit";

const TYPING_ROLES = [
  "Full Stack Developer",
  "Web3 Developer",
  "Computer Science Engineer",
  "Problem Solver",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const fullRole = TYPING_ROLES[roleIndex];
      if (!isDeleting) {
        // Add char
        setCurrentText(fullRole.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullRole) {
          // Pause before deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Delete char
        setCurrentText(fullRole.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, typingSpeed]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center py-20 px-6 sm:px-12 relative overflow-hidden select-none"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Profile/Orbit Column */}
        <div className="lg:col-span-5 flex justify-center order-first lg:order-last">
          <TechOrbit />
        </div>

        {/* Info Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Animated Greeting badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50/80 border border-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/30 dark:text-indigo-400 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            <span>Open to Opportunities</span>
          </motion.div>

          {/* Name */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-950 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-50 font-sans">
              Anish Kumar Patra
            </h1>
            {/* Dynamic Typing Title */}
            <div className="h-8 sm:h-10 text-lg sm:text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">
              <span>{currentText}</span>
              <span className="w-[3px] h-[20px] sm:h-[26px] bg-indigo-600 dark:bg-indigo-400 inline-block animate-pulse ml-1" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="max-w-xl text-sm sm:text-base text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
            Passionate about building scalable web applications, decentralized applications, and AI-powered software. Currently exploring DSA, Backend Development, Web3, and Modern Full Stack Technologies.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => handleScroll("projects")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5 clickable"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Resume download will be active soon! (Placeholder)");
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-750 dark:text-zinc-300 transition-all duration-300 transform hover:-translate-y-0.5 clickable"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => handleScroll("contact")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs bg-zinc-900 hover:bg-zinc-850 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-white transition-all duration-300 transform hover:-translate-y-0.5 clickable"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/AnishPatra04"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-650 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:scale-110 transition-all border border-zinc-200/40 dark:border-zinc-800/40 clickable"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/anish-patra-60543630a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-650 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 hover:scale-110 transition-all border border-zinc-200/40 dark:border-zinc-800/40 clickable"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
