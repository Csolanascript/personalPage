"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Star {
  x: number;
  y: number;
  bx: number; // Base x
  by: number; // Base y
  size: number;
  opacity: number;
  z: number; // Factor for parallax depth
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const starCount = Math.floor((canvas.width * canvas.height) / 8000);
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({
          x,
          y,
          bx: x,
          by: y,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          z: Math.random() * 0.5 + 0.5, // 0.5 to 1.0
        });
      }
      starsRef.current = stars;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      const { x: mx, y: my } = mouseRef.current;

      stars.forEach((star) => {
        // Repulsion logic
        const dx = mx - star.bx;
        const dy = my - star.by;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = 150; // Influence radius

        let targetX = star.bx;
        let targetY = star.by;

        if (distance < radius) {
          const force = (radius - distance) / radius;
          const angle = Math.atan2(dy, dx);
          // Push away from mouse
          targetX = star.bx - Math.cos(angle) * (force * 40 * star.z);
          targetY = star.by - Math.sin(angle) * (force * 40 * star.z);
        }

        // Smooth transition to target position using linear interpolation
        star.x += (targetX - star.x) * 0.08;
        star.y += (targetY - star.y) * 0.08;

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        // Aesthetic: Azure blue tint or pure white
        const isBlue = Math.random() > 0.8;
        ctx.fillStyle = isBlue 
          ? `rgba(0, 120, 212, ${star.opacity * 1.5})` 
          : `rgba(255, 255, 255, ${star.opacity})`;
        ctx.shadowBlur = star.size * 2;
        ctx.shadowColor = isBlue ? "#0078d4" : "white";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ background: "transparent" }}
    />
  );
}
