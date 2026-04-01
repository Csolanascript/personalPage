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
  Shield, 
  Cloud, 
  Terminal, 
  Activity, 
  Monitor, 
  Menu,
  X,
  Sparkles,
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
    <span className="tech-label border border-white/10 hover:border-brand/40 hover:text-brand transition-colors duration-300 px-3 py-1 text-[10px] sm:text-xs">
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
    <div className="overflow-hidden whitespace-nowrap border-y border-white/5 py-4 lg:py-6 bg-black select-none z-10 relative">
      <div ref={marqueeRef} className="inline-block">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="font-syne font-black text-3xl lg:text-5xl uppercase tracking-tighter mx-4 opacity-10">
            {text} <span className="text-brand">/</span>{" "}
          </span>
        ))}
      </div>
    </div>
  );
}

function SplitText({ text, className = "", id = "" }: { text: string; className?: string; id?: string; }) {
    return (
      <span id={id} className={`inline-block split-parent whitespace-nowrap ${className}`}>
        {text.split("").map((char, i) => (
          <span key={i} className="char inline-block translate-y-[110%] opacity-0 blur-md lg:hover:scale-125 lg:hover:text-brand lg:hover:-translate-y-2 lg:hover:drop-shadow-[0_0_15px_rgba(var(--brand-rgb),0.5)] transition-all duration-300 cursor-default py-1">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
}

function NumericTicker({ text = "111000100100000101001 /////////// 101000010011110 /////////// 10110100100000", className = "" }) {
    return (
        <div className={`w-full overflow-hidden border-y border-black bg-brand py-1 flex grayscale font-mono text-[7px] tracking-widest uppercase opacity-90 ${className}`}>
            <div className="whitespace-nowrap animate-infinite-scroll flex gap-20 items-center">
                <span>{text}</span>
                <span>{text}</span>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Page
 ───────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setHasEntered(true);
  }, []);

  useGSAP(() => {
    if (!hasEntered) return;

    const mm = gsap.matchMedia();

    // ─────────────────────────────────────────────────────────────
    // Desktop Design
    // ─────────────────────────────────────────────────────────────
    mm.add("(min-width: 1024px)", () => {
      document.documentElement.style.setProperty("--brand-color", "#0078d4");
      document.documentElement.style.setProperty("--brand-rgb", "0, 120, 212");

      const deployTl = gsap.timeline({ defaults: { ease: "expo.out" } });
      deployTl
        .to(".hero-main-title .char", { 
          y: "0%", 
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2, 
          stagger: 0.02, // Very fast wave, almost unified
          delay: 0.5
        })
        .from(".hero-sub-details", { 
          opacity: 0, 
          y: 20, 
          duration: 1.2 
        }, "-=0.8");
    });

    // ─────────────────────────────────────────────────────────────
    // Mobile Design
    // ─────────────────────────────────────────────────────────────
    mm.add("(max-width: 1023px)", () => {
      document.documentElement.style.setProperty("--brand-color", "#ff0033");
      document.documentElement.style.setProperty("--brand-rgb", "255, 0, 51");

      const deployTl = gsap.timeline({ 
        defaults: { ease: "power4.out", force3D: true }
      });
      deployTl
        .to(".hero-main-title .char", { 
          y: "0%", 
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.015,
          delay: 0.2
        })
        .from(".ticker-bar", { scaleX: 0, duration: 0.8, ease: "expo.inOut" }, "-=0.4");
    });

    // Shared Section Reveals
    gsap.utils.toArray(".reveal-section").forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    });

  }, { scope: containerRef, dependencies: [hasEntered] });

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative min-h-screen bg-black text-white font-sans selection:bg-brand selection:text-white overflow-x-hidden">
        
        <StarBackground />
        <Atmosphere />
        
        <div className="fixed inset-0 lg:opacity-40 transition-colors duration-1000">
             <WarpBackground />
        </div>

        {/* ── TOP NAV ─────────────────────── */}
        <header className="fixed top-0 left-0 w-full z-50 flex items-stretch h-12 lg:h-16 bg-brand lg:bg-black/50 lg:backdrop-blur-xl border-b border-black lg:border-white/10 transition-all">
          <div className="flex-shrink-0 border-r border-black lg:border-white/10 px-4 lg:px-8 flex items-center justify-center">
             <span className="font-syne font-black text-xl lg:text-2xl text-black lg:text-white tracking-tighter">CS</span>
          </div>

          <div className="flex-grow flex items-stretch">
              <nav className="flex items-stretch overflow-x-auto no-scrollbar" aria-label="Main Navigation">
                {["ABOUT", "WORK", "CONTACT"].map((link) => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase()}`}
                    className="px-4 lg:px-8 flex items-center justify-center font-syne font-bold text-[9px] lg:text-xs tracking-[0.3em] text-black lg:text-white lg:hover:text-brand transition-colors whitespace-nowrap border-r border-black lg:border-white/10"
                  >
                    {link}
                  </a>
                ))}
              </nav>
          </div>

          <div className="flex items-stretch flex-shrink-0">
            <button 
                className="lg:hidden border-l border-black px-4 flex items-center justify-center text-black active:scale-95 transition-transform" 
                aria-label="Toggle Menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <a href="mailto:carlossolanamelero@gmail.com" className="hidden lg:flex px-8 items-center justify-center bg-brand text-black font-syne font-black text-xs gap-3 cursor-pointer hover:bg-white transition-colors" aria-label="Hire Carlos Solana">
                <span>HIRE ME</span>
                <ChevronRight size={14} />
            </a>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-40 bg-brand lg:hidden transition-all duration-500 ease-expo ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
                {["ABOUT", "WORK", "CONTACT"].map((link) => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-syne font-black text-5xl text-black tracking-tighter uppercase whitespace-nowrap"
                  >
                    {link}
                  </a>
                ))}
            </div>
        </div>

        {/* ── HERO SECTION ─────────────────────────── */}
        <section id="home" className="min-h-[100svh] flex flex-col pt-12 lg:pt-0 lg:justify-center relative overflow-hidden">
          
          <div className="flex-grow flex flex-col justify-center max-w-full">
              <h1 className="sr-only">Carlos Solana - Sistemas y Ciberseguridad</h1>

              {/* Mobile Setup */}
              <div className="lg:hidden flex flex-col justify-center flex-grow p-4" aria-hidden="true">
                  <NumericTicker className="ticker-bar mb-6" />
                  <div className="bg-brand p-8 transition-colors duration-500">
                     <div className="hero-main-title text-[clamp(1.5rem,8.5vw,3.5rem)] font-syne font-black uppercase leading-[0.8] tracking-tighter text-black flex flex-col items-center text-center gap-1">
                        <div className="whitespace-nowrap"><SplitText text="CARLOS" /></div>
                        <div className="whitespace-nowrap"><SplitText text="SOLANA" /></div>
                     </div>
                  </div>
                  <NumericTicker className="ticker-bar mt-6 bg-brand text-black" text="VAULT_V.2.0.2.6 // AZURE_SEC // THREAT_INTEL" />
              </div>

              {/* Desktop Setup */}
              <div className="hidden lg:block w-full max-w-[1600px] mx-auto px-[8vw]" aria-hidden="true">
                  <div className="hero-main-title text-[clamp(4rem,9vw,10.5rem)] font-syne font-black uppercase leading-[0.8] tracking-tighter">
                     <div className="overflow-visible"><SplitText text="CARLOS" /></div>
                     <div className="flex items-center gap-12">
                        <SplitText text="SOLANA" className="text-brand" />
                        <div className="flex-grow h-[1px] bg-white/10" />
                        <ArrowDownIcon className="w-10 h-10 text-brand animate-bounce hidden xl:block" />
                     </div>
                  </div>
                  
                  <div className="hero-sub-details mt-10 flex flex-col lg:flex-row gap-10 items-end justify-between border-t border-white/5 pt-10">
                     <div className="max-w-xl">
                        <p className="text-lg 2xl:text-xl font-syne font-light text-[#9ca3af] leading-tight tracking-tight">
                           Architecting <span className="text-brand font-bold italic underline decoration-brand/20 underline-offset-[10px]">Digital Fortresses</span> with precision and active defense.
                        </p>
                     </div>
                     <div className="flex gap-3">
                        <TechTag>SOC SPECIALIST</TechTag>
                        <TechTag>AZURE CLOUD</TechTag>
                        <TechTag>AUTO_SECURITY</TechTag>
                     </div>
                  </div>
              </div>
          </div>

          <div className="px-5 lg:px-[8vw] max-w-[1600px] mx-auto w-full pb-8 flex justify-between items-end border-t border-white/5 lg:border-none pt-8 lg:pt-0">
              <div className="lg:hidden">
                  <p className="tech-label opacity-40 text-[8px] tracking-widest uppercase">Based in Spain // Global Reach</p>
              </div>
              <div className="flex gap-4 lg:gap-6">
                 {[
                   { Icon: Github, url: "https://github.com/Csolanascript", label: "GitHub Profile" },
                   { Icon: Mail, url: "mailto:carlossolanamelero@gmail.com", label: "Email Carlos" },
                   { Icon: Linkedin, url: "https://linkedin.com/in/carlos-solana-melero", label: "LinkedIn Profile" }
                 ].map((social, i) => (
                   <a 
                     key={i} 
                     href={social.url} 
                     target="_blank"
                     className="p-3 lg:p-5 border border-white/10 lg:hover:bg-brand lg:hover:text-black lg:hover:border-brand transition-all duration-500 rounded-sm"
                     aria-label={social.label}
                   >
                     <social.Icon size={18} />
                   </a>
                 ))}
              </div>
          </div>
        </section>

        <Marquee text="THREAT INTEL / OPENCTI / INTEL OWL / AZURE / SOC" />

        {/* ── ABOUT SECTION ────────────────────────────────── */}
        <section id="about" className="py-[10vh] lg:py-[15vh] px-[6vw] lg:px-[8vw] max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 bg-transparent relative z-10">
          <div className="reveal-section">
            <span className="tech-label text-brand font-bold pl-0 tracking-[0.4em]">PROFILE // 00</span>
            <h2 className="font-syne text-[clamp(2rem,6vw,4.5rem)] font-black uppercase mt-6 mb-8 leading-[0.85]">Hybrid<br/><span className="italic text-brand lg:text-white">Systems.</span></h2>
            <div className="space-y-6 text-[#9ca3af] text-lg lg:text-xl font-light leading-relaxed max-w-lg">
              <p>Bridging the gap between <span className="text-white font-medium">Cloud Architecture</span> and <span className="text-white font-medium">Active Defense</span>.</p>
              <p>Developing threat intelligence pipelines at <span className="text-brand font-bold italic">Nologin Consulting</span>.</p>
            </div>
          </div>

          <div className="reveal-section p-8 lg:p-12 border border-white/10 bg-white/5 backdrop-blur-3xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-3 group-hover:opacity-15 transition-opacity">
                <Shield size={120} aria-hidden="true" />
             </div>
             <Shield className="w-10 h-10 text-brand mb-8" aria-hidden="true" />
             <div className="space-y-6 lg:space-y-8">
                {[
                  { title: "Microsoft Azure", meta: "AZ-104 Administrator", status: "Ongoing" },
                  { title: "Computer Engineering", meta: "4th Year Student", status: "Active" },
                  { title: "Threat Intel", meta: "Skyfall CTI Platform", status: "TFG" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4 lg:pb-6">
                    <div>
                        <span className="font-syne font-bold uppercase text-xl lg:text-2xl block group-hover:text-brand transition-colors duration-300">{item.title}</span>
                        <span className="tech-label opacity-40 lowercase tracking-normal pl-0 text-[10px] sm:text-xs">{item.meta}</span>
                    </div>
                    <span className="tech-label border border-brand text-brand py-0.5 px-2 text-[9px] sm:text-[10px]">{item.status}</span>
                  </div>
                ))}
             </div>
          </div>
        </section>

        <div id="work" className="relative z-10">
          <HorizontalWork />
        </div>

        {/* ── SKILLS SECTION ───────────────────────────────────────────────── */}
        <section id="skills" className="py-[10vh] lg:py-[15vh] px-[6vw] lg:px-[8vw] max-w-[1600px] mx-auto reveal-section">
          <div className="mb-12 lg:mb-20 flex flex-col lg:flex-row justify-between items-end gap-10">
              <div className="flex-grow">
                <span className="tech-label text-brand font-bold pl-0 tracking-[0.4em]">CAPABILITIES // 02</span>
                <h2 className="text-[clamp(3rem,8vw,8rem)] font-syne font-black leading-[0.8] mt-6 tracking-tighter uppercase">Tech<br/><span className="text-brand font-black">Domain.</span></h2>
              </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/10 border border-white/10">
            {[
              { Icon: Cloud, title: "Cloud Ops", skills: ["Azure VMs", "ERP Hosting", "Blob Storage", "Terraform IaC"] },
              { Icon: Shield, title: "SecOps", skills: ["SOC Automation", "TI Platforms", "EDR / SIEM", "Incident Detection"] },
              { Icon: Terminal, title: "DevOps", skills: ["n8n Workflows", "Docker Hub", "Kubernetes", "Linux Hardening"] },
              { Icon: Activity, title: "Languages", skills: ["Python Scripts", "TypeScript / JS", "C++ Systems", "Go Backend"] },
            ].map((cat, i) => (
              <div key={i} className="bg-black p-10 lg:p-12 group hover:bg-white transition-all duration-700">
                <cat.Icon className="w-8 h-8 text-brand mb-8 group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                <h3 className="font-syne font-bold uppercase text-xl lg:text-2xl mb-6 group-hover:text-black transition-colors">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.skills.map(s => (
                    <li key={s} className="text-xs lg:text-sm font-mono text-[#6b7280] group-hover:text-black/60 flex items-center gap-2">
                        <div className="w-1 h-1 bg-brand opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ─────────────────────────────────── */}
        <footer id="contact" className="py-[10vh] lg:py-[15vh] px-[6vw] border-t border-white/5 text-center reveal-section bg-black flex flex-col items-center">
          <div className="relative w-full flex flex-col items-center max-w-[1700px] overflow-visible">
            <span className="text-[clamp(3rem,10vw,12rem)] font-syne font-black italic opacity-5 select-none tracking-tighter leading-none mb-[-2vw] uppercase" aria-hidden="true">CONTACT</span>
            <a href="mailto:carlossolanamelero@gmail.com" className="font-syne font-black text-[clamp(0.5rem,2.7vw,4.5rem)] tracking-tighter uppercase lg:hover:text-brand transition-all duration-500 block relative z-10 group py-4 max-w-[95vw] px-4 break-keep whitespace-nowrap overflow-visible" aria-label="Send email to carlossolanamelero@gmail.com">
               <span className="inline-block group-hover:-translate-y-full transition-transform duration-500">carlossolanamelero@gmail.com</span>
               <span className="absolute left-0 right-0 top-full group-hover:top-0 transition-all duration-500 text-brand">GET IN TOUCH</span>
            </a>
          </div>
          
          <p className="mt-8 text-[#6b7280] text-[9px] lg:text-[10px] tracking-[0.4em] uppercase font-mono">Based in Zaragoza // Available globally</p>
          
          <div className="mt-12 lg:mt-20 flex justify-center gap-6 lg:gap-8">
             {[
               { Icon: Linkedin, url: "https://linkedin.com/in/carlos-solana-melero", label: "LinkedIn Profile" },
               { Icon: Github, url: "https://github.com/Csolanascript", label: "GitHub Profile" }
             ].map((link, i) => (
               <a 
                 key={i} 
                 href={link.url} 
                 target="_blank" 
                 className="p-6 lg:p-8 border border-white/5 rounded-full lg:hover:bg-brand lg:hover:text-black lg:hover:border-brand transition-all duration-500 flex items-center justify-center group"
                 aria-label={link.label}
               >
                 <link.Icon size={20} className="group-hover:scale-110 transition-transform" />
               </a>
             ))}
          </div>

          <div className="mt-[10vh] pt-10 border-t border-white/5 w-full flex flex-col lg:flex-row justify-between items-center gap-4 opacity-30 uppercase font-mono text-[8px] tracking-[0.4em]">
            <p>© 2026 CARLOS SOLANA</p>
            <p>DESIGNED FOR AGENTIC PERFORMANCE</p>
            <p>VAULT_V.2.0.2.6</p>
          </div>
        </footer>

      </div>

      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .ease-expo { transition-timing-function: cubic-bezier(1, 0, 0, 1); }
      `}</style>
    </SmoothScroll>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M7 13l5 5 5-5" />
            <path d="M12 18V6" />
        </svg>
    );
}
