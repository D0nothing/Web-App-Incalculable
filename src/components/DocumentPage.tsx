import { DocumentReader } from "@/components/DocumentReader";
import { SiteHeader } from "@/components/SiteHeader";
import type { PublicDoc } from "@/lib/publicDocs";

type DocumentPageProps = {
  active: "manifeste" | "protocole";
  index: string;
  label: string;
  description: string;
  document: PublicDoc;
};

export function DocumentPage({ active, index, label, description, document }: DocumentPageProps) {
  return (
    <main className="site-shell">
      <SiteHeader active={active} />
      <article className="document-page">
        <header className="document-hero">
          <p className="folio">{index} / Document public</p>
          <p className="eyebrow">{label}</p>
          <h1>{document.title}</h1>
          <p>{description}</p>
        </header>
        <DocumentReader title={document.title} summary="Choisissez une section ou parcourez le document dans son intégralité." sections={document.sections} />
      </article>
    </main>
  );
}
