import fs from "fs/promises";
import path from "path";

export type PublicDocSection = {
  id: string;
  title: string;
  level: number;
  content: string;
};

export type PublicDoc = {
  slug: "manifesto" | "protocol";
  title: string;
  sections: PublicDocSection[];
  raw: string;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseMarkdownDoc(raw: string, slug: PublicDoc["slug"]): PublicDoc {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const titleLine = lines.find((line) => line.startsWith("# "));
  const title = titleLine?.slice(2).trim() ?? slug;

  const sections: PublicDocSection[] = [];
  let currentTitle = "";
  let currentLevel = 0;
  let currentLines: string[] = [];

  const flush = () => {
    if (!currentTitle) {
      return;
    }

    const content = currentLines.join("\n").trim();
    sections.push({
      id: `${slug}-${slugify(currentTitle)}-${sections.length + 1}`,
      title: currentTitle,
      level: currentLevel,
      content
    });
  };

  for (const line of lines) {
    const heading = /^(#{1,6})\s+(.*)$/.exec(line);

    if (heading) {
      const level = heading[1].length;
      const headingText = heading[2].trim();

      if (level === 1) {
        if (!currentTitle) {
          currentTitle = headingText;
          currentLevel = level;
          currentLines = [];
        }
        continue;
      }

      flush();
      currentTitle = headingText;
      currentLevel = level;
      currentLines = [];
      continue;
    }

    currentLines.push(line);
  }

  flush();

  return {
    slug,
    title,
    sections,
    raw
  };
}

export async function loadPublicParcheminDocs(): Promise<{
  manifesto: PublicDoc;
  protocol: PublicDoc;
}> {
  const manifestoPath = path.join(process.cwd(), "config", "public", "1-manifeste.md");
  const protocolPath = path.join(process.cwd(), "config", "public", "2-protocole.md");

  const [manifestoRaw, protocolRaw] = await Promise.all([
    fs.readFile(manifestoPath, "utf-8"),
    fs.readFile(protocolPath, "utf-8")
  ]);

  return {
    manifesto: parseMarkdownDoc(manifestoRaw, "manifesto"),
    protocol: parseMarkdownDoc(protocolRaw, "protocol")
  };
}
