import type { ChatAction } from "@/lib/types";

type ActionButtonsProps = {
  action: ChatAction;
  onChange: (action: ChatAction) => void;
};

export function ActionButtons({ action, onChange }: ActionButtonsProps) {
  return (
    <div className="action-row">
      <button type="button" className={action === "normal" ? "chip active" : "chip"} onClick={() => onChange("normal")}>
        Normal
      </button>
      <button type="button" className={action === "more_direct" ? "chip active" : "chip"} onClick={() => onChange("more_direct")}>
        Reponse plus directe
      </button>
      <button type="button" className={action === "verify" ? "chip active" : "chip"} onClick={() => onChange("verify")}>
        Verifier
      </button>
    </div>
  );
}
