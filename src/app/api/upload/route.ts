import { NextResponse } from "next/server";

import { parseUploadedDocument } from "@/lib/documentParser";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Aucun fichier fourni." }, { status: 400 });
    }

    const content = await file.text();
    const parsed = parseUploadedDocument(file.name, content);

    return NextResponse.json({
      fileName: file.name,
      content: parsed
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossible de traiter le fichier.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
