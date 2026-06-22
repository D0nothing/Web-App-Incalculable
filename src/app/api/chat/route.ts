import { NextResponse } from "next/server";

import { parseUploadedDocument } from "@/lib/documentParser";
import { classifyPrompt } from "@/lib/incalculablePolicy";
import { generateAssistantReply } from "@/lib/modelGateway";
import { getActiveParchemin } from "@/lib/parcheminRegistry";
import { buildSystemPrompt } from "@/lib/promptBuilder";
import type { ChatRequestBody } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const userPrompt = body.message?.trim();

    if (!userPrompt) {
      return NextResponse.json({ error: "Message manquant." }, { status: 400 });
    }

    const documentText = body.documentText ? parseUploadedDocument("document.md", body.documentText) : undefined;
    const policy = classifyPrompt({
      userPrompt,
      documentText,
      action: body.action
    });
    const parchemin = await getActiveParchemin();
    const systemPrompt = buildSystemPrompt({
      parchemin,
      policy,
      action: body.action
    });
    const reply = await generateAssistantReply({
      message: userPrompt,
      systemPrompt,
      policy,
      action: body.action,
      documentText
    });

    return NextResponse.json({
      reply,
      policy
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Une erreur inattendue est survenue.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
