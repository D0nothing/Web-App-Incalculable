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
      <label className="prompt-label" htmlFor="prompt">
        Votre demande
      </label>
      <textarea
        id="prompt"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Expliquez ce que vous voulez faire..."
        rows={5}
      />
      <button type="button" className="primary-button" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? "Envoi..." : "Envoyer"}
      </button>
    </section>
  );
}
