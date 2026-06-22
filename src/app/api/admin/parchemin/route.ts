import { NextResponse } from "next/server";

import { getParcheminMetadata, saveActiveParchemin } from "@/lib/parcheminRegistry";

export async function GET() {
  try {
    const metadata = await getParcheminMetadata();
    return NextResponse.json(metadata);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossible de charger le Parchemin.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as { content?: string };

    if (!body.content || body.content.trim().length < 1) {
      return NextResponse.json({ error: "Contenu manquant." }, { status: 400 });
    }

    await saveActiveParchemin(body.content);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossible de sauvegarder le Parchemin.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
