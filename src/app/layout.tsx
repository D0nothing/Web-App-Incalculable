import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Incalculable",
  description: "Une interface pour utiliser l’intelligence artificielle sans perdre la main."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
