"use client";

import { useEffect, useState } from "react";

export default function ParcheminAdminPage() {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Chargement...");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/admin/parchemin");
        const data = (await response.json()) as { content?: string; error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? "Impossible de charger le Parchemin.");
        }

        setContent(data.content ?? "");
        setStatus("Parchemin charge.");
      } catch (error) {
        setStatus(error instanceof Error ? error.message : "Erreur inconnue.");
      }
    }

    void load();
  }, []);

  async function handleSave() {
    setIsSaving(true);
    setStatus("Sauvegarde en cours...");

    try {
      const response = await fetch("/api/admin/parchemin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
      });
      const data = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Impossible de sauvegarder.");
      }

      setStatus(data.success ? "Parchemin sauvegarde." : "Sauvegarde terminee.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Erreur inconnue.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="admin-shell">
      <section className="admin-card">
        <p className="eyebrow">Administration Parchemin</p>
        <h1>Edition des instructions systeme</h1>
        <p className="admin-warning">
          Ces instructions influencent toutes les reponses de l'IA. Toute modification doit etre relue avant sauvegarde.
        </p>
        <textarea value={content} onChange={(event) => setContent(event.target.value)} rows={24} />
        <div className="admin-actions">
          <button type="button" className="primary-button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
          <span className="status-text">{status}</span>
        </div>
      </section>
    </main>
  );
}
