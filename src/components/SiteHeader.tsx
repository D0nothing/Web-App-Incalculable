import Link from "next/link";

type SiteHeaderProps = {
  active: "home" | "but" | "pourquoi" | "manifeste" | "protocole" | "parchemin";
};

const items = [
  { href: "/", label: "Prompt", key: "home" },
  { href: "/but", label: "Le but & pourquoi", key: "but" }
] as const;

export function SiteHeader({ active }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a href="https://incalculable.ai/" className="wordmark" aria-label="Visiter incalculable.ai">
        <span className="wordmark-mark">I</span>
        <span>Incalculable</span>
      </a>
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
