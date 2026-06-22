import { describe, expect, it } from "vitest";

import { parseUploadedDocument } from "@/lib/documentParser";

describe("parseUploadedDocument", () => {
  it("accepts txt and md documents", () => {
    expect(parseUploadedDocument("notes.txt", " hello ")).toBe("hello");
    expect(parseUploadedDocument("notes.md", "# titre")).toBe("# titre");
  });

  it("rejects other file types", () => {
    expect(() => parseUploadedDocument("notes.pdf", "nope")).toThrow("Only .txt and .md documents are supported for now.");
  });
});
