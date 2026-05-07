import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MinhavidaFitness | Seu Estilo de Vida Inteligente",
  description: "A plataforma definitiva para treinos e dieta que se adaptam à sua vida real. Inteligência Artificial para resultados consistentes.",
  keywords: ["fitness", "dieta personalizada", "minha vida fitness", "treino inteligente", "nutrição"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "MinhavidaFitness | Treino e Dieta Adaptativos",
    description: "Transforme sua rotina com IA. Resultados reais na vida real.",
    url: "https://minhavidafitness.vercel.app",
    siteName: "MinhavidaFitness",
    locale: "pt_BR",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
