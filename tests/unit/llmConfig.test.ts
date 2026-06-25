import { afterEach, describe, expect, it } from "vitest";

import { getLlmConfig } from "@/lib/llmConfig";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("llm config", () => {
  it("uses the simple Big Pickle configuration", () => {
    process.env.LLM_MODEL = "big-pickle-test";
    process.env.LLM_API_KEY = "test-key";
    process.env.LLM_BASE_URL = "https://opencode.test/v1";

    expect(getLlmConfig()).toEqual({
      provider: "big-pickle",
      model: "big-pickle-test",
      apiKey: "test-key",
      baseUrl: "https://opencode.test/v1"
    });
  });

  it("falls back to OpenCode Zen dedicated variables", () => {
    delete process.env.LLM_MODEL;
    delete process.env.LLM_API_KEY;
    delete process.env.LLM_BASE_URL;
    process.env.BIG_PICKLE_MODEL = "big-pickle-lab";
    process.env.OPENCODE_API_KEY = "opencode-key";
    process.env.OPENCODE_BASE_URL = "https://opencode.ai/zen/v1";

    expect(getLlmConfig()).toEqual({
      provider: "big-pickle",
      model: "big-pickle-lab",
      apiKey: "opencode-key",
      baseUrl: "https://opencode.ai/zen/v1"
    });
  });
});
