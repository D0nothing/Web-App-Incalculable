export type PolicyDecision = {
  engagementLevel: "low" | "medium" | "high";
  friction: "low" | "medium" | "high";
  requireUserPosition: boolean;
  allowDirectAnswer: boolean;
  requireVerificationHint: boolean;
  sensitiveDataWarning: boolean;
};

export type ChatAction = "normal" | "more_direct" | "verify";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export type ParcheminVersion = {
  id: string;
  title: string;
  content: string;
  version: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ParcheminSource = "file" | "database";

export type ParcheminRegistryConfig = {
  source: ParcheminSource;
  filePath?: string;
  filePaths?: string[];
  editable?: boolean;
};

export type ChatRequestBody = {
  message?: string;
  action?: ChatAction;
  documentText?: string;
};

export type ChatResponseBody = {
  reply: string;
  systemPromptPreview: string;
  policy: PolicyDecision;
};
