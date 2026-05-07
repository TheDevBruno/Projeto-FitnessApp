import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LifeRealFitness | Treino e Dieta Adaptativos",
  description: "O único app fitness que se adapta ao seu tempo, orçamento e equipamentos. Inteligência Artificial para resultados reais na vida real.",
  keywords: ["fitness", "dieta personalizada", "treino em casa", "nutrição inteligente", "academia", "gym", "saúde"],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "LifeRealFitness | Treino e Dieta Adaptativos",
    description: "Resultados reais na vida real com IA.",
    url: "https://liferealfitness.vercel.app",
    siteName: "LifeRealFitness",
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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
