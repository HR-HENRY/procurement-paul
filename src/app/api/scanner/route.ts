import { NextRequest, NextResponse } from "next/server";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TenderResult {
  id: string;
  title: string;
  buyer: string;
  value: number | null;
  deadline: string;
  published: string;
  source: string;
  url: string;
  description: string;
  matchedKeywords: string[];
  relevanceScore: number;
}

// ─── Relevance Scoring ───────────────────────────────────────────────────────

function scoreRelevance(title: string, description: string, keywords: string[]): { score: number; matched: string[] } {
  const text = `${title} ${description}`.toLowerCase();
  const matched: string[] = [];
  let score = 0;

  for (const kw of keywords) {
    const kwLower = kw.toLowerCase();
    if (text.includes(kwLower)) {
      matched.push(kw);
      // Title matches score higher
      if (title.toLowerCase().includes(kwLower)) {
        score += 25;
      } else {
        score += 15;
      }
    }
  }

  // Bonus for multiple keyword matches
  if (matched.length >= 3) score += 10;
  if (matched.length >= 5) score += 10;

  return { score: Math.min(score, 100), matched };
}

// ─── Contracts Finder API ────────────────────────────────────────────────────

async function searchContractsFinder(keywords: string[]): Promise<TenderResult[]> {
  const results: TenderResult[] = [];

  for (const keyword of keywords.slice(0, 3)) { // Limit API calls
    try {
      const response = await fetch(
        `https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?q=${encodeURIComponent(keyword)}&limit=10`,
        { headers: { "Accept": "application/json" }, next: { revalidate: 0 } }
      );

      if (!response.ok) continue;
      const data = await response.json();
      const releases = data?.releases ?? [];

      for (const release of releases) {
        const tender = release?.tender ?? {};
        const title = tender?.title ?? release?.ocid ?? "Untitled";
        const description = tender?.description ?? "";
        const deadline = tender?.tenderPeriod?.endDate ?? "";
        const published = release?.date ?? "";
        const buyer = release?.buyer?.name ?? "Unknown Buyer";
        const value = tender?.value?.amount ?? null;
        const url = `https://www.contractsfinder.service.gov.uk/Notice/${release?.ocid}`;

        const { score, matched } = scoreRelevance(title, description, keywords);
        if (score < 50 || matched.length === 0) continue;

        results.push({
          id: release?.ocid ?? Math.random().toString(),
          title,
          buyer,
          value,
          deadline: deadline ? new Date(deadline).toISOString().split("T")[0] : "",
          published: published ? new Date(published).toISOString().split("T")[0] : "",
          source: "contracts-finder",
          url,
          description: description.substring(0, 400),
          matchedKeywords: matched,
          relevanceScore: score,
        });
      }
    } catch {
      // Continue with next keyword if one fails
    }
  }

  // Deduplicate by id
  const seen = new Set<string>();
  return results.filter((r) => {
    if (seen.has(r.id)) return false;
    seen.add(r.id);
    return true;
  });
}

// ─── Find a Tender API ───────────────────────────────────────────────────────

async function searchFindATender(keywords: string[]): Promise<TenderResult[]> {
  const results: TenderResult[] = [];

  try {
    const query = keywords.slice(0, 3).join(" OR ");
    const response = await fetch(
      `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages?q=${encodeURIComponent(query)}&limit=10`,
      { headers: { "Accept": "application/json" }, next: { revalidate: 0 } }
    );

    if (!response.ok) return results;
    const data = await response.json();
    const releases = data?.releases ?? [];

    for (const release of releases) {
      const tender = release?.tender ?? {};
      const title = tender?.title ?? "Untitled";
      const description = tender?.description ?? "";
      const deadline = tender?.tenderPeriod?.endDate ?? "";
      const published = release?.date ?? "";
      const buyer = release?.buyer?.name ?? "Unknown Buyer";
      const value = tender?.value?.amount ?? null;
      const url = `https://www.find-tender.service.gov.uk/Notice/${release?.ocid}`;

      const { score, matched } = scoreRelevance(title, description, keywords);
      if (score < 50 || matched.length === 0) continue;

      results.push({
        id: release?.ocid ?? Math.random().toString(),
        title,
        buyer,
        value,
        deadline: deadline ? new Date(deadline).toISOString().split("T")[0] : "",
        published: published ? new Date(published).toISOString().split("T")[0] : "",
        source: "find-a-tender",
        url,
        description: description.substring(0, 400),
        matchedKeywords: matched,
        relevanceScore: score,
      });
    }
  } catch {
    // Fail gracefully
  }

  return results;
}

// ─── Route Handler ───────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const keywords: string[] = body?.keywords ?? ["heating", "gas boiler", "boiler servicing"];

    if (!keywords.length) {
      return NextResponse.json({ error: "No keywords provided" }, { status: 400 });
    }

    // Run both portal searches in parallel
    const [contractsFinderResults, findATenderResults] = await Promise.allSettled([
      searchContractsFinder(keywords),
      searchFindATender(keywords),
    ]);

    const allResults: TenderResult[] = [
      ...(contractsFinderResults.status === "fulfilled" ? contractsFinderResults.value : []),
      ...(findATenderResults.status === "fulfilled" ? findATenderResults.value : []),
    ];

    // Sort by relevance score
    allResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return NextResponse.json({
      success: true,
      scannedAt: new Date().toISOString(),
      keywords,
      totalFound: allResults.length,
      results: allResults,
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Scanner failed", detail: String(error) },
      { status: 500 }
    );
  }
}

// GET — health check / last scan info
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Procurement Paul Opportunity Scanner",
    portals: ["contracts-finder", "find-a-tender"],
    usage: "POST with { keywords: string[] } to run a scan",
  });
}
