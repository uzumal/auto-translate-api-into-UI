import type { Metadata } from "next";
import "./globals.css";
import ParticlesBackground from "@/components/modules/ParticlesBackground";
import { auth } from "@/firebase/firebase";

// SSRを無効にしてParticlesBackgroundを動的にインポート
// const ParticlesBackground = dynamic(() => import('../components/modules/ParticlesBackground'), { ssr: false });

export const metadata: Metadata = {
  title: "API Translator",
  description: "Generated by uzumal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ParticlesBackground />
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </body>
    </html>
  );
}
