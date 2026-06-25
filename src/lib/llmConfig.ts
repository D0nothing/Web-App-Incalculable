export type LlmConfig = {
  provider: string;
  model: string;
  apiKey?: string;
  baseUrl: string;
};

export function getLlmConfig(): LlmConfig {
  const provider = process.env.LLM_PROVIDER ?? "openai";
  const isBigPickle = provider.toLowerCase().replace(/\s+/g, "-") === "big-pickle";

  return {
    provider,
    model:
      process.env.LLM_MODEL ??
      (isBigPickle ? process.env.BIG_PICKLE_MODEL ?? "big-pickle" : "gpt-4.1-mini"),
    apiKey:
      process.env.LLM_API_KEY ??
      (isBigPickle ? process.env.OPENCODE_API_KEY ?? process.env.BIG_PICKLE_API_KEY : undefined),
    baseUrl:
      process.env.LLM_BASE_URL ??
      (isBigPickle
        ? process.env.OPENCODE_BASE_URL ?? process.env.BIG_PICKLE_BASE_URL ?? "https://opencode.ai/zen/v1"
        : "https://api.openai.com/v1")
  };
}
