"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Trophy, Award, Flame } from "lucide-react";
import { GithubIcon } from "./Icons";

interface Achievement {
  title: string;
  metric: string;
  desc: string;
  icon: React.ReactNode;
  color: string; // Tailwind class
  glowColor: string; // Shadow styling
}

const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    title: "Academic standing",
    metric: "9.7 CGPA",
    desc: "Outstanding academic record in Computer Science Engineering at NMAMIT.",
    icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
    color: "border-indigo-500/20 hover:border-indigo-500/50 dark:hover:border-indigo-500/30 text-indigo-500",
    glowColor: "shadow-[0_0_15px_rgba(99,102,241,0.15)]",
  },
  {
    title: "National Hackathons",
    metric: "3+ Participations",
    desc: "Built full-stack models under tight deadlines at ACEATHON 2025 and Crackathon.",
    icon: <Trophy className="w-6 h-6 text-amber-500" />,
    color: "border-amber-500/20 hover:border-amber-500/50 dark:hover:border-amber-500/30 text-amber-500",
    glowColor: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  },
  {
    title: "IIT KGP Challenge",
    metric: "AI Case Study",
    desc: "Participated in the AI Blueprint for BHARAT case study challenge organized by IIT Kharagpur.",
    icon: <Award className="w-6 h-6 text-emerald-500" />,
    color: "border-emerald-500/20 hover:border-emerald-500/50 dark:hover:border-emerald-500/30 text-emerald-500",
    glowColor: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
  },
  {
    title: "Competitive Coding",
    metric: "370+ Solved",
    desc: "Successfully solved problems across LeetCode and GeeksforGeeks platforms.",
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    color: "border-orange-500/20 hover:border-orange-500/50 dark:hover:border-orange-500/30 text-orange-500",
    glowColor: "shadow-[0_0_15px_rgba(249,115,22,0.15)]",
  },
  {
    title: "Open Source",
    metric: "Active Contrib.",
    desc: "Publishing and maintaining functional software projects on GitHub.",
    icon: <GithubIcon className="w-6 h-6 text-pink-500" />,
    color: "border-pink-500/20 hover:border-pink-500/50 dark:hover:border-pink-500/30 text-pink-500",
    glowColor: "shadow-[0_0_15px_rgba(236,72,153,0.15)]",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Key Achievements
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          milestones and honors earned
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {ACHIEVEMENTS_DATA.map((ach, index) => (
          <motion.div
            key={ach.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`p-6 bg-white dark:bg-zinc-950/20 border rounded-2xl transition-all duration-300 ${ach.color} hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 hover:${ach.glowColor} flex flex-col justify-between`}
          >
            <div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl w-fit mb-4">
                {ach.icon}
              </div>
              <h3 className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 mb-1.5">
                {ach.title}
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-zinc-850 dark:text-zinc-50 font-sans mb-3 tracking-tight">
                {ach.metric}
              </p>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-sans mt-auto">
              {ach.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
