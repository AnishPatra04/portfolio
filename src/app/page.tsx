import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import DsaJourney from "@/components/DsaJourney";
import GithubSection from "@/components/GithubSection";
import Achievements from "@/components/Achievements";
import FunZone from "@/components/FunZone";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Hero Section + Tech Orbit */}
      <Hero />

      {/* About Me Section with Timeline Roadmap */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40 bg-zinc-50/20 dark:bg-zinc-950/20">
        <About />
      </div>

      {/* Skills Group Grid Section */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40">
        <Skills />
      </div>

      {/* Projects Portfolio Section */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40 bg-zinc-50/20 dark:bg-zinc-950/20">
        <Projects />
      </div>

      {/* Certificates modal gallery */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40">
        <Certificates />
      </div>

      {/* DSA solving counters and progress tree */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40 bg-zinc-50/20 dark:bg-zinc-950/20">
        <DsaJourney />
      </div>

      {/* Pinned repos and matrix contributions graph */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40">
        <GithubSection />
      </div>

      {/* Awards & CGPA status grid */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40 bg-zinc-50/20 dark:bg-zinc-950/20">
        <Achievements />
      </div>

      {/* Interactive Mini games */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40">
        <FunZone />
      </div>

      {/* Recommendations testimonials */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40 bg-zinc-50/20 dark:bg-zinc-950/20">
        <Testimonials />
      </div>

      {/* Technical Blog writing placeholders */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40">
        <Blog />
      </div>

      {/* Contact information and form */}
      <div className="border-t border-zinc-100/50 dark:border-zinc-900/40 bg-zinc-50/20 dark:bg-zinc-950/20">
        <Contact />
      </div>

      {/* Footer quick links and rocket return */}
      <Footer />
    </div>
  );
}
