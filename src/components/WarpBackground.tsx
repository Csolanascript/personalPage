"use client";

import React, { useRef, useEffect } from "react";

export default function WarpBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const lines = 40;
      const step = canvas.height / lines;
      
      ctx.strokeStyle = "rgba(255, 0, 51, 0.15)"; // Wodniack Red at low opacity
      ctx.lineWidth = 1;

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        const y = i * step;
        
        ctx.moveTo(0, y);
        
        for (let x = 0; x <= canvas.width; x += 20) {
          // Complex wavy distortion
          const distortion = Math.sin(x * 0.002 + time) * Math.cos(y * 0.002 + time) * 50;
          const secondary = Math.sin(x * 0.005 - time * 2) * 20;
          ctx.lineTo(x, y + distortion + secondary);
        }
        
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-40 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
