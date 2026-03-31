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
  "LAT: 41.6488", "LONG: -0.8891", "HEX: #FF0033", "V.2026.REFINED", 
  "SOC_ACTIVE", "THREAT_FOUND", "AZ_104", "SYS_RESILIENT", "STIX_2.1",
  "01011001", "00110101", "TCP_IP_EST", "IOC_INDEX", "DOCKER_RUN",
  "0x7FFD3", "0x004F", "404_NOT_FOUND", "200_OK", "OPENCTI_SESS", "INTELOWL_V3",
  "MALWARE_ANALYSIS", "CLOUD_INFRA", "TERRAFORM_INIT", "DEPLOY_STABLE",
  "K8S_POD", "NET_TRAFFIC", "ENCRYPT_AES"
];

export default function Atmosphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<FloatText[]>([]);

  useEffect(() => {
    const count = 35; // Increased density
    const items: FloatText[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4, // Faster drift
        vy: (Math.random() - 0.5) * 0.4,
        text: TECH_STRINGS[Math.floor(Math.random() * TECH_STRINGS.length)],
        opacity: Math.random() * 0.08 + 0.02, // Lower opacity but more items
        size: Math.random() * 3 + 7
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
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {[...Array(35)].map((_, i) => (
        <span 
          key={i} 
          className="absolute font-mono tech-label whitespace-nowrap opacity-[0.05] filter blur-[0.3px]"
          style={{ 
            fontSize: '7px',
            willChange: 'transform',
            color: Math.random() > 0.8 ? '#ff0033' : 'white' // Occasional red strings
          }}
        >
          {TECH_STRINGS[i % TECH_STRINGS.length]}
        </span>
      ))}
    </div>
  );
}
