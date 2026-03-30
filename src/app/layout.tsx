import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carlos Solana — Computer Engineering Student & Cybersecurity",
  description:
    "Portfolio of Carlos Solana. Final-year Computer Engineering student specialising in cybersecurity, SOC operations and Azure cloud. Preparing AZ-104.",
  keywords: [
    "cybersecurity",
    "SOC analyst",
    "computer engineering",
    "threat intelligence",
    "Azure",
    "AZ-104",
    "OpenCTI",
    "Intel Owl",
    "Nologin",
  ],
  authors: [{ name: "Carlos Solana" }],
  openGraph: {
    title: "Carlos Solana — Computer Engineering Student & Cybersecurity",
    description:
      "Portfolio of Carlos Solana. Final-year student specialising in cybersecurity and Azure cloud.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-black text-[#f0f4f8] antialiased">{children}</body>
    </html>
  );
}
