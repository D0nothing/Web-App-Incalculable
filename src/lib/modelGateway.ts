import { getLlmConfig } from "./llmConfig";
import type { ChatAction, PolicyDecision } from "./types";

export async function generateAssistantReply(input: {
  message: string;
  systemPrompt: string;
  policy: PolicyDecision;
  action?: ChatAction;
  documentText?: string;
}): Promise<string> {
  const config = getLlmConfig();

  if (!config.apiKey) {
    throw new Error("Big Pickle API key is missing. Add LLM_API_KEY in .env.local or in Vercel environment variables.");
  }

  const response = await fetch(`${config.baseUrl.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: "system", content: input.systemPrompt },
        { role: "user", content: input.message }
      ],
      temperature: 0.2,
      max_tokens: 1200
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Big Pickle request failed: ${response.status} ${errorText}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Big Pickle response did not contain any assistant text.");
  }

  return content;
}
