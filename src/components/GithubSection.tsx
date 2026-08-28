"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, BookOpen, Calendar, Circle } from "lucide-react";
import { GithubIcon } from "./Icons";

interface PinnedRepo {
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  forks: number;
  url: string;
}

const PINNED_REPOS: PinnedRepo[] = [
  {
    name: "Ai-Collab",
    desc: "AI-powered collaboration platform designed to improve productivity and teamwork through intelligent workflows.",
    lang: "TypeScript",
    langColor: "bg-blue-500",
    stars: 8,
    forks: 3,
    url: "https://github.com/AnishPatra04/Ai-Collab",
  },
  {
    name: "campus-faculty-management",
    desc: "A full-stack faculty management system featuring authentication, role-based access, and academic management dashboards.",
    lang: "JavaScript",
    langColor: "bg-yellow-500",
    stars: 5,
    forks: 2,
    url: "https://github.com/AnishPatra04/campus-faculty-management",
  },
  {
    name: "Dbank",
    desc: "A decentralized banking application built on the Internet Computer Protocol using Motoko smart contracts.",
    lang: "Motoko",
    langColor: "bg-purple-500",
    stars: 6,
    forks: 4,
    url: "https://github.com/AnishPatra04/Dbank",
  },
];

// Mock Contribution Graph builder (53 weeks * 7 days)
const generateMockContributions = () => {
  const levels = [0, 1, 2, 3, 4];
  const grid = [];
  // 53 columns
  for (let i = 0; i < 28; i++) {
    const col = [];
    for (let j = 0; j < 7; j++) {
      // Pick random levels biased towards 1, 2 and 3
      const rand = Math.random();
      let lvl = 0;
      if (rand > 0.85) lvl = 4;
      else if (rand > 0.65) lvl = 3;
      else if (rand > 0.45) lvl = 2;
      else if (rand > 0.2) lvl = 1;
      col.push(lvl);
    }
    grid.push(col);
  }
  return grid;
};

const generateEmptyContributions = () => {
  const grid = [];
  for (let i = 0; i < 28; i++) {
    const col = Array(7).fill(0);
    grid.push(col);
  }
  return grid;
};

export default function GithubSection() {
  const [hoveredCell, setHoveredCell] = useState<{ col: number; row: number } | null>(null);
  const [contributionGrid, setContributionGrid] = useState<number[][]>(() => generateEmptyContributions());

  useEffect(() => {
    setContributionGrid(generateMockContributions());
  }, []);

  const getCellColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-zinc-100 dark:bg-zinc-900";
      case 1:
        return "bg-emerald-100 dark:bg-emerald-950/40 border border-emerald-900/10";
      case 2:
        return "bg-emerald-350 dark:bg-emerald-800/60 border border-emerald-700/20";
      case 3:
        return "bg-emerald-500 dark:bg-emerald-600/80";
      case 4:
        return "bg-emerald-700 dark:bg-emerald-450";
      default:
        return "bg-zinc-100 dark:bg-zinc-900";
    }
  };

  return (
    <section id="github" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans flex items-center justify-center gap-2">
          <GithubIcon className="w-8 h-8" />
          <span>GitHub Activity</span>
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          repositories, contributions & open source
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Pinned Repos Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-150 pl-2">
            Pinned Repositories
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PINNED_REPOS.map((repo, idx) => (
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                key={repo.name}
                className="group p-5 bg-white dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850/50 hover:border-indigo-500/30 rounded-2xl glassmorphism shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between clickable"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span className="font-bold text-sm sm:text-base text-zinc-800 dark:text-zinc-250 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 truncate">
                      {repo.name}
                    </span>
                  </div>
                  <p className="text-[11.5px] sm:text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono border-t border-zinc-100 dark:border-zinc-900/60 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Circle className={`w-2.5 h-2.5 rounded-full ${repo.langColor} text-transparent`} />
                    <span>{repo.lang}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-indigo-400" /> {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contribution Graph segment (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-150 pl-2">
            Contribution Matrix (Mocked)
          </h3>

          <div className="p-5 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200/60 dark:border-zinc-850/60 rounded-2xl glassmorphism space-y-4">
            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> 584 Commits this year
              </span>
              <a
                href="https://github.com/AnishPatra04"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline font-bold"
              >
                @AnishPatra04
              </a>
            </div>

            {/* Matrix board */}
            <div className="flex gap-[3.5px] overflow-x-auto pb-2 scrollbar-thin select-none">
              {contributionGrid.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3.5px]">
                  {col.map((level, rowIdx) => (
                    <div
                      key={rowIdx}
                      className={`w-[9.5px] h-[9.5px] sm:w-[11.5px] sm:h-[11.5px] rounded-[1.5px] cursor-crosshair transition-colors duration-150 ${getCellColor(
                        level
                      )}`}
                      onMouseEnter={() => setHoveredCell({ col: colIdx, row: rowIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Details row and legend */}
            <div className="flex items-center justify-between text-[9.5px] text-zinc-500 font-mono border-t border-zinc-100 dark:border-zinc-900/60 pt-3">
              <div>
                {hoveredCell ? (
                  <span>
                    Commits logged at Cell[{hoveredCell.col},{hoveredCell.row}]
                  </span>
                ) : (
                  <span>Hover blocks for coordinates</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded bg-zinc-100 dark:bg-zinc-900" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-950/40" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-800/60" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-600/80" />
                <span className="w-2.5 h-2.5 rounded bg-emerald-450" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
