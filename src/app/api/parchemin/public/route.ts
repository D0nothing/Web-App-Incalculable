import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

async function readPublicDoc(fileName: string) {
  const filePath = path.join(process.cwd(), "config", "public", fileName);
  return fs.readFile(filePath, "utf-8");
}

export async function GET() {
  try {
    const [manifesto, protocol] = await Promise.all([
      readPublicDoc("1-manifeste.md"),
      readPublicDoc("2-protocole.md")
    ]);

    return NextResponse.json({
      manifesto,
      protocol
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossible de charger les documents publics.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
