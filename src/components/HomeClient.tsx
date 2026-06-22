"use client";

import { useState } from "react";

import { ChatThread } from "@/components/ChatThread";
import { PromptBox } from "@/components/PromptBox";
import type { ChatMessage } from "@/lib/types";

export function HomeClient() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Prêt à commencer.");

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
        body: JSON.stringify({ message: prompt, action: "normal" })
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

  return (
    <section className="prompt-stage">
      <div className="prompt-intro">
        <p className="eyebrow">Un espace pour penser</p>
        <h1>Qu’avez-vous<br />en tête&nbsp;?</h1>
      </div>

      <div className="prompt-object">
        <PromptBox value={prompt} onChange={setPrompt} onSubmit={handleSubmit} isLoading={isLoading} />
        <p className="sr-only" role="status">{status}</p>
      </div>

      {messages.length > 0 ? (
        <div className="conversation-panel">
          <ChatThread messages={messages} />
        </div>
      ) : null}
    </section>
  );
}
