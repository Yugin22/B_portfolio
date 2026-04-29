import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PageTracker from "@/components/PageTracker";
import CommandPalette from "@/components/CommandPalette";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import GlobalSpotlight from "@/components/GlobalSpotlight";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "PORTFOLIO.OS // FULL-STACK ARCHITECT",
  description: "Futuristic SaaS-level portfolio demonstrating advanced full-stack engineering, real-time analytics, and premium UI/UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${spaceGrotesk.variable} font-sans bg-[#010101] text-white antialiased`}>
        <GlobalSpotlight />
        <SmoothScroll>
          <ScrollProgress />
          <CommandPalette />
          <PageTracker />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
