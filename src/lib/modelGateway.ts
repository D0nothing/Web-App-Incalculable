import type { ChatAction, PolicyDecision } from "./types";

type LlmConfig = {
  provider: string;
  model: string;
  apiKey?: string;
  baseUrl: string;
};

function getLlmConfig(): LlmConfig {
  return {
    provider: process.env.LLM_PROVIDER ?? "openai",
    model: process.env.LLM_MODEL ?? "gpt-4.1-mini",
    apiKey: process.env.LLM_API_KEY,
    baseUrl: process.env.LLM_BASE_URL ?? "https://api.openai.com/v1"
  };
}

export async function generateAssistantReply(input: {
  message: string;
  systemPrompt: string;
  policy: PolicyDecision;
  action?: ChatAction;
  documentText?: string;
}): Promise<string> {
  const config = getLlmConfig();
  const prefix =
    input.action === "more_direct"
      ? "Reponse directe"
      : input.action === "verify"
        ? "Verification"
        : "Reponse";

  if (config.apiKey) {
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
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`LLM request failed: ${response.status} ${errorText}`);
    }

    const payload = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = payload.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("LLM response did not contain any assistant text.");
    }

    return content;
  }

  const documentNote = input.documentText ? " Un document a ete pris en compte." : "";

  return `${prefix} simulée (${config.provider}/${config.model}) : ${input.message.trim() || "message vide"}.${documentNote} Politique active: engagement=${input.policy.engagementLevel}, friction=${input.policy.friction}.`;
}
