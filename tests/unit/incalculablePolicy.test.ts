import { describe, expect, it } from "vitest";

import { classifyPrompt } from "@/lib/incalculablePolicy";

describe("classifyPrompt", () => {
  it("keeps ordinary tasks in light friction", () => {
    const decision = classifyPrompt({
      userPrompt: "Corrige cette phrase.",
      documentText: "Texte neutre"
    });

    expect(decision.friction).toBe("medium");
    expect(decision.engagementLevel).toBe("low");
  });

  it("detects verification requests", () => {
    const decision = classifyPrompt({
      userPrompt: "Aide-moi à vérifier cette réponse."
    });

    expect(decision.friction).toBe("high");
    expect(decision.requireVerificationHint).toBe(true);
    expect(decision.allowDirectAnswer).toBe(true);
  });
});
