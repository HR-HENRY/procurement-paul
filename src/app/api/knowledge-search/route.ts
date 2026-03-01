import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are a knowledge retrieval assistant for Procurement Paul. 
Your job is to search through company knowledge base documents and find the most relevant content for a given tender question.
Return relevant excerpts, evidence, statistics, and examples that would help write a high-scoring tender response.
Focus on: measurable outcomes, named contracts/clients, certifications, KPIs, and specific methodologies.`;

export async function POST(request: NextRequest) {
  try {
    const { question, documents } = await request.json();

    if (!question || !documents?.length) {
      return NextResponse.json({ relevant: [], summary: "" });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const docsText = documents
      .map((d: { name: string; content: string }) => `[${d.name}]\n${d.content}`)
      .join("\n\n---\n\n")
      .substring(0, 20000);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `TENDER QUESTION: ${question}

KNOWLEDGE BASE DOCUMENTS:
${docsText}

Find and return the most relevant evidence, examples, statistics and content from these documents that would help answer this tender question. Return as JSON:
{
  "relevantExcerpts": ["excerpt 1", "excerpt 2"],
  "keyEvidence": ["statistic or evidence 1", "statistic or evidence 2"],
  "suggestedApproach": "Brief suggested approach for this question based on available evidence",
  "relevanceScore": 0-100
}`,
          },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Search failed" }, { status: 500 });
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0]?.message?.content || "{}");

    return NextResponse.json({ success: true, ...result });

  } catch (error) {
    console.error("Knowledge search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
