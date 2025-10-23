// netlify/functions/find-place-id.ts
import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  const q = (event.queryStringParameters?.q || "").trim(); // e.g. "Aled Evans Music South Wales"
  if (!apiKey || !q) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing q or API key" }) };
  }

  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    q
  )}&inputtype=textquery&fields=place_id,name,formatted_address&key=${apiKey}`;

  const res = await fetch(url);
  const json = await res.json();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json, null, 2),
  };
};