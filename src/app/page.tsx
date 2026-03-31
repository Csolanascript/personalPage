"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  ExternalLink,
  Shield,
  Cloud,
  Terminal,
  Activity,
  Box,
  Monitor,
  Menu,
} from "lucide-react";

import SmoothScroll from "@/components/SmoothScroll";
import StarBackground from "@/components/StarBackground";
import HorizontalWork from "@/components/HorizontalWork";
import Atmosphere from "@/components/Atmosphere";
import WarpBackground from "@/components/WarpBackground";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
 ───────────────────────────────────────────────────────────────────────────── */

function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="tech-label border border-white/20 hover:border-brand/50 hover:text-brand transition-colors duration-300">
      {children}
    </span>
  );
}

function Marquee({ text, direction = 1 }: { text: string; direction?: 1 | -1 }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    gsap.to(marquee, {
      xPercent: -50 * direction,
      repeat: -1,
      duration: 30,
      ease: "none",
    });
  }, { scope: marqueeRef });

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-white/10 py-6 bg-black select-none z-10 relative">
      <div ref={marqueeRef} className="inline-block">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="font-syne font-black text-4xl lg:text-6xl uppercase tracking-tighter mx-4 opacity-10">
            {text} <span className="text-brand">/</span>{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

function SplitText({ text, className = "", id = "" }: { text: string; className?: string; id?: string; }) {
    return (
      <span id={id} className={`inline-block overflow-hidden ${className}`}>
        {text.split("").map((char, i) => (
          <span key={i} className="char inline-block translate-y-[105%]">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Page
 ───────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    // Check session storage for "first visit" wow effect
    const visited = sessionStorage.getItem("portfolio_visited");
    if (!visited) {
      setHasEntered(true);
      sessionStorage.setItem("portfolio_visited", "true");
    } else {
        // We still play the animation but maybe faster
        setHasEntered(true);
    }
  }, []);

  useGSAP(() => {
    if (!hasEntered) return;

    // 1. One-time "Deploy" Animation
    const deployTl = gsap.timeline({ defaults: { ease: "expo.out" } });
    deployTl
      .to(".hero-main-title .char", { 
        y: "0%", 
        duration: 1.8, 
        stagger: 0.02,
        delay: 0.5
      })
      .from(".nav-box", { opacity: 0, y: -20, stagger: 0.1, duration: 1 }, "-=1.2")
      .from(".hero-sub-details", { opacity: 0, x: -30, duration: 1.2 }, "-=1")
      .from(".qr-placeholder", { scale: 0, opacity: 0, duration: 1, ease: "back.out(1.7)" }, "-=0.8");

    // 2. Section Reveals
    gsap.utils.toArray(".reveal-section").forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    // 3. Hover Distortion on Hero Letters
    const chars = document.querySelectorAll(".hero-main-title .char");
    chars.forEach(char => {
        char.addEventListener("mouseenter", () => {
            gsap.to(char, { scaleY: 1.4, color: "#ff0033", duration: 0.3 });
        });
        char.addEventListener("mouseleave", () => {
            gsap.to(char, { scaleY: 1, color: "white", duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
    });

  }, { scope: containerRef, dependencies: [hasEntered] });

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
        
        <StarBackground />
        <Atmosphere />
        <WarpBackground />

        {/* ── TOP NAV (Wodniack Screenshot Style) ─────────────────────── */}
        <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10 flex items-stretch h-20 lg:h-24 bg-black/80 backdrop-blur-md">
          {/* Logo Box */}
          <div className="nav-box flex-shrink-0 border-r border-white/10 px-6 lg:px-10 flex items-center justify-center">
             <span className="font-syne font-black text-3xl lg:text-4xl tracking-tighter">CS</span>
          </div>

          {/* Center Space / Subtext */}
          <div className="nav-box flex-grow flex items-center px-6 hidden md:flex">
             <span className="tech-label opacity-30 text-[8px] animate-pulse">VAULT_V.2.0.2.6_SYSTEM_ACTIVE</span>
          </div>

          {/* Links Boxes */}
          <nav className="flex items-stretch">
            {["ABOUT", "WORK", "CONTACT"].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="nav-box border-l border-white/10 px-6 lg:px-12 flex items-center justify-center font-syne font-bold text-[10px] lg:text-xs tracking-widest hover:bg-brand transition-colors cursor-pointer"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Hire / Dark-Mode / Social Boxes */}
          <div className="flex items-stretch">
            <div className="nav-box border-l border-white/10 px-4 flex items-center justify-center hidden sm:flex">
                <Box className="w-5 h-5 opacity-40" />
            </div>
            <div className="nav-box border-l border-white/10 px-4 flex items-center justify-center hidden sm:flex">
                <Linkedin className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity" />
            </div>
            <div className="nav-box border-l border-white/10 px-6 lg:px-10 flex flex-col items-center justify-center bg-brand/5">
                <span className="tech-label text-[8px] mb-1">AVAILABLE</span>
                <span className="font-syne font-bold text-[10px] text-brand">HIRE ME</span>
            </div>
            {/* QR Placeholder Like Screenshot */}
            <div className="nav-box qr-placeholder border-l border-white/10 px-4 hidden lg:flex items-center justify-center">
                 <div className="w-12 h-12 border-2 border-white/20 p-1 opacity-40">
                    <div className="w-full h-full bg-white/20" />
                 </div>
            </div>
          </div>
        </header>

        {/* ── HERO SECTION (Unboxed Atmosphere) ─────────────────────────── */}
        <section id="home" className="min-h-screen flex flex-col justify-end px-[5vw] pb-[10vh] pt-32 overflow-hidden relative">
          <div className="absolute top-1/4 left-[5vw] hero-sub-details hidden lg:block opacity-40">
              <span className="tech-label block mb-2 tracking-[0.4em]">SYSTEM ENGINEER</span>
              <span className="tech-label block mb-2 tracking-[0.4em]">SOC ANALYST</span>
              <span className="tech-label block tracking-[0.4em]">CLOUD ARCHITECT</span>
          </div>

          <div className="relative z-10 w-full">
            <h1 className="hero-main-title headline-huge leading-[0.8] mb-12 select-none group">
              <SplitText text="CARLOS" /><br/>
              <span className="flex items-center gap-4">
                 <div className="w-16 h-1 w-brand hidden lg:block animate-pulse" />
                 <SplitText text="SOLANA" className="text-brand" />
              </span>
            </h1>
            
            <div className="hero-sub-details grid grid-cols-1 lg:grid-cols-2 gap-12 items-end border-t border-white/10 pt-12">
               <div>
                 <p className="text-xl lg:text-4xl font-syne font-light leading-tight max-w-3xl">
                    Forging <span className="text-brand font-bold italic underline">Digital Fortresses</span> with automated defense and architectural precision.
                 </p>
                 <div className="flex flex-wrap gap-4 mt-8">
                    <TechTag>SOC SPECIALIST</TechTag>
                    <TechTag>AZURE CLOUD</TechTag>
                    <TechTag>TERRAFORM IaC</TechTag>
                 </div>
               </div>
               
               <div className="flex flex-col lg:items-end gap-6 h-full justify-between">
                  <div className="text-right hidden lg:block">
                      <p className="tech-label text-[10px] opacity-40 max-w-sm ml-auto">
                        BASED IN ZARAGOZA / SPAIN. WORKING GLOBALLY. SPECIALISING IN THREAT INTELLIGENCE AND CLOUD INFRASTRUCTURE.
                      </p>
                  </div>
                  <div className="flex gap-4">
                    <a href="https://github.com/Csolanascript" target="_blank" className="p-6 border border-white/10 hover:bg-brand transition-all">
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="mailto:contact@csolana.dev" className="p-6 border border-white/10 hover:bg-brand transition-all">
                        <Mail className="w-6 h-6" />
                    </a>
                    <a href="#" className="p-6 border border-white/10 hover:bg-brand transition-all">
                        <Monitor className="w-6 h-6" />
                    </a>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <Marquee text="THREAT INTEL / OPENCTI / INTEL OWL / AZURE / SOC" />

        {/* ── ABOUT SECTION ────────────────────────────────────────────────── */}
        <section id="about" className="py-[15vh] lg:py-[20vh] px-[5vw] grid grid-cols-1 lg:grid-cols-2 gap-20 bg-black relative z-10 border-b border-white/5">
          <div className="reveal-section">
            <span className="tech-label text-brand font-bold">PROFILE // 00</span>
            <h2 className="font-syne text-6xl lg:text-8xl font-black uppercase mt-4 mb-10 leading-[0.85]">Hybrid<br/><span className="italic">Systems.</span></h2>
            <div className="space-y-6 text-[#9ca3af] text-lg lg:text-xl leading-relaxed max-w-xl">
              <p>
                Bridging the gap between <span className="text-white">Cloud Architecture</span> and <span className="text-white">Active Defense</span>. Studying Information Systems at Universidad de Zaragoza.
              </p>
              <p>
                Specialising in Threat Intelligence automation during my internship at <span className="text-brand font-bold">Nologin Consulting</span>.
              </p>
            </div>
          </div>

          <div className="reveal-section grid-border-heavy p-10 flex flex-col justify-between bg-black/50">
             <div className="flex justify-between items-start">
                 <Shield className="w-12 h-12 text-brand" />
                 <span className="tech-label opacity-30 tracking-[0.3em]">CERTIFICATIONS</span>
             </div>
             <div className="space-y-8 mt-12">
                {[
                  { title: "Microsoft Azure", meta: "AZ-104 Administrator", status: "Ongoing" },
                  { title: "Computer Engineering", meta: "4th Year Student", status: "Active" },
                  { title: "Threat Intel", meta: "Skyfall CTI Platform", status: "TFG" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                    <div>
                        <span className="font-syne font-bold uppercase text-2xl lg:text-3xl block hover:text-brand transition-colors cursor-default">{item.title}</span>
                        <span className="tech-label opacity-40 lowercase tracking-normal pl-0">{item.meta}</span>
                    </div>
                    <span className="tech-label border border-brand text-brand">{item.status}</span>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* ── WORK SECTION (Fixed Mobile Clipping) ─────────────────────────── */}
        <div id="work" className="relative z-10 overflow-visible">
          <HorizontalWork />
        </div>

        {/* ── SKILLS SECTION ───────────────────────────────────────────────── */}
        <section id="skills" className="py-[15vh] px-[5vw] bg-black bg-opacity-90 backdrop-blur-xl relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="tech-label text-brand font-bold">CAPABILITIES // 02</span>
              <h2 className="headline-huge mt-4 text-[12vw] lg:text-9xl leading-[0.8]"><span className="italic">Tech</span><br/><span className="text-brand">Domain.</span></h2>
            </div>
            <div className="lg:text-right max-w-sm">
                <p className="text-[#6b7280] font-mono text-[9px] uppercase tracking-[0.3em] leading-loose">
                    DEPLOYING SCALABLE INFRASTRUCTURE. AUTOMATING SECURITY MONITORING. MANAGING FULL-STACK RESILIENCE.
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
            {[
              { title: "Cloud Systems", skills: ["Azure VMs", "ERP Hosting", "Blob Storage", "Terraform Config"] },
              { title: "Cybersecurity", skills: ["SOC Automation", "TI Platforms", "EDR / SIEM", "Incident Detection"] },
              { title: "DevOps / Infra", skills: ["n8n Workflows", "Docker", "Kubernetes", "Linux Hardening"] },
              { title: "Languages", skills: ["Python Scripts", "TypeScript / JS", "C++ Systems", "Go Backend"] },
            ].map((cat, i) => (
              <div key={i} className="bg-black p-12 reveal-section hover:bg-brand/5 transition-colors group">
                <h3 className="font-syne font-bold uppercase text-xl mb-8 flex items-center gap-3">
                  <Box className="w-5 h-5 text-brand" /> {cat.title}
                </h3>
                <ul className="space-y-4">
                  {cat.skills.map(s => (
                    <li key={s} className="flex items-center gap-3 group/li hover:translate-x-2 transition-transform">
                      <div className="w-1 h-1 bg-brand opacity-0 group-hover/li:opacity-100" />
                      <span className="text-sm font-mono text-[#6b7280] group-hover/li:text-white transition-colors">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER (Screenshot Style) ─────────────────────────────────── */}
        <footer id="contact" className="py-[15vh] px-[5vw] border-t border-white/10 bg-black relative z-10 overflow-hidden">
          <div className="flex flex-col items-center text-center">
             <h2 className="headline-huge text-[15vw] lg:text-[18rem] leading-[0.7] mb-12 italic opacity-10">CONTACT</h2>
             <a href="mailto:contact@csolana.dev" className="font-syne font-black text-3xl lg:text-7xl uppercase hover:text-brand transition-all duration-300 -mt-[10vw]">
                hire@csolana.dev
             </a>
             
             <div className="mt-20 flex gap-8">
                <a href="#" className="p-8 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                  <Linkedin className="w-10 h-10" />
                </a>
                <a href="#" className="p-8 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all">
                   <Github className="w-10 h-10" />
                </a>
             </div>
          </div>
          
          <div className="mt-32 pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4 opacity-30 uppercase font-mono text-[8px] tracking-[0.4em]">
            <p>© 2026 CARLOS SOLANA — B.ENG COMPUTER SCIENCE</p>
            <p>DESIGNED FOR AGENTIC PERFORMANCE / GSAP / NEXT.JS</p>
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}
