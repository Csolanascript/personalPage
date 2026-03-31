"use client";

import React, { useRef, useEffect } from "react";
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
} from "lucide-react";

import SmoothScroll from "@/components/SmoothScroll";
import StarBackground from "@/components/StarBackground";
import HorizontalWork from "@/components/HorizontalWork";

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
          <span key={i} className="font-syne font-black text-6xl uppercase tracking-tighter mx-4 opacity-10">
            {text} <span className="text-brand">/</span>{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

/** 
 * SplitText: A helper to animate characters separately
 */
function SplitText({ text, className = "" }: { text: string; className?: string }) {
    return (
      <span className={`inline-block overflow-hidden ${className}`}>
        {text.split("").map((char, i) => (
          <span key={i} className="char inline-block translate-y-[102%]">
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
  const heroCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero Reveal (Character by Character)
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    heroTl
      .to(".hero-main-title .char", { 
        y: "0%", 
        duration: 1.4, 
        stagger: 0.03, 
        delay: 0.2 
      })
      .from(".hero-bento-label", { opacity: 0, x: -10, duration: 0.8 }, "-=1")
      .from(".hero-details", { opacity: 0, y: 20, duration: 1 }, "-=0.8")
      .from(".hero-badge", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");

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

    // 3. Magnetic Hero Card Effect
    const card = heroCardRef.current;
    if (card) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(card, {
          rotateX: y * -4,
          rotateY: x * 4,
          x: x * 10,
          y: y * 10,
          duration: 0.6,
          ease: "power2.out",
        });
      };
      
      const handleMouseLeave = () => {
        gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

  }, { scope: containerRef });

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white">
        
        <StarBackground />

        {/* ── HEADER NAVIGATION ────────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 w-full z-50 px-[5vw] py-8 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col pointer-events-auto">
            <span className="font-syne font-black text-2xl tracking-tighter hover:text-brand transition-colors cursor-pointer">CS</span>
            <span className="tech-label opacity-30">REFINEMENT.V2</span>
          </div>
          
          <div className="flex gap-8 items-start pointer-events-auto">
            <div className="hidden lg:flex flex-col gap-1 items-end">
                <span className="tech-label">SYST. STATUS</span>
                <span className="text-[10px] font-mono text-brand">ONLINE / ACTIVE</span>
            </div>
            <ul className="flex flex-col items-end gap-1">
              {["About", "Work", "Contact"].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="font-syne font-bold uppercase text-xs tracking-widest hover:text-brand transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ── HERO (Bento-style Magnetic Card) ────────────────────────────── */}
        <section id="home" className="min-h-screen flex items-center justify-center px-[5vw] pt-20 pb-10 overflow-hidden">
          <div 
            ref={heroCardRef}
            className="hero-card w-full lg:max-w-7xl relative grid-border-heavy p-8 lg:p-16 overflow-hidden flex flex-col justify-end min-h-[70vh]"
            style={{ 
              background: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(255,0,51,0.05))",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Inner Grid Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            
            <div className="relative z-10">
              <div className="hero-bento-label flex items-center gap-2 mb-6">
                 <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                 <span className="tech-label text-brand tracking-widest font-bold">COMPUTER ENGINEERING STUDENT</span>
              </div>
              
              <h1 className="hero-main-title headline-huge mb-10 text-[12vw] lg:text-9xl">
                <SplitText text="Carlos" /><br/>
                <SplitText text="Solana" className="text-brand" />
              </h1>
              
              <div className="hero-details grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                <div>
                  <p className="text-lg lg:text-3xl font-syne font-light leading-tight max-w-2xl text-[#9ca3af]">
                    Architecting <span className="text-brand font-bold">Resilient Systems</span> & Cloud Infrastructure at Universidad de Zaragoza.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-8">
                    <TechTag>AZ-104 SPECIALIST</TechTag>
                    <TechTag>SOC AUTOMATION</TechTag>
                    <TechTag>THREAT INTEL</TechTag>
                  </div>
                </div>
                
                <div className="flex flex-col lg:items-end gap-6 h-full justify-between">
                  {/* Badge */}
                  <div className="hero-badge p-6 border border-white/10 hidden sm:flex flex-col items-center gap-2 bg-gradient-to-br from-black to-[#ff0033]/10">
                      <Shield className="w-8 h-8 text-brand" />
                      <span className="font-syne font-bold uppercase text-xl">Cyber-Pro</span>
                      <span className="tech-label opacity-40 italic mt-0.5 text-[8px]">est. 2022</span>
                  </div>

                  <div className="flex gap-4">
                    {[
                      { icon: <Github className="w-5 h-5"/>, link: "https://github.com/Csolanascript" },
                      { icon: <Linkedin className="w-5 h-5"/>, link: "https://www.linkedin.com/in/" },
                      { icon: <Mail className="w-5 h-5"/>, link: "mailto:contact@csolana.dev" }
                    ].map((social, i) => (
                      <a key={i} href={social.link} className="p-4 border border-white/10 hover:bg-brand hover:border-brand transition-all duration-400">
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Marquee text="SYSTEMS / CLOUD / SECURITY" />

        {/* ── ABOUT SECTION (Responsive Hybrid) ───────────────────────────────── */}
        <section id="about" className="py-[15vh] lg:py-[20vh] px-[5vw] grid grid-cols-1 lg:grid-cols-2 gap-16 bg-black relative z-10">
          <div className="reveal-section flex flex-col justify-center">
            <span className="tech-label text-brand font-bold opacity-100">PROFILE // 00</span>
            <h2 className="font-syne text-5xl lg:text-7xl font-black uppercase mt-4 mb-10 leading-[0.9]">Hybrid<br/>Technical<br/>Resilience.</h2>
            <div className="space-y-6 text-[#9ca3af] text-lg lg:text-xl leading-relaxed">
              <p>
                I collaborate with high-performance teams to build secure landscapes, bridging the gap between <span className="text-white">Cloud Architecture</span> and <span className="text-white">Security Operations</span>.
              </p>
              <p>
                Based in Spain, my work focuses on deep security research and infrastructure automation at <span className="text-brand">Nologin Consulting</span>.
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4">
                <div className="p-8 border border-white/5 flex flex-col gap-2 flex-1 min-w-[200px] hover:border-brand transition-colors">
                    <Monitor className="w-10 h-10 text-brand" />
                    <span className="font-syne font-black text-2xl uppercase">SOC Ready</span>
                    <p className="text-xs text-[#6b7280]">Real-world automation experience in security stacks.</p>
                </div>
                <div className="p-8 border border-white/5 flex flex-col gap-2 flex-1 min-w-[200px] hover:border-brand transition-colors">
                    <Cloud className="w-10 h-10 text-brand" />
                    <span className="font-syne font-black text-2xl uppercase">Azure Pro</span>
                    <p className="text-xs text-[#6b7280]">Advanced AZ-104 management and Terraform IaC.</p>
                </div>
            </div>
          </div>

          <div className="reveal-section grid-border-heavy p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-b from-[#0a0a0a] to-black">
            <div className="flex justify-between items-start">
                <Activity className="w-10 h-10 text-brand" />
                <span className="tech-label opacity-30">EDUCATION & RECOGNITION</span>
            </div>
            <div className="space-y-6">
              {[
                  { title: "Azure AZ-104", label: "Specialist", tag: "Ongoing" },
                  { title: "Universidad Zaragoza", label: "Computer Eng.", tag: "4th Year" },
                  { title: "Nologin Consulting", label: "Security Analyst", tag: "Internship" }
              ].map((item, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-default">
                    <div>
                        <span className="font-syne font-bold uppercase text-2xl lg:text-3xl block group-hover:text-brand transition-colors">{item.title}</span>
                        <span className="tech-label opacity-40 px-0 lowercase tracking-normal">{item.label}</span>
                    </div>
                    <span className="tech-label border border-white/20 text-brand group-hover:border-brand transition-all">{item.tag}</span>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RESPONSIVE WORK SECTION ───────────────────────────────────────── */}
        <div id="work">
          <HorizontalWork />
        </div>

        {/* ── SKILLS GRID SECTION ────────────────────────────────────────────── */}
        <section id="skills" className="py-[15vh] px-[5vw] bg-black bg-opacity-70 backdrop-blur-2xl relative z-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="tech-label text-brand font-bold opacity-100">CAPABILITIES // 02</span>
              <h2 className="headline-huge mt-4 text-6xl lg:text-9xl">Technical<br/><span className="text-brand">Domain</span></h2>
            </div>
            <div className="lg:text-right max-w-sm">
                <p className="text-[#6b7280] font-mono text-[10px] uppercase tracking-[0.2em] leading-loose">
                    Deploying architectures. Analyzing threats. Automating defense.
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5 border border-white/5">
            {[
              { title: "Cloud Systems", skills: ["Azure VMs", "ERP Hosting", "Blob Storage", "Terraform Config"] },
              { title: "SOC & Defense", skills: ["Health Check Automation", "IOC Discovery", "SIEM Management", "Vulnerability IDs"] },
              { title: "DevOps / Infra", skills: ["n8n Workflows", "Docker Containers", "Kubernetes", "Linux Hardening"] },
              { title: "Core Languages", skills: ["Python Scripts", "TypeScript", "C++ Systems", "Go Backend"] },
            ].map((cat, i) => (
              <div key={i} className="bg-black p-10 reveal-section active:bg-white/5 transition-colors group">
                <h3 className="font-syne font-bold uppercase text-xl mb-8 flex items-center gap-3">
                  <Box className="w-5 h-5 text-brand group-hover:scale-110 transition-transform" /> {cat.title}
                </h3>
                <ul className="space-y-4">
                  {cat.skills.map(s => (
                    <li key={s} className="flex items-center gap-3 group/li translate-x-0 hover:translate-x-2 transition-all">
                      <div className="w-1 h-1 bg-brand opacity-0 group-hover/li:opacity-100 transition-opacity" />
                      <span className="text-sm font-mono text-[#6b7280] group-hover/li:text-white transition-colors">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER (High Impact) ─────────────────────────────────────────── */}
        <footer id="contact" className="py-[15vh] px-[5vw] border-t border-white/5 bg-black relative z-10 overflow-hidden">
          <div className="flex flex-col items-center text-center relative z-10">
             <span className="tech-label mb-6 text-brand font-bold opacity-100">CONTACT // 03</span>
             <h2 className="headline-huge text-[12vw] lg:text-[10rem] mb-12">Connect<span className="text-brand">.</span></h2>
             
             <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center justify-center">
                <a href="mailto:contact@csolana.dev" className="font-syne font-black text-2xl lg:text-5xl uppercase hover:text-brand transition-all duration-300">
                    hire@csolana.dev
                </a>
                <div className="flex gap-4">
                  <a href="#" className="p-10 border border-white/5 group hover:bg-brand hover:border-brand transition-all duration-500 rounded-full">
                    <Linkedin className="w-10 h-10 group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="#" className="p-10 border border-white/5 group hover:bg-brand hover:border-brand transition-all duration-500 rounded-full">
                    <Github className="w-10 h-10 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
             </div>
          </div>
          
          <div className="mt-[20vh] pt-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-4 opacity-20 uppercase font-mono text-[9px] tracking-widest text-center lg:text-left">
            <p>© 2026 CARLOS SOLANA — B.ENG COMPUTER SCIENCE</p>
            <p>DESIGNED FOR HIGH PERFORMANCE / GSAP / NEXT.JS</p>
          </div>
        </footer>

      </div>
    </SmoothScroll>
  );
}
