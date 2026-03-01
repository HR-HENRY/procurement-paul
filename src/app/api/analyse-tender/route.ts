import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are Procurement Paul, an expert AI assistant specialising in public sector tender writing and bid management in the UK. 

Your job is to analyse tender documents and extract:
1. All questions that require written responses
2. The specification reference for each question (section/clause numbers)
3. Word limits for each question
4. Scoring weighting/percentage for each question
5. The scoring criteria (what makes a 5/5 vs 1/5 answer)
6. Any mandatory requirements or pass/fail criteria
7. Key themes the evaluators are looking for

Return structured JSON only. Be thorough and precise.`;

export async function POST(request: NextRequest) {
  try {
    const { content, filename } = await request.json();

    if (!content) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

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
          {
            role: "user",
            content: `Analyse this tender document and extract all questions and requirements. Return as JSON with this structure:

{
  "tenderTitle": "string",
  "clientName": "string", 
  "submissionDeadline": "string or null",
  "estimatedValue": "string or null",
  "totalWordLimit": number or null,
  "sections": [
    {
      "ref": "Q1",
      "question": "Full question text",
      "specificationRef": "Section X.X - Title",
      "wordLimit": 500,
      "scoreWeight": 20,
      "maxScore": 5,
      "scoringCriteria": {
        "5": "Description of a 5/5 answer",
        "4": "Description of a 4/5 answer", 
        "3": "Description of a 3/5 answer",
        "1": "Description of a 1/5 answer"
      },
      "keyThemes": ["theme1", "theme2"],
      "mandatory": false
    }
  ],
  "mandatoryRequirements": ["requirement 1", "requirement 2"],
  "evaluationCriteria": "Overall evaluation approach description"
}

Document filename: ${filename}

Document content:
${content.substring(0, 15000)}`
          }
        ],
        temperature: 0.2,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI error:", error);
      return NextResponse.json({ error: "AI analysis failed" }, { status: 500 });
    }

    const data = await response.json();
    const analysisText = data.choices[0]?.message?.content;

    if (!analysisText) {
      return NextResponse.json({ error: "No analysis returned" }, { status: 500 });
    }

    const analysis = JSON.parse(analysisText);

    return NextResponse.json({
      success: true,
      analysis,
      tokensUsed: data.usage?.total_tokens,
    });

  } catch (error) {
    console.error("Analyse tender error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
