import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are Procurement Paul, a world-class UK public sector bid writer with 20+ years of experience winning contracts for businesses. 

You write high-scoring tender responses that:
- Directly reference the specification clauses and scoring criteria
- Use the client's own language from the tender documents
- Provide specific, measurable evidence and examples
- Stay within word limits
- Follow the METHOD → EVIDENCE → OUTCOME structure
- Score maximum marks by addressing every scoring criterion
- Include relevant statistics, percentages, and named examples
- Reference appendices naturally where relevant

You write in a professional, confident tone. Never use generic filler. Every sentence must add value.`;

export async function POST(request: NextRequest) {
  try {
    const {
      question,
      specRef,
      wordLimit,
      scoreWeight,
      scoringCriteria,
      keyThemes,
      companyContext,
      relevantQA,
      tenderContext,
    } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "No question provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const userPrompt = `Write a high-scoring tender response for the following question.

TENDER QUESTION:
${question}

SPECIFICATION REFERENCE: ${specRef || "Not specified"}
WORD LIMIT: ${wordLimit || "No limit specified"} words
SCORE WEIGHT: ${scoreWeight || "Unknown"}%

SCORING CRITERIA:
${scoringCriteria ? JSON.stringify(scoringCriteria, null, 2) : "Not provided — write to achieve maximum marks"}

KEY THEMES TO ADDRESS:
${keyThemes ? keyThemes.join(", ") : "Use your expertise to identify themes"}

COMPANY CONTEXT & CAPABILITIES:
${companyContext || "General UK business providing professional services"}

RELEVANT PAST Q&A FROM KNOWLEDGE BASE:
${relevantQA || "None provided"}

TENDER CONTEXT:
${tenderContext || "UK public sector tender"}

INSTRUCTIONS:
1. Write the full response — do NOT include headings, just the prose response
2. Stay within the word limit (aim for 90-95% of the limit)
3. Reference the specification directly where relevant
4. Include specific evidence, KPIs, and named examples
5. Use the METHOD → EVIDENCE → OUTCOME structure throughout
6. End with a strong closing statement about delivering outcomes for the client
7. Use the client's language and terminology from the tender context

Write the response now:`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: Math.min((wordLimit || 500) * 2, 4000),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI error:", error);
      return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
    }

    const data = await response.json();
    const generatedResponse = data.choices[0]?.message?.content;

    if (!generatedResponse) {
      return NextResponse.json({ error: "No response generated" }, { status: 500 });
    }

    // Count words
    const wordCount = generatedResponse.trim().split(/\s+/).filter(Boolean).length;

    return NextResponse.json({
      success: true,
      response: generatedResponse,
      wordCount,
      tokensUsed: data.usage?.total_tokens,
    });

  } catch (error) {
    console.error("Generate response error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
