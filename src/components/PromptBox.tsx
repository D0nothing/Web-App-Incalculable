"use client";

type PromptBoxProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
};

export function PromptBox({
  value,
  onChange,
  onSubmit,
  isLoading
}: PromptBoxProps) {
  return (
    <section className="prompt-box">
      <label className="sr-only" htmlFor="prompt">Votre demande</label>
      <textarea
        id="prompt"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Écrivez ici…"
        rows={4}
      />
      <button type="button" className="send-button" onClick={onSubmit} disabled={isLoading} aria-label="Envoyer la demande">
        {isLoading ? "…" : "↗"}
      </button>
    </section>
  );
}
