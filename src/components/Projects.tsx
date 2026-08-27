"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./Icons";

interface Project {
  title: string;
  category: "Web3" | "Full Stack" | "Other";
  description: string;
  techStack: string[];
  features: string[];
  futureScope?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  liveUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    title: "CareerTrack",
    category: "Full Stack",
    description: "CareerTrack is a job application and interview management application that helps users track applications, interviews, and job-search progress, with AI-powered interview preparation using Google Gemini.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Google Gemini AI", "MongoDB", "Prisma"],
    features: [
      "AI Interview Prep: Interactive mock interviews with personalized feedback using Google Gemini",
      "Job Application Kanban Tracker: Visual boards to monitor application pipeline and statuses",
      "Intuitive Dashboard Analytics: Unified metrics for tracking job-search activity and milestones",
    ],
    futureScope: [
      "Browser extension for parsing and importing external listings in one click",
      "Real-time audio speech-to-text mock interviews",
    ],
    githubUrl: "https://github.com/AnishPatra04/CareerTrack",
    liveUrl: "https://career-track-teal.vercel.app",
  },
  {
    title: "AI Collab",
    category: "Full Stack",
    description: "AI-powered collaboration platform designed to improve productivity and teamwork through intelligent workflows and modern web technologies. Integrates real-time events for syncing workspace states.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "Socket.io", "MongoDB"],
    features: [
      "AI Intelligent Assistant for document generation & editing",
      "Real-time synchronized workspace document collaborating",
      "Robust state synchronization and workspace persistence",
    ],
    futureScope: [
      "Live drawing canvas whiteboard collaboration",
      "Interactive voice rooms for teamwork channels",
      "Multi-agent AI routing models"
    ],
    githubUrl: "https://github.com/AnishPatra04/Ai-Collab",
  },
  {
    title: "Campus Faculty Management System",
    category: "Full Stack",
    description: "A full-stack faculty management system featuring authentication, role-based access, and efficient academic management for universities and institutions.",
    techStack: ["React", "CSS/HTML", "Node.js", "Express.js", "MySQL", "JWT Auth"],
    features: [
      "Role-Based Access Control (Admin, HOD, Faculty)",
      "Secure Login / Registration Authenticator",
      "Academic Schedule & Profile CRUD Operations",
      "Clean dashboard reporting systems"
    ],
    futureScope: [
      "Automated timetable generation algorithm",
      "Leave approval system workflow module",
    ],
    githubUrl: "https://github.com/AnishPatra04/campus-faculty-management",
  },
  {
    title: "Decentralized Bank (Web3)",
    category: "Web3",
    description: "A decentralized banking application built on the Internet Computer Protocol using Motoko smart contracts to manage financial token transactions securely.",
    techStack: ["ICP Network", "Motoko Smart Contracts", "DFX CLI", "JavaScript", "HTML/CSS"],
    features: [
      "Decentralized ledger smart contracts logic",
      "Canister-based deployment on Web3 nodes",
      "Interactive wallet integration for deposit/withdraw",
      "No gas fee computations on backend canister queries"
    ],
    futureScope: [
      "Principal-based multi-token canister transfers",
      "Staking yields automated contract logic"
    ],
    githubUrl: "https://github.com/AnishPatra04/Dbank",
  },
  {
    title: "Calculator Project",
    category: "Other",
    description: "A sleek, responsive designer calculator built with advanced layout properties and neon lighting, offering smooth mathematical conversions.",
    techStack: ["HTML5", "Vanilla CSS", "JavaScript ES6"],
    features: [
      "Glassmorphic design styling themes",
      "High mathematical parsing correctness",
      "Excellent responsive screen layout adaptability"
    ],
    linkedinUrl: "https://www.linkedin.com/in/anish-patra-60543630a/overlay/Project/20153468/treasury/?profileId=ACoAAE667uUBhgsEofAz-sJsgJI4z1vnQNdPyhg",
  },
];

export default function Projects() {
  const [filter, setFilter] = useState<"All" | "Web3" | "Full Stack" | "Other">("All");

  const filteredProjects = PROJECTS_DATA.filter(
    (proj) => filter === "All" || proj.category === filter
  );

  return (
    <section id="projects" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Featured Projects
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          hand-crafted projects and code repositories
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center items-center gap-1.5 p-1 max-w-md mx-auto rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        {(["All", "Web3", "Full Stack", "Other"] as const).map((tab) => {
          const isActive = filter === tab;
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 text-xs font-semibold px-3 py-2 rounded-full transition-all relative clickable focus:outline-none ${
                isActive
                  ? "text-white dark:text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-indigo-600 dark:bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.title}
              className="group flex flex-col justify-between p-6 bg-white dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850/50 hover:border-indigo-500/30 dark:hover:border-indigo-500/20 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 glassmorphism relative"
            >
              <div>
                {/* Top header row */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-block px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-400 hover:text-indigo-500 dark:text-zinc-500 dark:hover:text-indigo-450 hover:scale-110 transition-transform clickable"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4.5 h-4.5" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-400 hover:text-indigo-500 dark:text-zinc-500 dark:hover:text-indigo-450 hover:scale-110 transition-transform clickable"
                        title="Live Demo"
                      >
                        <Globe className="w-4.5 h-4.5" />
                      </a>
                    )}
                    {!project.liveUrl && project.linkedinUrl && (
                      <a
                        href={project.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-zinc-400 hover:text-indigo-500 dark:text-zinc-500 dark:hover:text-indigo-450 hover:scale-110 transition-transform clickable"
                        title="LinkedIn Project Preview"
                      >
                        <ArrowUpRight className="w-4.5 h-4.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-150 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Specs List */}
                <div className="space-y-3 mb-6">
                  {/* Features */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                      Features
                    </p>
                    <ul className="list-disc list-inside pl-1 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-450 space-y-1">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="truncate" title={feat}>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Future Scope */}
                  {project.futureScope && project.futureScope.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400">
                        Future Scope
                      </p>
                      <ul className="list-disc list-inside pl-1 text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-450 space-y-1">
                        {project.futureScope.map((scope, idx) => (
                          <li key={idx} className="truncate" title={scope}>
                            {scope}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom footer row - tech list and CTA */}
              <div className="space-y-4 border-t border-zinc-100 dark:border-zinc-900/60 pt-4 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-[10px] font-mono font-medium text-zinc-550 dark:text-zinc-400 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        project.liveUrl ? "flex-1" : "w-full"
                      } flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-750 dark:text-zinc-300 transition-all duration-300 clickable`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>{project.liveUrl ? "Repository" : "View Repository"}</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        project.githubUrl ? "flex-1" : "w-full"
                      } flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition-all duration-300 clickable`}
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                  {!project.liveUrl && project.linkedinUrl && (
                    <a
                      href={project.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition-all duration-300 clickable"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>View Project Preview</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
