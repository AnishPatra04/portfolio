"use client";

import React, { useEffect, useState, useRef } from "react";
import { X, Terminal, Cpu, ShieldAlert, Award } from "lucide-react";

export default function KonamiEgg() {
  const [isActive, setIsActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const konamiCodeRef = useRef<string[]>([
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]);
  const inputSequenceRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const sequence = inputSequenceRef.current;
      const expected = konamiCodeRef.current;

      sequence.push(key);
      if (sequence.length > expected.length) {
        sequence.shift();
      }

      // Check if matches
      const isMatch = sequence.every((val, index) => {
        // Allow B/b and A/a case insensitivity
        if (expected[index].toLowerCase() === "b" || expected[index].toLowerCase() === "a") {
          return val.toLowerCase() === expected[index].toLowerCase();
        }
        return val === expected[index];
      });

      if (isMatch) {
        setIsActive(true);
        sequence.length = 0; // reset
      }

      if (e.key === "Escape" && isActive) {
        setIsActive(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const yPositions = Array(columns).fill(0);
    const chars = "0101010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$#&%$*".split("");

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let intervalId = setInterval(() => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff41"; // Matrix Green
      ctx.font = "15px monospace";

      yPositions.forEach((y, index) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = index * 20;
        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 20;
        }
      });
    }, 33);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-green-500 font-mono overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Terminal Overlay UI */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xl bg-black/85 border border-green-500/50 p-6 rounded-xl shadow-[0_0_30px_rgba(0,255,65,0.3)] z-10 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-green-500/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="font-bold text-sm tracking-widest text-green-400">ANISH_OS v1.0.0</span>
          </div>
          <button
            onClick={() => setIsActive(false)}
            className="p-1 hover:bg-green-500/20 text-green-400 hover:text-green-300 rounded transition-colors clickable"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <p className="text-green-400 font-bold flex items-center gap-1.5">
            <Cpu className="w-4 h-4" /> SECURE_SHELL: EASTER EGG INJECTED
          </p>
          <div className="border border-green-500/20 bg-green-950/20 p-3 rounded space-y-1">
            <p className="text-green-300 font-bold">🎉 Welcome to Developer Mode!</p>
            <p className="text-green-400/80">You've successfully triggered the Konami Code. You are officially an elite debugger!</p>
          </div>
          <div className="space-y-1">
            <p className="text-green-500/75">&gt; Loading Anish's secret stats...</p>
            <p className="text-green-400">&gt; CGPA: 9.7 (Elite Class)</p>
            <p className="text-green-400">&gt; Coding Languages: Java, JavaScript, Motoko, CSS/HTML, SQL</p>
            <p className="text-green-400">&gt; Specializations: Web3 Canister Smart Contracts, Full Stack Architecture</p>
            <p className="text-green-500/75">&gt; System status: Optimal, ready to compile.</p>
          </div>
          <p className="text-green-500/50 animate-pulse">&gt; Press ESC or click X to exit terminal...</p>
        </div>
      </div>
    </div>
  );
}
