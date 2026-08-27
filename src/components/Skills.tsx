"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Monitor, Server, Database, ShieldAlert, Cpu, Hammer, GraduationCap } from "lucide-react";

interface Skill {
  name: string;
  level: number; // 0-100 progress
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string; // Tailwind accent border/text color class
  glowColor: string; // Tailwind custom drop-shadow style or class
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: <Code2 className="w-5 h-5" />,
    color: "border-sky-500/20 hover:border-sky-500/50 dark:hover:border-sky-500/30 text-sky-500",
    glowColor: "shadow-[0_0_15px_rgba(14,165,233,0.15)]",
    skills: [
      { name: "Java", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "HTML & CSS", level: 90 },
      { name: "SQL", level: 80 },
      { name: "Motoko (Web3)", level: 75 },
    ],
  },
  {
    title: "Frontend Engineering",
    icon: <Monitor className="w-5 h-5" />,
    color: "border-indigo-500/20 hover:border-indigo-500/50 dark:hover:border-indigo-500/30 text-indigo-500",
    glowColor: "shadow-[0_0_15px_rgba(99,102,241,0.15)]",
    skills: [
      { name: "React", level: 85 },
      { name: "Tailwind CSS", level: 75 },
      { name: "Responsive Design", level: 90 },
      { name: "Bootstrap", level: 80 },
    ],
  },
  {
    title: "Backend Engineering",
    icon: <Server className="w-5 h-5" />,
    color: "border-emerald-500/20 hover:border-emerald-500/50 dark:hover:border-emerald-500/30 text-emerald-500",
    glowColor: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "JWT & Auth", level: 80 },
      { name: "Middleware Logic", level: 80 },
    ],
  },
  {
    title: "Databases",
    icon: <Database className="w-5 h-5" />,
    color: "border-teal-500/20 hover:border-teal-500/50 dark:hover:border-teal-500/30 text-teal-500",
    glowColor: "shadow-[0_0_15px_rgba(20,184,166,0.15)]",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "MySQL", level: 85 },
    ],
  },
  {
    title: "Web3 & Decentralization",
    icon: <Cpu className="w-5 h-5" />,
    color: "border-purple-500/20 hover:border-purple-500/50 dark:hover:border-purple-500/30 text-purple-500",
    glowColor: "shadow-[0_0_15px_rgba(168,85,247,0.15)]",
    skills: [
      { name: "Internet Computer (ICP)", level: 80 },
      { name: "Motoko Canisters", level: 75 },
      { name: "Smart Contracts", level: 75 },
      { name: "DFX SDK Tools", level: 70 },
    ],
  },
  {
    title: "Developer Tools",
    icon: <Hammer className="w-5 h-5" />,
    color: "border-orange-500/20 hover:border-orange-500/50 dark:hover:border-orange-500/30 text-orange-500",
    glowColor: "shadow-[0_0_15px_rgba(249,115,22,0.15)]",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "VS Code", level: 90 },
      { name: "Postman API client", level: 85 },
      { name: "Linux Bash", level: 75 },
      { name: "npm / node env", level: 85 },
    ],
  },
  {
    title: "Currently Learning",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "border-pink-500/20 hover:border-pink-500/50 dark:hover:border-pink-500/30 text-pink-500",
    glowColor: "shadow-[0_0_15px_rgba(236,72,153,0.15)]",
    skills: [
      { name: "Next.js (App Router)", level: 70 },
      { name: "TypeScript", level: 75 },
      { name: "Docker containers", level: 50 },
      { name: "System Design basics", level: 60 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Technical Skills
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          technologies i master & work with daily
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {SKILL_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`p-6 bg-white dark:bg-zinc-950/20 border rounded-2xl transition-all duration-300 ${category.color} hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 hover:${category.glowColor}`}
          >
            {/* Header */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
                {category.icon}
              </div>
              <h3 className="font-bold text-sm sm:text-base text-zinc-850 dark:text-zinc-200">
                {category.title}
              </h3>
            </div>

            {/* Skills Progress */}
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-1.5 font-sans">
                  <div className="flex justify-between text-xs text-zinc-650 dark:text-zinc-400 font-medium">
                    <span>{skill.name}</span>
                    <span className="font-mono text-[10px] text-zinc-500">{skill.level}%</span>
                  </div>
                  
                  {/* Outer bar */}
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                    {/* Inner animated bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                      className="h-full bg-indigo-600 dark:bg-white rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
