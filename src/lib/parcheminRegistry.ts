import fs from "fs/promises";
import path from "path";

import type { ParcheminRegistryConfig } from "./types";

const parcheminDirectory = path.join(process.cwd(), "parchemin");

const registryConfig: ParcheminRegistryConfig = {
  source: "file",
  editable: false,
  filePaths: [
    path.join(parcheminDirectory, "01-Contexte d'intention ( Manifesto ).md"),
    path.join(parcheminDirectory, "02- Colonne vertéblrale (coeur-invariant).md"),
    path.join(parcheminDirectory, "03-Protocole de fonctionnement ( runtime).yaml"),
    path.join(parcheminDirectory, "04- Tests.yaml")
  ]
};

export async function getActiveParchemin(): Promise<string> {
  if (registryConfig.source !== "file") {
    throw new Error("Database parchemin registry is not configured yet.");
  }

  const filePaths = registryConfig.filePaths ?? [
    registryConfig.filePath ?? path.join(parcheminDirectory, "instructions.md")
  ];

  const sections = await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await fs.readFile(filePath, "utf-8");
      const filename = path.basename(filePath);

      if (!content || content.trim().length < 20) {
        throw new Error(`Parchemin file is missing or too short: ${filename}`);
      }

      return `# Source Parchemin — ${filename}\n\n${content.trim()}`;
    })
  );

  const content = sections.join("\n\n---\n\n");

  if (!content || content.trim().length < 100) {
    throw new Error("Parchemin instructions are missing or too short.");
  }

  return content;
}

export async function getParcheminMetadata() {
  const content = await getActiveParchemin();

  return {
    content,
    source: registryConfig.source
  };
}

export async function saveActiveParchemin(content: string): Promise<void> {
  if (registryConfig.source !== "file") {
    throw new Error("Parchemin updates are only supported for the file registry.");
  }

  if (!registryConfig.editable) {
    throw new Error("The active Parchemin files are protected and cannot be edited from the application.");
  }

  const filePath = registryConfig.filePath ?? path.join(process.cwd(), "parchemin", "instructions.md");
  await fs.writeFile(filePath, content.replace(/\r\n/g, "\n"), "utf-8");
}
