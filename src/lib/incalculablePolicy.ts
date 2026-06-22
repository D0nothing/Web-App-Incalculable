import type { PolicyDecision } from "./types";

function containsAny(input: string, words: string[]): boolean {
  return words.some((word) => input.includes(word));
}

export function classifyPrompt(input: {
  userPrompt: string;
  documentText?: string;
  action?: "normal" | "more_direct" | "verify";
}): PolicyDecision {
  const text = `${input.userPrompt} ${input.documentText ?? ""}`.toLowerCase();
  const isSensitive = containsAny(text, ["password", "secret", "sante", "health", "bank", "card", "ssn"]);
  const asksForProof = containsAny(text, ["verify", "vérifier", "check", "preuve", "evidence"]);
  const requiresDecision = containsAny(text, ["choose", "choisir", "should i", "dois-je", "do we"]);

  return {
    engagementLevel: asksForProof ? "high" : requiresDecision ? "medium" : "low",
    friction: input.action === "verify" || asksForProof ? "high" : input.action === "more_direct" ? "low" : "medium",
    requireUserPosition: requiresDecision || input.action === "verify",
    allowDirectAnswer: input.action !== "verify",
    requireVerificationHint: input.action === "verify" || asksForProof,
    sensitiveDataWarning: isSensitive
  };
}
