"use client";

import React, { useRef, useEffect } from "react";

interface FloatText {
  x: number;
  y: number;
  vx: number;
  vy: number;
  text: string;
  opacity: number;
  size: number;
}

const TECH_STRINGS = [
  "LAT: 41.6488", "LONG: -0.8891", "HEX: #FF0033", "V.2026.TEST", 
  "SOC_ACTIVE", "THREAT_FOUND", "AZ_104", "SYS_RESILIENT", "STIX_2.1",
  "01011001", "00110101", "TCP_IP_EST", "IOC_INDEX", "DOCKER_RUN",
  "0x7FFD3", "0x004F", "404_NOT_FOUND", "200_OK"
];

export default function Atmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<FloatText[]>([]);

  useEffect(() => {
    const count = 15;
    const items: FloatText[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        text: TECH_STRINGS[Math.floor(Math.random() * TECH_STRINGS.length)],
        opacity: Math.random() * 0.15 + 0.05,
        size: Math.random() * 4 + 8
      });
    }
    itemsRef.current = items;

    let animationFrameId: number;
    const animate = () => {
      items.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;

        if (item.x < -100) item.x = window.innerWidth + 100;
        if (item.x > window.innerWidth + 100) item.x = -100;
        if (item.y < -100) item.y = window.innerHeight + 100;
        if (item.y > window.innerHeight + 100) item.y = -100;
      });
      
      // We'll update via refs and direct DOM for max performance
      if (containerRef.current) {
        const children = containerRef.current.children;
        for (let i = 0; i < children.length; i++) {
          const el = children[i] as HTMLElement;
          const item = items[i];
          el.style.transform = `translate(${item.x}px, ${item.y}px)`;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <span 
          key={i} 
          className="absolute font-mono tech-label whitespace-nowrap"
          style={{ 
            opacity: 0.1, // Initial opacity
            fontSize: '9px',
            willChange: 'transform'
          }}
        >
          {TECH_STRINGS[i % TECH_STRINGS.length]}
        </span>
      ))}
    </div>
  );
}
