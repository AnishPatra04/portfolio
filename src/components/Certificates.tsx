"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, Download, X, Award, ExternalLink } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
  description: string;
}

const CERTIFICATES_DATA: Certificate[] = [
  {
    title: "AI Blueprint for BHARAT - Case Study Challenge",
    issuer: "IIT Kharagpur & Unstop",
    date: "2025",
    imageUrl: "/images/certi_iit_kgp.jpg",
    description: "Certificate of Participation for outstanding case study development for the AI Blueprint for BHARAT challenge organized by Indian Institute of Technology (IIT), Kharagpur.",
  },
  {
    title: "ACEATHON 2025 Hackathon",
    issuer: "NMAMIT (ACE & Association of Computer Engineers)",
    date: "October 11, 2025",
    imageUrl: "/images/certi_aceathon.jpg",
    description: "Certificate of Participation for developing innovative solutions at the national level ACEATHON 2025 hackathon held at NMAMIT.",
  },
  {
    title: "Crackathon Coding Contest",
    issuer: "Crack The Campus",
    date: "September 9, 2025",
    imageUrl: "/images/certi_crackathon.jpg",
    description: "Certificate of Participation showing commendable performance, coding skill, and collaborative teamwork during Crackathon.",
  },
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Esc key closes the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCert(null);
        setIsZoomed(false);
      }
    };
    if (selectedCert) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert]);

  const handleClose = () => {
    setSelectedCert(null);
    setIsZoomed(false);
  };

  return (
    <section id="certificates" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16 select-none">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Certificates & Credentials
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          professional honors and hackathon verifications
        </p>
      </div>

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {CERTIFICATES_DATA.map((cert) => (
          <motion.div
            key={cert.title}
            onClick={() => setSelectedCert(cert)}
            whileHover={{ y: -6 }}
            className="group cursor-pointer flex flex-col justify-between p-4 bg-white dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850/50 hover:border-indigo-500/30 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 glassmorphism overflow-hidden"
          >
            {/* Image container */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200/20 dark:border-zinc-800/40 mb-4">
              <Image
                src={cert.imageUrl}
                alt={cert.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-w-768px) 100vw, 33vw"
              />
              {/* Hover overlay icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 z-10">
                <ZoomIn className="w-8 h-8 text-white scale-90 group-hover:scale-100 transition-transform duration-300" />
              </div>
            </div>

            {/* Content Details */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-indigo-500">
                <Award className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                  {cert.issuer}
                </span>
              </div>
              
              <h3 className="text-sm sm:text-base font-bold text-zinc-850 dark:text-zinc-200 line-clamp-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                {cert.title}
              </h3>
              
              <p className="text-[10.5px] sm:text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {cert.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-900/60 text-[10px] text-zinc-400 font-mono">
                <span>Issued: {cert.date}</span>
                <span className="flex items-center gap-1 text-indigo-500 group-hover:underline">
                  View full <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
            {/* Background close click */}
            <div className="absolute inset-0 z-0 cursor-zoom-out" onClick={handleClose} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl bg-zinc-950/80 border border-zinc-800 text-zinc-100 rounded-3xl overflow-hidden glassmorphism flex flex-col z-10 shadow-2xl relative"
            >
              {/* Controls Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-850 z-20">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white max-w-[200px] sm:max-w-md md:max-w-lg truncate">
                    {selectedCert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Zoom Action */}
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors clickable focus:outline-none"
                    title={isZoomed ? "Zoom Out" : "Zoom In"}
                  >
                    {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
                  </button>

                  {/* Download Action */}
                  <a
                    href={selectedCert.imageUrl}
                    download={`${selectedCert.title.replace(/\s+/g, "_")}.jpg`}
                    className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors clickable focus:outline-none"
                    title="Download Certificate"
                  >
                    <Download className="w-5 h-5" />
                  </a>

                  {/* Close Action */}
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors clickable focus:outline-none"
                    title="Close Overlay (ESC)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Content Modal Display */}
              <div className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-6 bg-zinc-950/65 min-h-[300px] max-h-[70vh]">
                <div
                  className={`relative w-full aspect-[4/3] max-w-full transition-all duration-300 cursor-zoom-in ${
                    isZoomed ? "scale-145 z-20" : "scale-100"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <Image
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    fill
                    className="object-contain rounded-xl"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>

              {/* Info Description Footer */}
              <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-850 z-20 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {selectedCert.description}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
