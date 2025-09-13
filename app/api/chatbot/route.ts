import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const apiKey = "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";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
    }),
  });
  const data = await response.json();
  if (data.error) {
    console.error("OpenAI API error:", data.error);
  }
  return NextResponse.json(data);
}