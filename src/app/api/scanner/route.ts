import { NextRequest, NextResponse } from "next/server";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TenderResult {
  id: string;
  title: string;
  buyer: string;
  value: number | null;
  deadline: string;
  published: string;
  source: "find-a-tender" | "contracts-finder";
  url: string;
  description: string;
  matchedKeywords: string[];
  relevanceScore: number;
  contractType: string;
  location: string;
  isSMESuitable: boolean;
}

// ─── Relevance Scoring ───────────────────────────────────────────────────────

function scoreRelevance(
  title: string,
  description: string,
  keywords: string[]
): { score: number; matched: string[] } {
  const text = `${title} ${description}`.toLowerCase();
  const matched: string[] = [];
  let score = 0;

  for (const kw of keywords) {
    const kwLower = kw.toLowerCase();
    if (text.includes(kwLower)) {
      matched.push(kw);
      score += title.toLowerCase().includes(kwLower) ? 25 : 15;
    }
  }

  if (matched.length >= 3) score += 10;
  if (matched.length >= 5) score += 10;

  return { score: Math.min(score, 100), matched };
}

// ─── Contracts Finder v2 API ─────────────────────────────────────────────────
// Docs: https://www.contractsfinder.service.gov.uk/apidocumentation
// Search endpoint: POST api/rest/2/search_notices/json

async function searchContractsFinder(keywords: string[]): Promise<TenderResult[]> {
  const results: TenderResult[] = [];
  const searchTerms = keywords.join(" ");

  try {
    const body = {
      // Free-text search across title + description
      Keywords: searchTerms,
      // Only return active opportunities (not awarded/closed)
      NoticeType: "Contract Notice",
      // Return most recent first
      SortBy: "PUBLISHED_DATE",
      SortOrder: "DESC",
      Size: 20,
      From: 0,
    };

    const response = await fetch(
      "https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search",
      {
        method: "GET",
        headers: { Accept: "application/json" },
        next: { revalidate: 0 },
      }
    );

    // v2 search via POST
    const v2Response = await fetch(
      "https://www.contractsfinder.service.gov.uk/api/rest/2/search_notices/json",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        next: { revalidate: 0 },
      }
    );

    if (!v2Response.ok) {
      // Fallback to v1 OCDS search if v2 fails
      const fallback = await fetch(
        `https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?q=${encodeURIComponent(searchTerms)}&limit=20`,
        { headers: { Accept: "application/json" }, next: { revalidate: 0 } }
      );
      if (!fallback.ok) return results;

      const data = await fallback.json();
      const releases = data?.releases ?? [];

      for (const release of releases) {
        const tender = release?.tender ?? {};
        const title = tender?.title ?? "Untitled";
        const description = tender?.description ?? "";
        const { score, matched } = scoreRelevance(title, description, keywords);
        if (score < 40 || matched.length === 0) continue;

        results.push({
          id: release?.ocid ?? Math.random().toString(36),
          title,
          buyer: release?.buyer?.name ?? "Unknown Buyer",
          value: tender?.value?.amount ?? null,
          deadline: tender?.tenderPeriod?.endDate
            ? new Date(tender.tenderPeriod.endDate).toISOString().split("T")[0]
            : "",
          published: release?.date
            ? new Date(release.date).toISOString().split("T")[0]
            : "",
          source: "contracts-finder",
          url: `https://www.contractsfinder.service.gov.uk/Notice/Show/${release?.ocid}`,
          description: description.substring(0, 500),
          matchedKeywords: matched,
          relevanceScore: score,
          contractType: tender?.procurementMethod ?? "Contract",
          location: release?.tender?.deliveryLocations?.[0]?.description ?? "UK",
          isSMESuitable: release?.tender?.isSuitableForSme ?? false,
        });
      }
      return results;
    }

    // Parse v2 response
    const v2Data = await v2Response.json();
    const notices = v2Data?.Notices ?? v2Data?.notices ?? [];

    for (const notice of notices) {
      const title = notice?.Title ?? notice?.title ?? "Untitled";
      const description = notice?.Description ?? notice?.description ?? "";
      const { score, matched } = scoreRelevance(title, description, keywords);
      if (score < 40 || matched.length === 0) continue;

      const noticeId = notice?.Id ?? notice?.id ?? Math.random().toString(36);

      results.push({
        id: `cf-${noticeId}`,
        title,
        buyer: notice?.OrganisationName ?? notice?.organisationName ?? "Unknown Buyer",
        value: notice?.Value ?? notice?.value ?? null,
        deadline: notice?.DeadlineDate ?? notice?.deadlineDate
          ? new Date(notice.DeadlineDate ?? notice.deadlineDate).toISOString().split("T")[0]
          : "",
        published: notice?.PublishedDate ?? notice?.publishedDate
          ? new Date(notice.PublishedDate ?? notice.publishedDate).toISOString().split("T")[0]
          : "",
        source: "contracts-finder",
        url: `https://www.contractsfinder.service.gov.uk/Notice/Show/${noticeId}`,
        description: description.substring(0, 500),
        matchedKeywords: matched,
        relevanceScore: score,
        contractType: notice?.ProcedureType ?? notice?.procedureType ?? "Contract Notice",
        location: notice?.Location ?? notice?.location ?? "UK",
        isSMESuitable: notice?.IsSuitableForSme ?? notice?.isSuitableForSme ?? false,
      });
    }
  } catch (err) {
    console.error("Contracts Finder search error:", err);
  }

  return results;
}

// ─── Find a Tender Service API ───────────────────────────────────────────────
// UK Government FTS — covers contracts over £25k (OJEU threshold)

async function searchFindATender(keywords: string[]): Promise<TenderResult[]> {
  const results: TenderResult[] = [];

  try {
    const query = keywords.slice(0, 4).join(" OR ");
    const response = await fetch(
      `https://www.find-tender.service.gov.uk/api/1.0/ocdsReleasePackages?q=${encodeURIComponent(query)}&limit=20&pg=1`,
      {
        headers: { Accept: "application/json" },
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) return results;

    const data = await response.json();
    const releases = data?.releases ?? [];

    for (const release of releases) {
      const tender = release?.tender ?? {};
      const title = tender?.title ?? "Untitled";
      const description = tender?.description ?? "";
      const { score, matched } = scoreRelevance(title, description, keywords);
      if (score < 40 || matched.length === 0) continue;

      results.push({
        id: `fts-${release?.ocid ?? Math.random().toString(36)}`,
        title,
        buyer: release?.buyer?.name ?? "Unknown Buyer",
        value: tender?.value?.amount ?? null,
        deadline: tender?.tenderPeriod?.endDate
          ? new Date(tender.tenderPeriod.endDate).toISOString().split("T")[0]
          : "",
        published: release?.date
          ? new Date(release.date).toISOString().split("T")[0]
          : "",
        source: "find-a-tender",
        url: `https://www.find-tender.service.gov.uk/Notice/${release?.ocid}`,
        description: description.substring(0, 500),
        matchedKeywords: matched,
        relevanceScore: score,
        contractType: tender?.procurementMethod ?? "Contract Notice",
        location:
          tender?.deliveryAddresses?.[0]?.region ??
          tender?.deliveryAddresses?.[0]?.countryName ??
          "UK",
        isSMESuitable: false,
      });
    }
  } catch (err) {
    console.error("Find a Tender search error:", err);
  }

  return results;
}

// ─── Route Handlers ──────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const keywords: string[] = body?.keywords ?? [
      "heating",
      "gas boiler",
      "boiler servicing",
      "boiler installation",
      "central heating",
      "gas maintenance",
    ];

    if (!keywords.length) {
      return NextResponse.json({ error: "No keywords provided" }, { status: 400 });
    }

    // Run both portal searches in parallel
    const [cfResults, ftsResults] = await Promise.allSettled([
      searchContractsFinder(keywords),
      searchFindATender(keywords),
    ]);

    const allResults: TenderResult[] = [
      ...(cfResults.status === "fulfilled" ? cfResults.value : []),
      ...(ftsResults.status === "fulfilled" ? ftsResults.value : []),
    ];

    // Deduplicate by title similarity and sort by relevance
    const seen = new Set<string>();
    const deduped = allResults.filter((r) => {
      const key = r.title.toLowerCase().substring(0, 40);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    deduped.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return NextResponse.json({
      success: true,
      scannedAt: new Date().toISOString(),
      keywords,
      sources: {
        contractsFinder: cfResults.status === "fulfilled" ? cfResults.value.length : 0,
        findATender: ftsResults.status === "fulfilled" ? ftsResults.value.length : 0,
      },
      totalFound: deduped.length,
      results: deduped,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Scanner failed", detail: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Procurement Paul Opportunity Scanner",
    apiVersions: {
      contractsFinder: "v2 (POST api/rest/2/search_notices/json) with v1 OCDS fallback",
      findATender: "v1.0 OCDS release packages",
    },
    usage: "POST with { keywords: string[] } to run a scan",
    example: {
      keywords: ["heating", "gas boiler", "boiler servicing", "central heating"],
    },
  });
}
