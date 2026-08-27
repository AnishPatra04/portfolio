"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Award, Code2, BrainCircuit, Network, Compass, TrendingUp, CheckCircle } from "lucide-react";

interface DsaStat {
  label: string;
  count: number;
  maxCount?: string;
  icon: React.ReactNode;
  color: string;
  url?: string;
}

const STATS_DATA: DsaStat[] = [
  {
    label: "LeetCode Problems Solved",
    count: 100,
    maxCount: "100+",
    icon: <Code2 className="w-5 h-5 text-amber-500" />,
    color: "from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-500",
    url: "https://leetcode.com/u/An3sh_KP/",
  },
  {
    label: "GeeksforGeeks",
    count: 270,
    maxCount: "270+",
    icon: <Award className="w-5 h-5 text-emerald-500" />,
    color: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-500",
  },
  {
    label: "Global Rating Max",
    count: 1720,
    maxCount: "1720",
    icon: <TrendingUp className="w-5 h-5 text-indigo-500" />,
    color: "from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 text-indigo-500",
  },
];

const FOCUS_AREAS = [
  { name: "Arrays & Strings", desc: "Two Pointers, Sliding Window, Prefix Sum", level: 95 },
  { name: "Trees & Binary Trees", desc: "Traversals, BST operations, DFS/BFS tree height", level: 90 },
  { name: "Graphs & Networks", desc: "Dijkstra, MST, Union-Find, Cycle detection", level: 85 },
  { name: "Dynamic Programming", desc: "Knapsack, LCS, LIS, Memoization & Tabulation", level: 80 },
];

const ROADMAP_STEPS = [
  { step: "01", title: "Language Fundamentals", status: "completed", desc: "OOP concepts, Java collections, syntax syntax" },
  { step: "02", title: "Basic Data Structures", status: "completed", desc: "Arrays, Linked Lists, Stacks, Queues, Recursion" },
  { step: "03", title: "Intermediate Algorithms", status: "completed", desc: "Binary Search, Sorting, Hashing, Two Pointers" },
  { step: "04", title: "Advanced Trees & Graphs", status: "in-progress", desc: "AVL Trees, Segment Trees, Shortest Paths" },
  { step: "05", title: "Dynamic Programming & DP", status: "in-progress", desc: "Multi-dimensional DP, Bitmasking, Game Theory" },
];

// Counting hook
function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    let totalDuration = 1500;
    let incrementTime = Math.abs(Math.floor(totalDuration / end));
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, Math.max(incrementTime, 5));

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

export default function DsaJourney() {
  return (
    <section id="dsa" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          DSA Journey
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          problem solving stats & algorithmic path
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Stats and Focus areas */}
        <div className="lg:col-span-6 space-y-8">
          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-150 pl-2">
            Statistics Dashboard
          </h3>
          
          {/* Stats Grids */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STATS_DATA.map((stat, idx) => {
              const isLink = !!stat.url;
              const CardWrapper = isLink ? "a" : "div";
              const wrapperProps = isLink
                ? {
                    href: stat.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    title: `View LeetCode Profile: ${stat.url?.split("/").filter(Boolean).pop()}`,
                    className: `p-5 rounded-2xl border bg-gradient-to-tr ${stat.color} glassmorphism shadow-sm flex flex-col justify-between hover:scale-[1.02] transition-transform duration-305 cursor-pointer block`,
                  }
                : {
                    className: `p-5 rounded-2xl border bg-gradient-to-tr ${stat.color} glassmorphism shadow-sm flex flex-col justify-between`,
                  };

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex"
                >
                  <CardWrapper {...wrapperProps}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2 bg-white/80 dark:bg-zinc-900/80 rounded-xl border border-zinc-200/20 dark:border-zinc-800/40">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-3xl font-bold font-mono tracking-tight text-zinc-900 dark:text-white">
                        <Counter value={stat.count} />+
                      </span>
                      <p className="text-[10.5px] font-medium text-zinc-500 dark:text-zinc-400">
                        {stat.label}
                      </p>
                    </div>
                  </CardWrapper>
                </motion.div>
              );
            })}
          </div>

          {/* Current Focus Area Cards */}
          <div className="p-6 bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200/60 dark:border-zinc-850/60 rounded-2xl glassmorphism space-y-5">
            <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 flex items-center gap-1.5">
              <BrainCircuit className="w-4.5 h-4.5" />
              <span>Current Core Focus & Progress</span>
            </h4>
            
            <div className="space-y-4">
              {FOCUS_AREAS.map((focus) => (
                <div key={focus.name} className="space-y-1.5 font-sans">
                  <div className="flex justify-between text-xs font-semibold text-zinc-700 dark:text-zinc-350">
                    <span>{focus.name}</span>
                    <span className="text-[10.5px] text-zinc-500 font-mono">{focus.level}%</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-[-2px]">{focus.desc}</p>
                  
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${focus.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-indigo-650 dark:bg-white rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap Nodes Chart */}
        <div className="lg:col-span-6 space-y-8">
          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-150 pl-2">
            Algorithmic Learning Path
          </h3>

          <div className="relative pl-8 border-l border-zinc-200 dark:border-zinc-800 ml-4">
            {ROADMAP_STEPS.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                className="relative mb-8 last:mb-0"
              >
                {/* Node connector dot */}
                <div
                  className={`absolute -left-[41px] top-1.5 w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white dark:bg-zinc-900 ${
                    step.status === "completed"
                      ? "border-emerald-500 text-emerald-500"
                      : "border-indigo-500 text-indigo-500 animate-pulse"
                  }`}
                >
                  {step.status === "completed" ? (
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  )}
                </div>

                {/* Content node detail */}
                <div className="p-4 bg-white dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850/50 hover:border-indigo-500/20 rounded-xl transition-all duration-300">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-150">
                      {step.title}
                    </h4>
                    <span className="font-mono text-[9px] text-zinc-400 font-bold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40 px-1.5 py-0.5 rounded">
                      STEP {step.step}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
