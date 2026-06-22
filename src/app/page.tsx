"use client";

import { useMemo, useState } from "react";

import { ActionButtons } from "@/components/ActionButtons";
import { ChatThread } from "@/components/ChatThread";
import { PromptBox } from "@/components/PromptBox";
import { UploadButton } from "@/components/UploadButton";
import type { ChatAction, ChatMessage } from "@/lib/types";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [action, setAction] = useState<ChatAction>("normal");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bienvenue. Decrivez votre besoin et je vous aide a construire la suite."
    }
  ]);
  const [documentText, setDocumentText] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Pret.");

  const documentSummary = useMemo(() => {
    if (!documentText) {
      return "Aucun document importe.";
    }

    return `${documentText.slice(0, 120)}${documentText.length > 120 ? "..." : ""}`;
  }, [documentText]);

  async function handleSubmit() {
    if (!prompt.trim()) {
      setStatus("Ajoutez un message avant d'envoyer.");
      return;
    }

    setIsLoading(true);
    setStatus("Envoi en cours...");

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt.trim()
    };

    setMessages((current) => [...current, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: prompt,
          action,
          documentText
        })
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "La requete a echoue.");
      }

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply ?? "Reponse indisponible."
        }
      ]);
      setPrompt("");
      setStatus("Reponse recue.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Une erreur est survenue.";
      setStatus(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFileSelected(file: File | null) {
    if (!file) {
      return;
    }

    const content = await file.text();
    setDocumentText(content);
    setStatus(`Document charge: ${file.name}`);
  }

  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">Incalculable</p>
        <h1>Une base mobile et desktop pour chat, documents et instructions editables.</h1>
        <p className="lead">
          L'application charge le Parchemin cote serveur avant chaque reponse, pour que l'administration puisse ajuster les instructions sans modifier le coeur du code.
        </p>
      </section>

      <section className="workspace">
        <div className="panel">
          <PromptBox
            value={prompt}
            onChange={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          <div className="support-row">
            <UploadButton onFileSelected={handleFileSelected} />
            <ActionButtons action={action} onChange={setAction} />
          </div>
          <div className="status-card">
            <strong>Status</strong>
            <span>{status}</span>
            <span className="muted">{documentSummary}</span>
          </div>
        </div>

        <div className="panel panel-thread">
          <ChatThread messages={messages} />
        </div>
      </section>
    </main>
  );
}
