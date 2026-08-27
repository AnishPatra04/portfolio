"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Award, Briefcase, ChevronRight, CheckCircle2 } from "lucide-react";

const TIMELINE_DATA = [
  {
    type: "education",
    title: "Engineering - 3rd Year",
    institution: "NMAM Institute of Technology (NMAMIT), Nitte",
    period: "2024 - Present",
    description: "Pursuing Computer Science & Engineering with an exceptional CGPA of 9.7. Engaging in advanced coursework and core projects.",
    milestones: ["CGPA: 9.7 / 10.0", "Core CSE Curriculum", "Web3 Smart Contract Exploration"],
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    type: "achievement",
    title: "Hackathons & Challenges",
    institution: "IIT Kharagpur & Community",
    period: "2025",
    description: "Actively participated in national level challenges and hackathons, building solutions and collaborating with peers.",
    milestones: [
      "AI Blueprint for BHARAT - Case Study Challenge (IIT Kharagpur)",
      "ACEATHON 2025 (NMAMIT)",
      "Crackathon (Crack The Campus)"
    ],
    icon: <Award className="w-5 h-5" />,
  },
  {
    type: "education",
    title: "Higher Secondary School",
    institution: "Loyola School",
    period: "2022 - 2024",
    description: "Completed secondary education with high-performance credentials, building strong fundamentals in mathematics, physics, and computing.",
    milestones: ["Loyola School Batch of 2022-24", "Strong PCM Foundation", "Early interest in computer science"],
    icon: <BookOpen className="w-5 h-5" />,
  },
];

const INTERESTS = [
  "Data Structures & Algorithms",
  "Full Stack Development",
  "Web3 & Smart Contracts",
  "AI-powered Applications",
  "Backend Engineering",
];

export default function About() {
  return (
    <section id="about" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          About Me
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          my academic & engineering journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Profile Card / Bio Column */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl glassmorphism space-y-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-150">
              Professional Summary
            </h3>
            
            <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
              I am a 3rd Year Computer Science Engineering student with a passion for software engineering, web application architecture, and decentralization. I maintain a high academic standing with a **CGPA of 9.7**, reflecting my commitment to excellence and analytical thinking.
            </p>
            <p className="text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans">
              As a constant learner, I enjoy bridging the gap between theoretical knowledge and real-world implementation. I specialize in designing full-stack applications, exploring Internet Computer Protocol (ICP) smart contracts, and writing efficient backend APIs.
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                Core Engineering Focus
              </h4>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <span
                    key={interest}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-350 rounded-full font-sans font-medium hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:scale-103 transition-all"
                  >
                    <ChevronRight className="w-3 h-3 text-indigo-500" />
                    <span>{interest}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Column */}
        <div className="lg:col-span-7 space-y-8">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-150 pl-2">
            Academic Timeline
          </h3>

          <div className="relative pl-6 sm:pl-8 border-l border-zinc-200 dark:border-zinc-800 ml-4 sm:ml-6 space-y-12">
            {TIMELINE_DATA.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Timeline node circle */}
                <div className="absolute -left-[39px] sm:-left-[47px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-indigo-500 flex items-center justify-center text-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                  {item.icon}
                </div>

                {/* Content card */}
                <div className="p-5 sm:p-6 bg-white dark:bg-zinc-950/30 border border-zinc-200/50 dark:border-zinc-850/50 rounded-2xl hover:border-indigo-500/30 dark:hover:border-indigo-500/20 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-150">
                      {item.title}
                    </h4>
                    <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 rounded-full font-mono text-[10px] font-bold tracking-wider self-start sm:self-center">
                      {item.period}
                    </span>
                  </div>
                  
                  <p className="text-[11px] font-mono text-indigo-500 dark:text-indigo-400 mb-3 font-semibold">
                    {item.institution}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-sans mb-4">
                    {item.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 border-t border-zinc-100 dark:border-zinc-900 pt-3">
                    {item.milestones.map((ms, mIdx) => (
                      <div key={mIdx} className="flex items-start gap-2 text-xs text-zinc-650 dark:text-zinc-400 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{ms}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
