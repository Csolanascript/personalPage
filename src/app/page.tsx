"use client";

import {
  Shield,
  Terminal,
  Network,
  Server,
  Lock,
  Eye,
  Activity,
  BookOpen,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  AlertCircle,
  Database,
  Cpu,
  Globe,
  FileSearch,
  Layers,
  GitBranch,
  Cloud,
  Phone,
  MapPin,
  GraduationCap,
  Workflow,
  Trophy,
  Zap,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
interface Skill {
  name: string;
  level: number;
  category: "cloud" | "blue" | "infra" | "dev";
}

/* ─────────────────────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────────────────────── */
const SKILLS: Skill[] = [
  { name: "Microsoft Azure",         level: 82, category: "cloud" },
  { name: "Terraform",               level: 72, category: "cloud" },
  { name: "Azure VMs / Blob / ERP",  level: 76, category: "cloud" },
  { name: "Incident Response / IOCs",level: 78, category: "blue" },
  { name: "OSINT & Threat Intel",    level: 75, category: "blue" },
  { name: "SIEM / Graylog / XSIAM",  level: 70, category: "blue" },
  { name: "Docker & Kubernetes",     level: 76, category: "infra" },
  { name: "Linux Administration",    level: 80, category: "infra" },
  { name: "Networking / TCP/IP",     level: 74, category: "infra" },
  { name: "Python",                  level: 78, category: "dev" },
  { name: "TypeScript / JavaScript", level: 75, category: "dev" },
  { name: "Go / Java / C++",         level: 68, category: "dev" },
];

const categoryColor: Record<Skill["category"], string> = {
  cloud: "#0078d4",
  blue:  "#059669",
  infra: "#7c3aed",
  dev:   "#d97706",
};

const categoryLabel: Record<Skill["category"], string> = {
  cloud: "Cloud / Azure",
  blue:  "Blue Team / SOC",
  infra: "Infra / DevOps",
  dev:   "Development",
};

/* ─────────────────────────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="glow-dot" aria-hidden="true" />
      <span
        className="text-[10px] font-heading font-semibold tracking-[0.12em] uppercase"
        style={{ color: "#0078d4" }}
      >
        {children}
      </span>
    </div>
  );
}

function SkillBar({ skill }: { skill: Skill }) {
  const color = categoryColor[skill.category];
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-body text-[#d1d5db] group-hover:text-white transition-colors duration-200">
          {skill.name}
        </span>
        <span className="text-xs font-mono font-semibold" style={{ color }}>
          {skill.level}%
        </span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-[#1f1f1f] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${skill.level}%`,
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

function TechTag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main Page
───────────────────────────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-black font-body">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-6 py-3 rounded-full border border-[#1f1f1f] bg-black/85 backdrop-blur-md animate-fade-in"
        style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
      >
        <span
          className="font-heading font-bold text-sm tracking-widest"
          style={{ color: "#0078d4" }}
        >
          CS
        </span>
        {[
          ["#hero",       "Home"],
          ["#experience", "Experience"],
          ["#tfg",        "Thesis"],
          ["#azure",      "Azure"],
          ["#skills",     "Skills"],
        ].map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="text-xs font-body font-medium text-[#9ca3af] hover:text-white transition-colors duration-200 cursor-pointer hidden sm:block"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          className="ml-2 text-xs font-heading font-semibold px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer hover:opacity-90"
          style={{ background: "#0078d4", color: "#fff" }}
        >
          Contact
        </a>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
        <section id="hero" aria-label="Introduction" className="mb-10">
          <div
            className="bento-card relative p-8 sm:p-12 overflow-hidden animate-fade-up"
            style={{
              background: "linear-gradient(135deg, #0a0a0a 0%, #0d1520 55%, #0a0a0a 100%)",
              borderColor: "rgba(0,120,212,0.22)",
            }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(#0078d420 1px, transparent 1px), linear-gradient(90deg, #0078d420 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
              aria-hidden="true"
            />
            {/* Glow orb */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-[0.18] pointer-events-none"
              style={{ background: "radial-gradient(circle, #0078d4 0%, transparent 70%)" }}
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
              {/* Avatar */}
              <div
                className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center font-heading font-bold text-2xl"
                style={{
                  background: "linear-gradient(135deg, rgba(0,120,212,0.15), rgba(0,120,212,0.30))",
                  border: "1px solid rgba(0,120,212,0.35)",
                  color: "#0078d4",
                }}
                aria-hidden="true"
              >
                CS
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="glow-dot" aria-hidden="true" />
                  <span
                    className="text-[11px] font-heading font-semibold tracking-[0.14em] uppercase"
                    style={{ color: "#0078d4" }}
                  >
                    Studying AZ-104 · Open to opportunities
                  </span>
                </div>

                <h1 className="font-heading font-semibold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-2">
                  Carlos Solana
                </h1>
                <p
                  className="font-heading font-light text-lg sm:text-xl mb-4"
                  style={{ color: "#0078d4" }}
                >
                  Computer Engineering Student · Cybersecurity &amp; Cloud
                </p>
                <p className="text-[#9ca3af] text-base max-w-xl leading-relaxed mb-6">
                  Final-year Computer Engineering student at{" "}
                  <span className="text-[#d1d5db] font-medium">Universidad de Zaragoza</span>,
                  specialising in Information Systems. Focused on{" "}
                  <span className="text-[#d1d5db] font-medium">cybersecurity, SOC operations and Azure cloud</span>.
                  Real-world experience at Nologin Consulting. Currently completing my Bachelor&apos;s Thesis
                  and preparing for the{" "}
                  <span className="font-semibold" style={{ color: "#0078d4" }}>AZ-104</span>{" "}
                  certification.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#experience"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm transition-all duration-200 cursor-pointer hover:opacity-90 hover:-translate-y-px"
                    style={{ background: "#0078d4", color: "#fff" }}
                  >
                    View experience
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href="https://github.com/Csolanascript"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-sm border transition-all duration-200 cursor-pointer hover:border-[#0078d4] hover:text-white"
                    style={{ borderColor: "#1f1f1f", color: "#9ca3af" }}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex sm:flex-col gap-6 sm:gap-4 sm:text-right sm:border-l sm:pl-8 sm:border-[#1f1f1f] shrink-0">
                {[
                  ["4th year", "Computer Eng."],
                  ["2025",     "Nologin Internship"],
                  ["AZ-104",   "In progress"],
                ].map(([val, lbl]) => (
                  <div key={lbl}>
                    <p className="font-heading font-semibold text-xl sm:text-2xl text-white leading-none">
                      {val}
                    </p>
                    <p className="text-xs text-[#6b7280] mt-0.5">{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ BENTO GRID ═════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ── EDUCATION ─────────────────────────────────────────────── */}
          <section
            aria-label="Academic background"
            className="bento-card p-6 animate-fade-up delay-100"
          >
            <SectionLabel>Education</SectionLabel>
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background: "rgba(0,120,212,0.10)",
                  border: "1px solid rgba(0,120,212,0.20)",
                }}
                aria-hidden="true"
              >
                <GraduationCap className="w-5 h-5 text-[#0078d4]" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-white text-base leading-snug">
                  Bachelor&apos;s in Computer Engineering
                </h2>
                <p className="text-sm font-medium mt-0.5" style={{ color: "#0078d4" }}>
                  Universidad de Zaragoza
                </p>
                <p className="text-xs text-[#6b7280] mt-1">
                  2022 – Present · Information Systems
                </p>
              </div>
            </div>
            <div className="azure-line mb-4" aria-hidden="true" />
            <ul className="space-y-2">
              {[
                "Specialisation in Information Systems",
                "Class Delegate for three consecutive years",
                "Final year — Bachelor's Thesis ongoing at Nologin",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <ChevronRight
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#0078d4" }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-[#9ca3af]">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── EXPERIENCE: Nologin (2-col) ────────────────────────────── */}
          <section
            id="experience"
            aria-label="Nologin experience"
            className="bento-card p-6 sm:col-span-2 animate-fade-up delay-200"
          >
            <SectionLabel>Professional Experience</SectionLabel>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h2 className="font-heading font-semibold text-xl text-white">
                  Cybersecurity Internship
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Shield className="w-4 h-4" style={{ color: "#0078d4" }} aria-hidden="true" />
                  <span className="font-heading font-medium text-sm" style={{ color: "#0078d4" }}>
                    Nologin Consulting
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-[#6b7280] bg-[#111] px-3 py-1 rounded-full border border-[#1f1f1f] self-start">
                June 2025 — August 2025
              </span>
            </div>

            <div className="azure-line mb-4" aria-hidden="true" />

            <ul className="space-y-2.5" role="list">
              {[
                "Joined the security team performing automation and SOC tasks.",
                "Deployed and configured n8n to perform periodic health checks across the security stack (EDR, Palo Alto and Fortinet firewalls, XDR, XSOAR, Prisma Cloud, Graylog, XSIAM).",
                "Identified vulnerabilities and automated security response workflows.",
              ].map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <ChevronRight
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "#0078d4" }}
                    aria-hidden="true"
                  />
                  <span className="text-sm text-[#9ca3af] leading-snug">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {["n8n", "EDR", "Palo Alto", "Fortinet", "XSOAR", "Prisma Cloud", "Graylog", "XSIAM"].map(
                (t) => <TechTag key={t}>{t}</TechTag>
              )}
            </div>
          </section>

          {/* ── AZURE / AZ-104 HIGHLIGHT (full-width) ───────────────────── */}
          <section
            id="azure"
            aria-label="Azure Cloud and AZ-104"
            className="bento-card p-6 lg:col-span-3 animate-fade-up delay-300 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0a0a0a 0%, #061526 60%, #0a0a0a 100%)",
              borderColor: "rgba(0,120,212,0.30)",
            }}
          >
            <div
              className="absolute right-0 top-0 bottom-0 w-1/3 opacity-[0.04] pointer-events-none hidden lg:block"
              style={{ background: "radial-gradient(ellipse at 80% 50%, #0078d4 0%, transparent 70%)" }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              <SectionLabel>Cloud Computing</SectionLabel>

              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Headline */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(0,120,212,0.15)",
                        border: "1px solid rgba(0,120,212,0.30)",
                      }}
                      aria-hidden="true"
                    >
                      <Cloud className="w-6 h-6 text-[#0078d4]" />
                    </div>
                    <div>
                      <h2 className="font-heading font-semibold text-2xl text-white">
                        Microsoft Azure
                      </h2>
                      <p className="text-sm" style={{ color: "#0078d4" }}>
                        AZ-104 Azure Administrator · Exam next month
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#9ca3af] leading-relaxed max-w-xl">
                    Hands-on experience with Azure services: virtual machine management, databases,
                    web servers, Blob Storage and ERP hosting in the cloud.
                    Complemented with{" "}
                    <span className="text-[#d1d5db] font-medium">Terraform</span>{" "}
                    for infrastructure as code.
                  </p>
                </div>

                {/* AZ-104 badge */}
                <div
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border text-center min-w-[170px]"
                  style={{
                    background: "rgba(0,120,212,0.08)",
                    borderColor: "rgba(0,120,212,0.25)",
                  }}
                >
                  <Trophy
                    className="w-8 h-8 mb-2"
                    style={{ color: "#0078d4" }}
                    aria-hidden="true"
                  />
                  <p className="font-heading font-bold text-white text-lg leading-none">
                    AZ-104
                  </p>
                  <p className="text-xs text-[#6b7280] mt-1">Azure Administrator</p>
                  <div
                    className="mt-3 text-[10px] font-heading font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(0,120,212,0.15)",
                      color: "#0078d4",
                      border: "1px solid rgba(0,120,212,0.25)",
                    }}
                  >
                    In progress
                  </div>
                </div>

                {/* Azure services */}
                <div className="grid grid-cols-2 gap-2 min-w-[200px]">
                  {[
                    { icon: <Server className="w-4 h-4" />,   label: "Virtual Machines" },
                    { icon: <Database className="w-4 h-4" />, label: "Azure DB" },
                    { icon: <Globe className="w-4 h-4" />,    label: "Web Servers" },
                    { icon: <Layers className="w-4 h-4" />,   label: "Blob Storage" },
                    { icon: <Workflow className="w-4 h-4" />, label: "Terraform IaC" },
                    { icon: <Zap className="w-4 h-4" />,      label: "ERP Hosting" },
                  ].map(({ icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0d0d0d] border border-[#1f1f1f]"
                    >
                      <span style={{ color: "#0078d4" }} aria-hidden="true">{icon}</span>
                      <span className="text-xs text-[#9ca3af]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── TFG / THESIS (2-col) ──────────────────────────────────── */}
          <section
            id="tfg"
            aria-label="Bachelor's Thesis"
            className="bento-card p-6 sm:col-span-2 animate-fade-up delay-400"
          >
            <SectionLabel>Bachelor&apos;s Thesis</SectionLabel>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
              <div>
                <h2 className="font-heading font-semibold text-xl text-white">
                  Skyfall CTI — Intel Owl &amp; OpenCTI Platform
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-mono text-[#6b7280] bg-[#111] px-3 py-1 rounded-full border border-[#1f1f1f]">
                    Feb 2026 — Jun 2026
                  </span>
                  <span className="tag">Nologin Consulting</span>
                </div>
              </div>
              <a
                href="https://github.com/Csolanascript/Skyfall-CTI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Skyfall-CTI on GitHub"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-heading font-semibold text-xs border transition-all duration-200 cursor-pointer hover:border-[#0078d4] hover:text-white self-start flex-shrink-0"
                style={{ borderColor: "#1f1f1f", color: "#6b7280" }}
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                Skyfall-CTI
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            <div className="azure-line mb-4" aria-hidden="true" />

            <p className="text-sm text-[#9ca3af] leading-relaxed mb-5">
              Bachelor&apos;s Thesis focused on building a real-time incident and risk detection
              platform using OSINT and AI techniques. State-of-the-art tools like{" "}
              <span className="text-white font-medium">Intel Owl</span> and{" "}
              <span className="text-white font-medium">OpenCTI</span> form the core of the pipeline.
              Planned for deployment in a real Nologin production environment.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  icon: <FileSearch className="w-5 h-5" />,
                  title: "Intel Owl",
                  desc: "IOC analysis engine integrated with 60+ intelligence sources (VirusTotal, AbuseIPDB, Shodan…).",
                },
                {
                  icon: <Eye className="w-5 h-5" />,
                  title: "OpenCTI",
                  desc: "Structured threat management with STIX 2.1. Knowledge graph correlating actors, TTPs and indicators.",
                },
                {
                  icon: <GitBranch className="w-5 h-5" />,
                  title: "OSINT + AI Pipeline",
                  desc: "Automated flow: ingestion → enrichment → correlation → real-time detection.",
                },
                {
                  icon: <AlertCircle className="w-5 h-5" />,
                  title: "Production Deployment",
                  desc: "Planned rollout on Nologin infrastructure supporting live SOC operations.",
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-3 p-4 rounded-xl bg-[#111] border border-[#1f1f1f] hover:border-[rgba(0,120,212,0.25)] transition-colors duration-200"
                >
                  <span className="mt-0.5 flex-shrink-0" style={{ color: "#0078d4" }}>
                    {icon}
                  </span>
                  <div>
                    <p className="text-sm font-heading font-semibold text-white mb-0.5">{title}</p>
                    <p className="text-xs text-[#6b7280] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Python", "Docker", "STIX 2.1", "OSINT", "AI", "REST API", "Intel Owl", "OpenCTI"].map(
                (t) => <TechTag key={t}>{t}</TechTag>
              )}
            </div>
          </section>

          {/* ── LANGUAGES + EXTRA ─────────────────────────────────────── */}
          <div className="bento-card p-6 animate-fade-up delay-400">
            <SectionLabel>About</SectionLabel>
            <div className="space-y-3 mt-1">
              <div className="p-3 rounded-xl bg-[#111] border border-[#1f1f1f]">
                <p className="text-xs text-[#6b7280] uppercase tracking-wider font-semibold mb-2">
                  Languages
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">English</span>
                  <span className="text-xs" style={{ color: "#0078d4" }}>
                    B2 · Cambridge FCE (Grade A)
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-sm text-white">Spanish</span>
                  <span className="text-xs text-[#6b7280]">Native</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#111] border border-[#1f1f1f]">
                <p className="text-xs text-[#6b7280] uppercase tracking-wider font-semibold mb-1.5">
                  Class Delegate
                </p>
                <p className="text-sm text-[#9ca3af]">
                  3 consecutive years — student representative at UZ
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#111] border border-[#1f1f1f]">
                <p className="text-xs text-[#6b7280] uppercase tracking-wider font-semibold mb-1">
                  Other
                </p>
                <p className="text-sm text-[#9ca3af]">
                  Driving licence · Category B
                </p>
              </div>
            </div>
          </div>

          {/* ── SKILLS (full width) ────────────────────────────────────── */}
          <section
            id="skills"
            aria-label="Technical skills"
            className="bento-card p-6 lg:col-span-3 animate-fade-up delay-500"
          >
            <SectionLabel>Technical Skills</SectionLabel>
            <h2 className="font-heading font-semibold text-xl text-white mb-2">
              Competency stack
            </h2>
            <p className="text-sm text-[#6b7280] mb-6">
              Skills grouped by domain — languages, cloud, DevOps and cybersecurity.
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mb-6" role="list" aria-label="Category legend">
              {(Object.entries(categoryLabel) as [Skill["category"], string][]).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1.5" role="listitem">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: categoryColor[key] }}
                    aria-hidden="true"
                  />
                  <span className="text-xs text-[#6b7280]">{label}</span>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
              {SKILLS.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>

            {/* Programming languages */}
            <div className="mt-8 pt-6 border-t border-[#1a1a1a]">
              <p className="text-xs text-[#6b7280] uppercase tracking-wider font-semibold mb-3">
                Programming languages
              </p>
              <div className="flex flex-wrap gap-2">
                {["Java", "JavaScript", "TypeScript", "Python", "Go", "C++", "Bash"].map((l) => (
                  <TechTag key={l}>{l}</TechTag>
                ))}
              </div>
            </div>

            {/* DevOps tools */}
            <div className="mt-4">
              <p className="text-xs text-[#6b7280] uppercase tracking-wider font-semibold mb-3">
                DevOps &amp; Tooling
              </p>
              <div className="flex flex-wrap gap-2">
                {["Docker", "Docker Compose", "Kubernetes", "Terraform", "GitHub", "pm2", "n8n"].map(
                  (l) => <TechTag key={l}>{l}</TechTag>
                )}
              </div>
            </div>
          </section>

          {/* ── SECURITY TOOLS ────────────────────────────────────────── */}
          <div className="bento-card p-6 animate-fade-up delay-600">
            <SectionLabel>Security Tools</SectionLabel>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[
                { icon: <Terminal className="w-5 h-5" />,    label: "Kali Linux" },
                { icon: <Activity className="w-5 h-5" />,   label: "Graylog" },
                { icon: <Shield className="w-5 h-5" />,     label: "Fortinet" },
                { icon: <Network className="w-5 h-5" />,    label: "Palo Alto" },
                { icon: <Eye className="w-5 h-5" />,        label: "OpenCTI" },
                { icon: <Cpu className="w-5 h-5" />,        label: "Intel Owl" },
                { icon: <Layers className="w-5 h-5" />,     label: "XSOAR" },
                { icon: <Lock className="w-5 h-5" />,       label: "Prisma Cloud" },
                { icon: <Workflow className="w-5 h-5" />,   label: "n8n" },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[#111] border border-[#1f1f1f] hover:border-[rgba(0,120,212,0.25)] transition-colors duration-200 cursor-default"
                  title={label}
                >
                  <span style={{ color: "#0078d4" }} aria-hidden="true">{icon}</span>
                  <span className="text-[10px] text-[#6b7280] text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── CONTACT ───────────────────────────────────────────────── */}
          <section
            id="contact"
            aria-label="Contact"
            className="bento-card p-6 sm:col-span-2 animate-fade-up delay-700"
            style={{ borderColor: "rgba(0,120,212,0.20)" }}
          >
            <SectionLabel>Contact</SectionLabel>
            <h2 className="font-heading font-semibold text-lg text-white mb-2">
              Let&apos;s talk
            </h2>
            <p className="text-sm text-[#6b7280] mb-5">
              Available for internships, projects and opportunities in
              cybersecurity and cloud.
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {[
                {
                  icon: <Mail className="w-4 h-4" />,
                  label: "Email",
                  href: "mailto:carlossolanamelero@gmail.com",
                  text: "carlossolanamelero@gmail.com",
                },
                {
                  icon: <Phone className="w-4 h-4" />,
                  label: "Phone",
                  href: "tel:+34669818237",
                  text: "+34 669 818 237",
                },
                {
                  icon: <Linkedin className="w-4 h-4" />,
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/carlos-solana-melero",
                  text: "Carlos Solana Melero",
                },
                {
                  icon: <Github className="w-4 h-4" />,
                  label: "GitHub",
                  href: "https://github.com/Csolanascript",
                  text: "Csolanascript",
                },
                {
                  icon: <MapPin className="w-4 h-4" />,
                  label: "Location",
                  href: "#",
                  text: "Zaragoza, Spain",
                },
                {
                  icon: <BookOpen className="w-4 h-4" />,
                  label: "University",
                  href: "#",
                  text: "Unizar · Computer Eng.",
                },
              ].map(({ icon, label, href, text }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#111] border border-[#1f1f1f] hover:border-[rgba(0,120,212,0.30)] transition-all duration-200 cursor-pointer group"
                >
                  <span
                    className="group-hover:text-[#0078d4] transition-colors duration-200 flex-shrink-0"
                    style={{ color: "#6b7280" }}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <span className="text-sm text-[#9ca3af] group-hover:text-white transition-colors duration-200 truncate">
                    {text}
                  </span>
                  {href.startsWith("http") && (
                    <ExternalLink
                      className="w-3 h-3 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color: "#0078d4" }}
                      aria-hidden="true"
                    />
                  )}
                </a>
              ))}
            </div>
          </section>

        </div>{/* /bento grid */}

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <footer className="mt-16 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#4b5563]">
          <span className="font-body">
            © {new Date().getFullYear()} Carlos Solana Melero · Zaragoza, Spain
          </span>
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#0078d4" }}
              aria-hidden="true"
            />
            <span>Built with Next.js &amp; Tailwind CSS</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
