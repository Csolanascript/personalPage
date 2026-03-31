"use client";

import React, { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  bx: number; // Base x
  by: number; // Base y
  vx: number; // Constant velocity x
  vy: number; // Constant velocity y
  z: number; // depth factor (smaller z = more distant)
  spriteId: number; // 0: White Sm, 1: White Med, 2: Blue Med, 3: White Lg, 4: Blue Lg
  pulsePhase: number;
  pulseSpeed: number;
}

const STAR_TYPES = [
  { color: "#ffffff", size: 0.8, glowRange: 6, shadowColor: "rgba(255,255,255,0.4)" }, // 0: White Sm
  { color: "#ffffff", size: 1.4, glowRange: 10, shadowColor: "rgba(255,255,255,0.5)" }, // 1: White Med
  { color: "#0078d4", size: 1.2, glowRange: 12, shadowColor: "#0078d4" },             // 2: Blue Med
  { color: "#ffffff", size: 2.2, glowRange: 16, shadowColor: "rgba(255,255,255,0.6)" }, // 3: White Lg
  { color: "#0078d4", size: 1.8, glowRange: 18, shadowColor: "#0078d4" },             // 4: Blue Lg
];

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: no alpha on main canvas if not needed (actually we need alpha for transparent stars, but we can clear with black)
    if (!ctx) return;

    let animationFrameId: number;
    const sprites: { x: number, y: number, w: number, h: number }[] = [];

    const createSprites = () => {
      const sCanvas = document.createElement("canvas");
      sCanvas.width = 300; // Enough space for all sprites
      sCanvas.height = 100;
      const sCtx = sCanvas.getContext("2d");
      if (!sCtx) return;

      let currentX = 10;
      STAR_TYPES.forEach((type) => {
        const padding = type.glowRange + 5;
        const size = (type.size * 2) + (padding * 2);

        // Pre-render star with glow
        sCtx.save();
        sCtx.beginPath();
        sCtx.arc(currentX + padding + type.size, 50, type.size, 0, Math.PI * 2);
        sCtx.shadowBlur = type.glowRange;
        sCtx.shadowColor = type.shadowColor;
        sCtx.fillStyle = type.color;
        sCtx.fill();
        sCtx.restore();

        sprites.push({ x: currentX, y: 50 - padding, w: size, h: size });
        currentX += size + 10;
      });
      spriteCanvasRef.current = sCanvas;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      // MASSIVE VOLUME (2000 divisor) - now performant with sprites!
      const starCount = Math.floor((canvas.width * canvas.height) / 2000);
      const stars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const z = Math.random() * 0.8 + 0.2; // depth
        
        // Pick a sprite based on depth and randomness
        let spriteId = 0; // default White Sm
        if (Math.random() > 0.8) {
           spriteId = Math.random() > 0.6 ? 4 : 2; // Blue
        } else {
           spriteId = Math.random() > 0.7 ? 3 : (Math.random() > 0.4 ? 1 : 0); // White sizes
        }

        stars.push({
          x,
          y,
          bx: x,
          by: y,
          vx: (Math.random() - 0.5) * 0.08, 
          vy: (Math.random() - 0.5) * 0.08,
          z,
          spriteId,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.015,
        });
      }
      starsRef.current = stars;
    };

    const draw = () => {
      // Clear with solid black for performance boost (ctx will skip alpha compositing)
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const stars = starsRef.current;
      const { x: mx, y: my } = mouseRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const spriteCanvas = spriteCanvasRef.current;
      if (!spriteCanvas) return;

      stars.forEach((star) => {
        // 1. Drift
        star.bx += star.vx;
        star.by += star.vy;
        if (star.bx < 0) star.bx = w;
        if (star.bx > w) star.bx = 0;
        if (star.by < 0) star.by = h;
        if (star.by > h) star.by = 0;

        // 2. Base Pulse
        star.pulsePhase += star.pulseSpeed;
        const pulse = 0.85 + 0.15 * Math.sin(star.pulsePhase);

        // 3. Mouse Interaction (Repulsion + Proximity Illumination)
        const dx = mx - star.bx;
        const dy = my - star.by;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = 350; // Large flashlight radius

        let targetX = star.bx;
        let targetY = star.by;
        let proximityFactor = 0;

        if (distance < radius) {
          const factor = (radius - distance) / radius;
          const repulsionForce = factor * 80 * star.z;
          const angle = Math.atan2(dy, dx);
          
          targetX = star.bx - Math.cos(angle) * repulsionForce;
          targetY = star.by - Math.sin(angle) * repulsionForce;
          proximityFactor = factor;
        }

        // smooth transition to target position
        star.x += (targetX - star.x) * 0.1;
        star.y += (targetY - star.y) * 0.1;

        // 4. Render using Sprite
        const sprite = sprites[star.spriteId];
        const displayW = sprite.w * pulse * (1 + proximityFactor * 1.2);
        const displayH = sprite.h * pulse * (1 + proximityFactor * 1.2);
        
        ctx.globalAlpha = Math.min(1, (0.5 + proximityFactor) * pulse);
        
        // Fast drawImage call
        ctx.drawImage(
          spriteCanvas,
          sprite.x, sprite.y, sprite.w, sprite.h,
          star.x - displayW/2, star.y - displayH/2, displayW, displayH
        );
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    
    createSprites();
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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "#000000" }}
    />
  );
}
