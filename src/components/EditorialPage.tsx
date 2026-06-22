import { SiteHeader } from "@/components/SiteHeader";

type EditorialPageProps = {
  active: "but" | "pourquoi" | "parchemin";
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
};

export function EditorialPage({ active, index, eyebrow, title, lead, children }: EditorialPageProps) {
  return (
    <main className="site-shell">
      <SiteHeader active={active} />
      <article className="editorial-page">
        <header className="editorial-hero">
          <p className="folio">{index} / Incalculable</p>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="editorial-lead">{lead}</p>
        </header>
        <div className="editorial-body">{children}</div>
      </article>
    </main>
  );
}
