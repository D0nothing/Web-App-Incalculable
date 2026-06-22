import type { ChatMessage } from "@/lib/types";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <article className={message.role === "user" ? "bubble bubble-user" : "bubble bubble-assistant"}>
      <div className="bubble-role">{message.role === "user" ? "Vous" : message.role === "system" ? "Systeme" : "Assistant"}</div>
      <p>{message.content}</p>
    </article>
  );
}
