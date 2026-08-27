"use client";

import React, { useEffect, useState, useRef } from "react";
import { Search, Terminal, Moon, Sun, Monitor, Gamepad2, ArrowRight } from "lucide-react";
import { useTheme } from "./ThemeContext";

interface CommandItem {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const paletteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    {
      id: "hero",
      name: "Go to Home / Hero",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("hero"),
    },
    {
      id: "about",
      name: "Go to About Me",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("about"),
    },
    {
      id: "skills",
      name: "Go to Skills",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("skills"),
    },
    {
      id: "projects",
      name: "Go to Projects",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("projects"),
    },
    {
      id: "certificates",
      name: "Go to Certificates",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("certificates"),
    },
    {
      id: "dsa",
      name: "Go to DSA Journey",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("dsa"),
    },
    {
      id: "funzone",
      name: "Go to Fun Zone (Mini Games)",
      category: "Navigation",
      icon: <Gamepad2 className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("funzone"),
    },
    {
      id: "contact",
      name: "Go to Contact",
      category: "Navigation",
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => scrollToSection("contact"),
    },
    {
      id: "toggle-theme",
      name: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      category: "Preferences",
      icon: theme === "dark" ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-500" />,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
    },
  ];

  // Filter commands
  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh]">
      <div
        ref={paletteRef}
        className="w-full max-w-xl bg-zinc-900/90 border border-zinc-800 text-zinc-100 rounded-2xl shadow-2xl overflow-hidden glassmorphism"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-850">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-0 outline-none text-base placeholder-zinc-500 py-1"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 text-xs text-zinc-500 bg-zinc-805 px-1.5 py-0.5 rounded border border-zinc-800 shrink-0 select-none">
            ESC
          </kbd>
        </div>

        <div className="max-h-[320px] overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-zinc-500">
              No results found for "{search}"
            </div>
          ) : (
            Object.entries(
              filteredCommands.reduce((acc, cmd) => {
                if (!acc[cmd.category]) acc[cmd.category] = [];
                acc[cmd.category].push(cmd);
                return acc;
              }, {} as Record<string, CommandItem[]>)
            ).map(([category, items]) => (
              <div key={category}>
                <div className="px-4 py-1 text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                  {category}
                </div>
                <div className="space-y-0.5 px-2">
                  {items.map((cmd) => {
                    const globalIndex = filteredCommands.indexOf(cmd);
                    const isSelected = globalIndex === selectedIndex;
                    return (
                      <button
                        key={cmd.id}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "text-zinc-300 hover:bg-zinc-800/50"
                        }`}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                      >
                        <div className="flex items-center gap-3">
                          {cmd.icon}
                          <span>{cmd.name}</span>
                        </div>
                        {isSelected && (
                          <span className="flex items-center gap-0.5 text-xs opacity-80">
                            Enter <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="px-4 py-3 border-t border-zinc-850 flex items-center justify-between text-xs text-zinc-500 bg-zinc-950/40">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-4 h-4 bg-zinc-800 rounded border border-zinc-700 font-sans">↑</span>
            <span className="flex items-center justify-center w-4 h-4 bg-zinc-800 rounded border border-zinc-700 font-sans">↓</span>
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded border border-zinc-700 text-[10px] font-sans">Ctrl + K</kbd>
            <span>to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
