import fs from "fs/promises";
import path from "path";

import type { ParcheminRegistryConfig } from "./types";

const registryConfig: ParcheminRegistryConfig = {
  source: "file",
  filePath: path.join(process.cwd(), "config", "parchemin.md")
};

export async function getActiveParchemin(): Promise<string> {
  if (registryConfig.source !== "file") {
    throw new Error("Database parchemin registry is not configured yet.");
  }

  const filePath = registryConfig.filePath ?? path.join(process.cwd(), "config", "parchemin.md");
  const content = await fs.readFile(filePath, "utf-8");

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

  const filePath = registryConfig.filePath ?? path.join(process.cwd(), "config", "parchemin.md");
  await fs.writeFile(filePath, content.replace(/\r\n/g, "\n"), "utf-8");
}
