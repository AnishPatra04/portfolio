"use client";

import React, { useState } from "react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setFormData({ name: "", email: "", message: "" });

      // Reset toast after 4s
      setTimeout(() => setSubmitStatus("idle"), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16 relative">
      {/* Background Glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Get In Touch
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          let's collaborate or build something together
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch z-10 relative">
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850/50 rounded-2xl glassmorphism shadow-sm">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-150">
              Let's Discuss Projects
            </h3>
            
            <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
              Whether you want to explore Web3 canister integration, build Next.js applications, solve complex DSA queries, or talk about software engineering architectures—feel free to drop a message!
            </p>

            <div className="space-y-4 pt-4">
              {/* Location Card */}
              <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
                <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl">
                  <MapPin className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Location</p>
                  <p className="text-xs sm:text-sm font-semibold">Mangalore, Karnataka, India</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
                <div className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl">
                  <Mail className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">Email Address</p>
                  <p className="text-xs sm:text-sm font-semibold">anishpatra.work@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social connections */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-900/60 mt-8 space-y-3">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-450 dark:text-zinc-500">Connect Online</p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/AnishPatra04"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:scale-108 transition-all rounded-xl clickable"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/anish-patra-60543630a/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-650 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 hover:scale-108 transition-all rounded-xl clickable"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-white dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850/50 rounded-2xl glassmorphism shadow-sm flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5 font-sans">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-400 pl-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 rounded-xl focus:border-indigo-500 outline-none text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-500 font-sans"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5 font-sans">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-400 pl-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@domain.com"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 rounded-xl focus:border-indigo-500 outline-none text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-500 font-sans"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5 font-sans">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-400 pl-1">Message Details</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your project details or inquiries here..."
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-850 rounded-xl focus:border-indigo-500 outline-none text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-500 font-sans resize-none"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs bg-indigo-650 hover:bg-indigo-600 text-white shadow-lg hover:shadow-indigo-500/20 disabled:opacity-70 transition-all duration-300 transform hover:-translate-y-0.5 clickable focus:outline-none"
            >
              <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Floating Success Toast Notification */}
      <AnimatePresence>
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-[90] flex items-center gap-3 px-4 py-3 bg-zinc-950 border border-emerald-500 text-white rounded-xl shadow-2xl glassmorphism"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <div className="font-mono text-xs">
              <p className="font-bold text-emerald-500">TRANSMISSION_SUCCESS</p>
              <p className="text-[10px] text-zinc-400">Message compiled and sent to Anish!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
