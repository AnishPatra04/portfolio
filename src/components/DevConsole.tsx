"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Minus, Plus, RefreshCw, Clock, MapPin, Users } from "lucide-react";

const CODING_QUOTES = [
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Programs must be written for people to read, and only accidentally for machines to execute. — Abelson & Sussman",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Experience is the name everyone gives to their mistakes. — Oscar Wilde",
  "In order to understand recursion, one must first understand recursion. — Anonymous",
  "Before software can be reusable it first has to be usable. — Ralph Johnson",
  "Computers are good at following instructions, but not at reading your mind. — Donald Knuth",
  "If debugging is the process of removing software bugs, then programming must be the process of putting them in. — Edsger W. Dijkstra",
  "Simplicity is the soul of efficiency. — Austin Freeman"
];

export default function DevConsole() {
  const [isOpen, setIsOpen] = useState(false); // Collapsed by default to remain professional
  const [quote, setQuote] = useState("");
  const [visitorCount, setVisitorCount] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    // Set random quote
    setQuote(CODING_QUOTES[Math.floor(Math.random() * CODING_QUOTES.length)]);

    // Handle visitor counter (persisted in localStorage)
    const storedCount = localStorage.getItem("portfolio_visits");
    let currentVisits = storedCount ? parseInt(storedCount, 10) : 0;
    
    // Only increment once per session
    const sessionToken = sessionStorage.getItem("visited_session");
    if (!sessionToken) {
      currentVisits += 1;
      localStorage.setItem("portfolio_visits", currentVisits.toString());
      sessionStorage.setItem("visited_session", "true");
    }
    setVisitorCount(currentVisits === 0 ? 104 : currentVisits); // fallback to a cool seed number if 0

    // Live clock
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const rotateQuote = () => {
    let newQuote = quote;
    while (newQuote === quote) {
      newQuote = CODING_QUOTES[Math.floor(Math.random() * CODING_QUOTES.length)];
    }
    setQuote(newQuote);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80] font-mono text-xs">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/90 border border-zinc-800 text-indigo-400 hover:text-indigo-300 rounded-full shadow-lg glassmorphism transition-transform hover:scale-105 clickable"
        >
          <Terminal className="w-4 h-4" />
          <span>DevConsole.sh</span>
        </button>
      ) : (
        <div className="w-72 bg-zinc-950/95 border border-zinc-850 rounded-xl shadow-2xl overflow-hidden glassmorphism flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-850 select-none">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-bold text-[10px] tracking-wider uppercase">developer_console</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-0.5 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 rounded clickable"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Console Content */}
          <div className="p-3.5 space-y-3.5 text-zinc-300">
            {/* Clock & Location */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
              <div className="flex items-center gap-1.5 bg-zinc-900/50 p-1.5 rounded border border-zinc-850">
                <Clock className="w-3 h-3 text-indigo-400" />
                <span>{time}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-zinc-900/50 p-1.5 rounded border border-zinc-850 truncate">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate" title="Karnataka, India">Karn., India</span>
              </div>
            </div>

            {/* Visitor Counter */}
            <div className="flex items-center justify-between text-zinc-400 bg-zinc-900/50 px-2 py-1.5 rounded border border-zinc-850 text-[10px]">
              <div className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-amber-400" />
                <span>Total Visitors</span>
              </div>
              <span className="font-bold text-zinc-200">{visitorCount}</span>
            </div>

            {/* Quotes Segment */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                <span>random_coding_quote</span>
                <button
                  onClick={rotateQuote}
                  className="hover:text-indigo-400 p-0.5 rounded transition-transform hover:rotate-180 clickable"
                  title="Next Quote"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                </button>
              </div>
              <div className="p-2.5 bg-zinc-900/40 border border-zinc-850/60 rounded-lg text-[10.5px] italic text-zinc-300 leading-relaxed min-h-[48px] flex items-center">
                "{quote}"
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
