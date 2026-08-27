"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

interface Post {
  title: string;
  category: string;
  date: string;
  readTime: string;
  desc: string;
}

const POSTS_DATA: Post[] = [
  {
    title: "Diving into Motoko Smart Contracts on ICP",
    category: "Web3",
    date: "Drafting",
    readTime: "6 min read",
    desc: "An introduction to writing canisters, using actor models, and managing decentralized ledger state cycles on the Internet Computer Protocol.",
  },
  {
    title: "Real-time Event sync using Socket.io and Next.js",
    category: "Full Stack",
    date: "Drafting",
    readTime: "8 min read",
    desc: "Deep-dive into building real-time multi-user editors, handling socket disconnections, and syncing workspace document trees in React.",
  },
  {
    title: "Building modern APIs with Express.js and MySQL",
    category: "Backend",
    date: "Drafting",
    readTime: "5 min read",
    desc: "Writing performant REST endpoints, setting up query transactions, configuring index constraints, and structuring routes inside Express.js.",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-20 px-6 sm:px-12 max-w-6xl mx-auto space-y-16">
      {/* Title */}
      <div className="text-center space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Technical Blogs
        </h2>
        <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
        <p className="max-w-xl mx-auto text-xs sm:text-sm text-zinc-500 font-mono uppercase tracking-wider">
          future writings & developer logs
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {POSTS_DATA.map((post, index) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group flex flex-col justify-between p-6 bg-white dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850/50 hover:border-indigo-500/30 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 glassmorphism relative"
          >
            <div>
              {/* Category tag */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="inline-block px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/30 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                
                <span className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-zinc-850 dark:text-zinc-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors mb-2.5 leading-snug">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-550 dark:text-zinc-450 leading-relaxed line-clamp-3">
                {post.desc}
              </p>
            </div>

            {/* Read Time / Action row */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-900/60 mt-6 text-[10px] text-zinc-400 font-mono">
              <span>{post.readTime}</span>
              <span className="flex items-center gap-0.5 font-bold text-indigo-500 group-hover:translate-x-1 transition-transform">
                Read Draft <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
