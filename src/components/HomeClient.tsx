"use client";

import { useMemo, useState } from "react";

import { ActionButtons } from "@/components/ActionButtons";
import { ChatThread } from "@/components/ChatThread";
import { PromptBox } from "@/components/PromptBox";
import { UploadButton } from "@/components/UploadButton";
import type { ChatAction, ChatMessage } from "@/lib/types";

export function HomeClient() {
  const [prompt, setPrompt] = useState("");
  const [action, setAction] = useState<ChatAction>("normal");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [documentText, setDocumentText] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Prêt à commencer.");

  const documentSummary = useMemo(() => {
    if (!documentText) return null;
    return `${documentText.slice(0, 90)}${documentText.length > 90 ? "…" : ""}`;
  }, [documentText]);

  async function handleSubmit() {
    if (!prompt.trim()) {
      setStatus("Écrivez votre demande avant de l’envoyer.");
      return;
    }

    setIsLoading(true);
    setStatus("Réflexion en cours…");
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt.trim()
    };
    setMessages((current) => [...current, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: prompt, action, documentText })
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok) throw new Error(data.error ?? "La requête a échoué.");

      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: "assistant", content: data.reply ?? "Réponse indisponible." }
      ]);
      setPrompt("");
      setStatus("Réponse reçue.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFileSelected(file: File | null) {
    if (!file) return;
    setDocumentText(await file.text());
    setStatus(`Document chargé : ${file.name}`);
  }

  return (
    <section className="prompt-stage">
      <div className="prompt-intro">
        <p className="eyebrow">Un espace pour penser</p>
        <h1>Qu’avez-vous<br />en tête&nbsp;?</h1>
      </div>

      <div className="prompt-object">
        <PromptBox value={prompt} onChange={setPrompt} onSubmit={handleSubmit} isLoading={isLoading} />
        <div className="prompt-tools">
          <UploadButton onFileSelected={handleFileSelected} />
          <ActionButtons action={action} onChange={setAction} />
        </div>
        <p className="prompt-status" role="status">{status}</p>
        {documentSummary ? <p className="document-summary">{documentSummary}</p> : null}
      </div>

      {messages.length > 0 ? (
        <div className="conversation-panel">
          <ChatThread messages={messages} />
        </div>
      ) : null}
    </section>
  );
}
