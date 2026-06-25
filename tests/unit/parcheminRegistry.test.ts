import { describe, expect, it } from "vitest";

import { getActiveParchemin } from "@/lib/parcheminRegistry";

describe("parchemin registry", () => {
  it("loads the protected Parchemin files from the dedicated folder", async () => {
    const content = await getActiveParchemin();

    expect(content).toContain("01-Contexte d'intention ( Manifesto ).md");
    expect(content).toContain("02- Colonne vertéblrale (coeur-invariant).md");
    expect(content).toContain("03-Protocole de fonctionnement ( runtime).yaml");
    expect(content).toContain("04- Tests.yaml");
  });
});
