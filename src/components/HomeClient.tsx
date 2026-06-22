"use client";

import { useMemo, useRef, useState } from "react";

import { ActionButtons } from "@/components/ActionButtons";
import { ChatThread } from "@/components/ChatThread";
import { DocumentReader } from "@/components/DocumentReader";
import { PromptBox } from "@/components/PromptBox";
import { UploadButton } from "@/components/UploadButton";
import type { PublicDoc } from "@/lib/publicDocs";
import type { ChatAction, ChatMessage } from "@/lib/types";

type InfoPanel = "but" | "why" | "manifesto" | "protocol" | "parchemin" | "chat";

type HomeClientProps = {
  manifesto: PublicDoc;
  protocol: PublicDoc;
};

export function HomeClient({ manifesto, protocol }: HomeClientProps) {
  const [prompt, setPrompt] = useState("");
  const [action, setAction] = useState<ChatAction>("normal");
  const [panel, setPanel] = useState<InfoPanel>("but");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Bienvenue. Explorez la position, puis passez au chat quand vous etes pret."
    }
  ]);
  const [documentText, setDocumentText] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Pret.");
  const butRef = useRef<HTMLElement | null>(null);
  const whyRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<HTMLElement | null>(null);
  const protocolRef = useRef<HTMLElement | null>(null);
  const parcheminRef = useRef<HTMLElement | null>(null);
  const chatRef = useRef<HTMLElement | null>(null);

  const documentSummary = useMemo(() => {
    if (!documentText) {
      return "Aucun document importe.";
    }

    return `${documentText.slice(0, 120)}${documentText.length > 120 ? "..." : ""}`;
  }, [documentText]);

  function focusPanel(nextPanel: InfoPanel) {
    setPanel(nextPanel);
    const refs: Record<InfoPanel, { current: HTMLElement | null }> = {
      but: butRef,
      why: whyRef,
      manifesto: manifestoRef,
      protocol: protocolRef,
      parchemin: parcheminRef,
      chat: chatRef
    };

    refs[nextPanel].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
      <section className="topbar">
        <div>
          <p className="eyebrow">Incalculable</p>
          <h1>Avant le prompt, il y a toi.</h1>
        </div>
        <nav className="topnav" aria-label="Navigation principale">
          <button type="button" className={panel === "but" ? "chip active" : "chip"} onClick={() => focusPanel("but")}>
            Le but
          </button>
          <button type="button" className={panel === "why" ? "chip active" : "chip"} onClick={() => focusPanel("why")}>
            Pourquoi
          </button>
          <button type="button" className={panel === "manifesto" ? "chip active" : "chip"} onClick={() => focusPanel("manifesto")}>
            Manifeste
          </button>
          <button type="button" className={panel === "protocol" ? "chip active" : "chip"} onClick={() => focusPanel("protocol")}>
            Protocole
          </button>
          <button type="button" className={panel === "parchemin" ? "chip active" : "chip"} onClick={() => focusPanel("parchemin")}>
            Le Parchemin
          </button>
          <button type="button" className={panel === "chat" ? "chip active" : "chip"} onClick={() => focusPanel("chat")}>
            Commencer
          </button>
        </nav>
      </section>

      <section className="hero panel">
        <p className="hero-kicker">Une interface pour utiliser l'IA sans perdre la main.</p>
        <div className="hero-grid">
          <div>
            <h2>Un site qui explique, guide, puis dialogue.</h2>
            <p className="lead">
              La première page sert à comprendre la position d'Incalculable, lire l'exposé complet du Parchemin en lecture seule, puis accéder au chat quand tu veux agir.
            </p>
          </div>
          <div className="hero-aside">
            <p className="hero-aside-label">En bref</p>
            <p>Le Parchemin est chargé côté serveur avant chaque réponse.</p>
            <p>Le texte public reste lisible, mais la modification reste dans l'admin.</p>
            <p>Le chat arrive après la lecture, pas avant.</p>
          </div>
        </div>
      </section>

      <section className="info-grid">
        <article ref={butRef} className={panel === "but" ? "panel info-panel active-panel" : "panel info-panel"}>
          <p className="eyebrow">Le but</p>
          <h3>Faire une app web claire sur PC et mobile, avec un Parchemin visible dans l'expérience mais invisible dans le code métier.</h3>
          <p>
            L'objectif n'est pas seulement de répondre vite. C'est de garder une expérience lisible, simple et cohérente, même quand les règles internes évoluent.
          </p>
        </article>

        <article ref={whyRef} className={panel === "why" ? "panel info-panel active-panel" : "panel info-panel"}>
          <p className="eyebrow">Pourquoi</p>
          <h3>Parce qu'un assistant utile doit aussi rester orientable.</h3>
          <p>
            L'utilisateur a besoin de comprendre où il va, pourquoi une réponse prend une certaine forme, et comment le système s'ajuste sans être opaque.
          </p>
        </article>

        <article ref={manifestoRef} className={panel === "manifesto" ? "panel info-panel active-panel" : "panel info-panel"}>
          <p className="eyebrow">Manifeste</p>
          <h3>Lecture complète du document 1</h3>
          <p>Le manifeste expose le cadre général du Parchemin et la discipline qu'il impose à l'IA.</p>
          <details className="parchemin-details" open>
            <summary>Lire le document complet</summary>
            <DocumentReader
              title={manifesto.title}
              summary="Navigation par sections du manifeste."
              sections={manifesto.sections}
            />
          </details>
        </article>

        <article ref={protocolRef} className={panel === "protocol" ? "panel info-panel active-panel" : "panel info-panel"}>
          <p className="eyebrow">Protocole</p>
          <h3>Lecture complète du document 2</h3>
          <p>Le protocole détaille les catégories, les modes et les tests internes qui gouvernent la réponse.</p>
          <details className="parchemin-details" open>
            <summary>Lire le document complet</summary>
            <DocumentReader
              title={protocol.title}
              summary="Navigation par sections du protocole."
              sections={protocol.sections}
            />
          </details>
        </article>

        <article ref={parcheminRef} className={panel === "parchemin" ? "panel info-panel active-panel" : "panel info-panel"}>
          <p className="eyebrow">Le Parchemin</p>
          <h3>Un exposé public, pas un formulaire de modification.</h3>
          <p>
            Ici, on montre l'intention du Parchemin et sa logique: instructions système éditables, chargées côté serveur, utilisées pour cadrer les réponses.
          </p>
          <details className="parchemin-details">
            <summary>Voir l'exposé</summary>
            <p>Le manifeste et le protocole sont affichés au-dessus en lecture complète.</p>
            <p>La version active du prompt serveur reste séparée de cette exposition publique.</p>
          </details>
        </article>
      </section>

      <section ref={chatRef} className="workspace">
        <div className="panel">
          <p className="eyebrow">Passer à l'action</p>
          <PromptBox value={prompt} onChange={setPrompt} onSubmit={handleSubmit} isLoading={isLoading} />
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
          <p className="eyebrow">Conversation</p>
          <ChatThread messages={messages} />
        </div>
      </section>
    </main>
  );
}
