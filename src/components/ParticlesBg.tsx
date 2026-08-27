"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
}

export default function ParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000, radius: 120 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Particle network styling based on theme
      const isDark = theme === "dark";
      const particleColor = isDark ? "rgba(129, 140, 248, " : "rgba(79, 70, 229, "; // Indigo-400 / Indigo-600
      const lineColor = isDark ? "rgba(99, 102, 241, " : "rgba(99, 102, 241, ";

      particles.forEach((p, idx) => {
        // Update velocity based on mouse interaction
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Repel slightly
          p.vx -= (dx / dist) * force * 0.03;
          p.vy -= (dy / dist) * force * 0.03;
        }

        // Apply friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Cap speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = 1.2;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Move particle
        p.x += p.vx + (p.vx === 0 ? (Math.random() - 0.5) * 0.1 : 0);
        p.y += p.vy + (p.vy === 0 ? (Math.random() - 0.5) * 0.1 : 0);

        // Boundary bounce
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}${p.alpha})`;
        ctx.fill();

        // Connect with other close particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist2 < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (110 - dist2) / 110 * 0.15;
            ctx.strokeStyle = `${lineColor}${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "normal" }}
    />
  );
}
