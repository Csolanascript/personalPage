import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlos Solana | Sistemas y Ciberseguridad",
  description: 
    "Web personal de Carlos Solana. Proyectos de ciberseguridad, SOC analyst, Cloud Azure y automatización. Portfolio y contacto.",
  keywords: [
    "Carlos Solana",
    "ciberseguridad",
    "SOC analyst",
    "Sistemas",
    "Zaragoza",
    "Cloud Azure",
    "AZ-104",
    "Threat Intelligence",
    "OpenCTI",
    "Intel Owl",
    "Nologin Consulting",
    "portfolio desarrollador",
  ],
  authors: [{ name: "Carlos Solana" }],
  openGraph: {
    title: "Carlos Solana | Sistemas y Ciberseguridad",
    description: 
      "Web personal de Carlos Solana. Proyectos, portfolio y contacto en ciberseguridad y servicios cloud.",
    url: "https://carlossolana.hispandle.es",
    siteName: "Carlos Solana Portfolio",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Solana | Sistemas y Ciberseguridad",
    description: 
      "Portfolio de Carlos Solana. Especialista en SOC, Azure y defensa activa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carlos Solana",
    "url": "https://carlossolana.hispandle.es",
    "jobTitle": "Systems Engineer & SOC Analyst",
    "sameAs": [
      "https://github.com/Csolanascript",
      "https://linkedin.com/in/carlos-solana-melero"
    ]
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-[#f0f4f8] antialiased">
        {children}
      </body>
    </html>
  );
}
