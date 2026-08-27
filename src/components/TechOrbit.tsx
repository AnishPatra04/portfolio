"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Database, GitBranch, Layers } from "lucide-react";

// Custom icons or text tags for technologies in orbit
const ORBIT_ITEMS = [
  { name: "React", color: "text-sky-400 bg-sky-950/40 border-sky-500/30", icon: "⚛️" },
  { name: "Motoko", color: "text-purple-400 bg-purple-950/40 border-purple-500/30", icon: "🔗" },
  { name: "Node.js", color: "text-green-400 bg-green-950/40 border-green-500/30", icon: "🟢" },
  { name: "MongoDB", color: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30", icon: "🍃" },
  { name: "Git", color: "text-orange-400 bg-orange-950/40 border-orange-500/30", icon: "⌥" },
  { name: "Java", color: "text-red-400 bg-red-950/40 border-red-500/30", icon: "☕" },
];

export default function TechOrbit() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  return (
    <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] flex items-center justify-center select-none">
      {/* Outer Floating Blob behind the profile */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl animate-pulse" />

      {/* Orbit Tracks */}
      <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 pointer-events-none" />

      {/* Central Profile Photo */}
      <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl overflow-hidden group">
        <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900">
          <Image
            src="/images/profile.jpg"
            alt="Anish Kumar Patra Profile"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-w-768px) 112px, 144px"
            priority
          />
        </div>
      </div>

      {/* Orbital Items */}
      <motion.div
        className="absolute inset-0 z-25"
        animate={{ rotate: isHovered ? 0 : 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        {ORBIT_ITEMS.map((item, idx) => {
          const angle = (idx * 360) / ORBIT_ITEMS.length;
          // Radius of orbit (smaller for small screens)
          const radius = typeof window !== "undefined" && window.innerWidth < 640 ? 110 : 140;

          // Compute position in polar coordinates
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <div
              key={item.name}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              {/* Compensate rotation to keep icon upright */}
              <motion.div
                animate={{ rotate: isHovered ? 0 : -360 }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 25,
                }}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setActiveTech(item.name);
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setActiveTech(null);
                }}
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center font-bold text-base sm:text-lg cursor-pointer shadow-md transition-all duration-300 ${item.color} ${
                  activeTech === item.name
                    ? "scale-125 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-30 bg-zinc-900"
                    : "hover:scale-115"
                }`}
              >
                <span>{item.icon}</span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Tech Indicator Badge */}
      {activeTech && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute bottom-2 z-30 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 bg-zinc-900/90 border border-indigo-500/40 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.2)] glassmorphism"
        >
          {activeTech}
        </motion.div>
      )}
    </div>
  );
}
