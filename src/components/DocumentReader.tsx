type DocumentReaderProps = {
  title: string;
  summary: string;
  sections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
};

export function DocumentReader({ title, summary, sections }: DocumentReaderProps) {
  return (
    <div className="doc-shell">
      <aside className="doc-nav" aria-label={`Sommaire ${title}`}>
        <p className="doc-nav-title">Sommaire</p>
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="doc-nav-link">
            {section.title}
          </a>
        ))}
      </aside>

      <div className="doc-content">
        <p className="doc-summary">{summary}</p>
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="doc-section">
            <h4>{section.title}</h4>
            <pre className="read-mode">{section.content}</pre>
          </section>
        ))}
      </div>
    </div>
  );
}
