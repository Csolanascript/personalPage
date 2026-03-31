"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ExternalLink, Shield, Cloud, Terminal } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: "#87va-0001",
    title: "Nologin Consulting",
    subtitle: "Cybersecurity & SOC Automation",
    description: "Joined the security team to automate workflows, health checks across EDR, firewall stacks and SIEM (Graylog/XSIAM).",
    tags: ["n8n", "EDR", "XSOAR", "Palo Alto", "XSIAM"],
    icon: <Shield className="w-10 h-10 text-[#ff0033]" />,
  },
  {
    id: "#3vva-0002",
    title: "Skyfall CTI",
    subtitle: "Bachelor's Thesis (TFG)",
    description: "Built a Threat Intelligence platform using Intel Owl and OpenCTI to detect risks via OSINT and knowledge graphs.",
    tags: ["Intel Owl", "OpenCTI", "Python", "STIX"],
    icon: <Terminal className="w-10 h-10 text-[#ff0033]" />,
    link: "https://github.com/Csolanascript/Skyfall-CTI",
  },
  {
    id: "#kq8d-0003",
    title: "Cloud & Azure",
    subtitle: "Infrastructure Specialist",
    description: "Expertise in Azure Administrator (AZ-104) and Terraform. Managing VM, ERP, and Blob Storage environments.",
    tags: ["Azure", "Terraform", "AZ-104", "Infra"],
    icon: <Cloud className="w-10 h-10 text-[#ff0033]" />,
  },
];

export default function HorizontalWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const mm = gsap.matchMedia();

    // Horizontal Scroll only on Desktop (min-width: 1024px)
    mm.add("(min-width: 1024px)", () => {
      const scrollWidth = container.offsetWidth - window.innerWidth;

      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`,
          anticipatePin: 1,
        },
      });
    });

    // Mobile logic: No pinning, just natural stack with reveals
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray(".project-card").forEach((card: any) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="lg:h-screen w-full flex items-center overflow-visible lg:overflow-hidden bg-transparent lg:border-y border-white/10 relative py-12 lg:py-0">
      {/* Decorative vertical lines (Desktop only) */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 hidden lg:flex">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-white" />
        ))}
      </div>

      <div ref={containerRef} className="flex flex-col lg:flex-row lg:flex-nowrap gap-8 lg:gap-10 items-stretch px-[6vw] lg:px-[10vw] w-full lg:w-auto">
        {/* Intro Slide */}
        <div className="flex-shrink-0 lg:w-[50vw] flex flex-col justify-center mb-8 lg:mb-0">
            <span className="tech-label pl-0">SELECTED WORKS // 01</span>
            <h2 className="headline-huge mt-4 mb-6 lg:mb-10 text-2xl sm:text-5xl lg:text-9xl tracking-tighter overflow-wrap-anywhere">Selected<br/><span className="text-brand">Experience</span></h2>
        </div>

        {/* Project Cards */}
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id} 
            className="project-card flex-shrink-0 w-full lg:w-[40vw] lg:h-[60vh] grid-border-heavy p-6 lg:p-8 flex flex-col justify-between group transition-colors duration-500 hover:bg-[#ff0033]/5 relative lg:overflow-hidden"
          >
            {/* Background ID number (Desktop) */}
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] font-syne text-[15rem] lg:text-[20rem] font-black select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.08] hidden sm:block">
                {index + 1}
            </div>

            <div className="flex justify-between items-start mb-6 lg:mb-0">
              <div>
                <span className="tech-label mb-4 block opacity-50 px-0">{project.id}</span>
                <h3 className="font-syne text-xl sm:text-4xl lg:text-5xl font-extrabold uppercase mb-2 group-hover:text-brand transition-colors overflow-wrap-anywhere">{project.title}</h3>
                <p className="text-brand font-mono text-[10px] lg:text-sm tracking-widest">{project.subtitle}</p>
              </div>
              <div className="lg:block">
                {project.icon}
              </div>
            </div>

            <div>
              <p className="text-[#9ca3af] text-sm lg:text-lg max-w-md leading-relaxed mb-6 lg:mb-8">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6 lg:mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="tech-label border border-white/20">{tag}</span>
                ))}
              </div>

              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener"
                  className="inline-flex items-center gap-2 font-syne font-bold uppercase text-xs hover:text-brand transition-colors"
                >
                  View Details <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Final Slide Spacer (Desktop only) */}
        <div className="flex-shrink-0 w-[10vw] hidden lg:block" />
      </div>
    </section>
  );
}
