import type { ChatMessage } from "@/lib/types";

import { MessageBubble } from "./MessageBubble";

type ChatThreadProps = {
  messages: ChatMessage[];
};

export function ChatThread({ messages }: ChatThreadProps) {
  return (
    <section className="chat-thread" aria-live="polite">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </section>
  );
}
