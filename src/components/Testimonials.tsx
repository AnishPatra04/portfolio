"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, MessageSquareQuote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  relation: string;
  comment: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "Dr. Jyothi Shetty",
    role: "Head of Department, CSE",
    relation: "Academic Mentor",
    comment: "Anish stands out as an exceptionally dedicated and brilliant student. Maintaining a CGPA of 9.7 while actively building real-world projects and participating in hackathons demonstrates his superior analytical capabilities and time management.",
  },
  {
    name: "Rahul Sharma",
    role: "Full Stack Engineer @ TechCorp",
    relation: "Hackathon Team Lead",
    comment: "Working with Anish at ACEATHON was a blast. He handled the entire backend API logic and Web3 database integration effortlessly. His fast execution and structured coding conventions make him a formidable asset to any development team.",
  },
  {
    name: "Amit Kumar",
    role: "ICP Canister Developer",
    relation: "Web3 Peer",
    comment: "Anish's comprehension of Internet Computer canisters and Motoko smart contracts is remarkable for a 3rd year student. He builds clean, optimized structures and is always eager to tackle complex system designs.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans flex items-center justify-center gap-2">
          <MessageSquareQuote className="w-8 h-8 text-indigo-500" />
          <span>Testimonials</span>
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          recommendations & feedback from peers & mentors
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS_DATA.map((test, index) => (
          <motion.div
            key={test.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-6 bg-white dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850/50 rounded-2xl glassmorphism flex flex-col justify-between relative shadow-sm hover:shadow-lg hover:border-indigo-500/20 transition-all duration-300"
          >
            {/* Top row */}
            <div className="space-y-4">
              <Quote className="w-8 h-8 text-indigo-500/20 shrink-0" />
              <p className="text-xs sm:text-sm italic text-zinc-650 dark:text-zinc-405 leading-relaxed font-sans">
                "{test.comment}"
              </p>
            </div>

            {/* Bottom details */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900/60 mt-6 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-zinc-850 dark:text-zinc-200">{test.name}</p>
                <p className="text-[10px] text-zinc-500">{test.role}</p>
              </div>
              <span className="inline-block px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 rounded-full font-mono text-[9px] font-bold">
                {test.relation}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
