import { HomeClient } from "@/components/HomeClient";
import { SiteHeader } from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <main className="site-shell home-shell">
      <SiteHeader active="home" />
      <HomeClient />
    </main>
  );
}
