// netlify/functions/find-place-id.ts
import type { Handler } from "@netlify/functions";

const withParams = (base: string, params: Record<string, string | number | undefined>) => {
  const url = new URL(base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
  });
  return url.toString();
};

export const handler: Handler = async (event) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing GOOGLE_MAPS_API_KEY" }) };
  }

  const q = (event.queryStringParameters?.q || "").trim(); // your business name query
  const near = (event.queryStringParameters?.near || "").trim(); // "lat,lng" optional
  const [lat, lng] = near ? near.split(",").map(Number) : [undefined, undefined];

  if (!q) {
    return { statusCode: 400, body: JSON.stringify({ error: "Add ?q=Your+Business+Name to the URL" }) };
  }

  // 1) Try Find Place from Text with UK bias
  const findPlaceURL = withParams(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
    {
      input: q,
      inputtype: "textquery",
      fields: "place_id,name,formatted_address,geometry",
      key: apiKey,
      // locationbias: ipbias | point | circle
      ...(lat !== undefined && lng !== undefined
        ? { locationbias: `point:${lat},${lng}` }
        : { locationbias: "ipbias" }),
      // region bias to GB
      region: "gb",
    }
  );

  const tryFetch = async (url: string) => {
    const r = await fetch(url);
    const j = await r.json();
    return j;
  };

  let result = await tryFetch(findPlaceURL);

  // 2) If no candidates, try Text Search (wider net) with GB region
  if (!result?.candidates?.length) {
    const textSearchURL = withParams(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        query: q,
        key: apiKey,
        region: "gb",
        ...(lat !== undefined && lng !== undefined
          ? { location: `${lat},${lng}`, radius: 50000 } // 50km radius
          : {}),
      }
    );
    const ts = await tryFetch(textSearchURL);
    if (ts?.results?.length) {
      result = {
        status: ts.status,
        candidates: ts.results.map((r: any) => ({
          place_id: r.place_id,
          name: r.name,
          formatted_address: r.formatted_address,
          geometry: r.geometry,
        })),
      };
    }
  }

  // 3) Return what we found (or ZERO_RESULTS)
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result ?? { status: "ZERO_RESULTS", candidates: [] }, null, 2),
  };
};