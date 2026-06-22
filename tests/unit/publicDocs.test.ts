import { describe, expect, it } from "vitest";

import { loadPublicParcheminDocs, parseMarkdownDoc } from "@/lib/publicDocs";

describe("public docs parsing", () => {
  it("splits a markdown document into anchored sections", () => {
    const parsed = parseMarkdownDoc("# Title\n\n## One\nAlpha\n\n## Two\nBeta", "manifesto");

    expect(parsed.title).toBe("Title");
    expect(parsed.sections).toHaveLength(3);
    expect(parsed.sections[0].id).toContain("manifesto-title-1");
    expect(parsed.sections[1].id).toContain("manifesto-one-2");
    expect(parsed.sections[1].content).toContain("Alpha");
  });

  it("loads the public documents from disk", async () => {
    const docs = await loadPublicParcheminDocs();

    expect(docs.manifesto.sections.length).toBeGreaterThan(3);
    expect(docs.protocol.sections.length).toBeGreaterThan(5);
  });
});
