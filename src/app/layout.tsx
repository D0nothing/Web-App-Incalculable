import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Incalculable",
  description: "Interface web pour mobile et desktop avec Parchemin editable"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
