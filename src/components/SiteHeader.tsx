import Link from "next/link";

type SiteHeaderProps = {
  active: "home" | "but" | "pourquoi" | "manifeste" | "protocole" | "parchemin";
};

const items = [
  { href: "/", label: "Prompt", key: "home" },
  { href: "/but", label: "Le but", key: "but" },
  { href: "/pourquoi", label: "Pourquoi", key: "pourquoi" },
  { href: "/manifeste", label: "Manifeste", key: "manifeste" },
  { href: "/protocole", label: "Protocole", key: "protocole" },
  { href: "/parchemin", label: "Le Parchemin", key: "parchemin" }
] as const;

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Incalculable, accueil">
        <span className="wordmark-mark">I</span>
        <span>Incalculable</span>
      </Link>
      <nav className="topnav" aria-label="Navigation principale">
        {items.map((item) => (
          <Link key={item.key} href={item.href} className={active === item.key ? "chip active" : "chip"} aria-current={active === item.key ? "page" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
