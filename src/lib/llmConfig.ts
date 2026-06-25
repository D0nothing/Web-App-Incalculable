export type LlmConfig = {
  provider: "big-pickle";
  model: string;
  apiKey?: string;
  baseUrl: string;
};

export function getLlmConfig(): LlmConfig {
  return {
    provider: "big-pickle",
    model: process.env.LLM_MODEL ?? process.env.BIG_PICKLE_MODEL ?? "big-pickle",
    apiKey: process.env.LLM_API_KEY ?? process.env.OPENCODE_API_KEY ?? process.env.BIG_PICKLE_API_KEY,
    baseUrl: process.env.LLM_BASE_URL ?? process.env.OPENCODE_BASE_URL ?? "https://opencode.ai/zen/v1"
  };
}
