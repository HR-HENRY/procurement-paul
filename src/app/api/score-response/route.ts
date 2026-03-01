import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are a senior public sector tender evaluator with 20 years of experience scoring bids for UK government contracts. 

You score responses objectively against the provided scoring criteria, using the standard 0–5 scale:
- 5: Fully compliant, comprehensive, specific evidence, exceeds requirements
- 4: Compliant with minor gaps, good evidence, meets most requirements  
- 3: Broadly compliant but lacks specificity or evidence in places
- 2: Partially compliant, significant gaps, limited evidence
- 1: Minimal compliance, major gaps, little relevant evidence
- 0: Non-compliant or no response

Return detailed, constructive feedback that helps the bidder improve their score.`;

export async function POST(request: NextRequest) {
  try {
    const {
      question,
      response,
      specRef,
      wordLimit,
      scoreWeight,
      scoringCriteria,
      tenderContext,
    } = await request.json();

    if (!question || !response) {
      return NextResponse.json({ error: "Question and response required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const wordCount = response.trim().split(/\s+/).filter(Boolean).length;

    const prompt = `Score this tender response and provide detailed improvement feedback.

QUESTION: ${question}
SPECIFICATION REF: ${specRef || "Not specified"}
WORD LIMIT: ${wordLimit || "Not specified"} words (response is ${wordCount} words)
SCORE WEIGHT: ${scoreWeight || "Unknown"}%

SCORING CRITERIA:
${scoringCriteria ? JSON.stringify(scoringCriteria, null, 2) : "Use standard public sector quality scoring criteria"}

TENDER CONTEXT: ${tenderContext || "UK public sector tender"}

RESPONSE TO SCORE:
${response}

Return JSON with this exact structure:
{
  "score": 4.5,
  "maxScore": 5,
  "percentage": 90,
  "grade": "Excellent",
  "summary": "One sentence overall assessment",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["specific improvement 1", "specific improvement 2"],
  "suggestedAddition": "One specific paragraph or sentence that would push this to a 5/5",
  "wordCountFeedback": "Feedback on word count usage",
  "criteriaScores": [
    {"criterion": "Evidence & Examples", "score": 5, "comment": "Strong named examples"},
    {"criterion": "Relevance to Specification", "score": 4, "comment": "Could reference clauses more directly"},
    {"criterion": "Measurable Outcomes", "score": 5, "comment": "Excellent KPIs provided"},
    {"criterion": "Clarity & Structure", "score": 4, "comment": "Well structured but could use sub-headings"}
  ]
}

Grade must be one of: Outstanding (95-100%), Excellent (85-94%), Strong (75-84%), Good (65-74%), Needs Work (50-64%), Poor (0-49%)`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Scoring failed" }, { status: 500 });
    }

    const data = await res.json();
    const result = JSON.parse(data.choices[0]?.message?.content || "{}");

    return NextResponse.json({
      success: true,
      ...result,
      wordCount,
      tokensUsed: data.usage?.total_tokens,
    });

  } catch (error) {
    console.error("Score response error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
