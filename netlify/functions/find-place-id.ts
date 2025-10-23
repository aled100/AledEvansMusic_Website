// netlify/functions/find-place-id.ts
import type { Handler } from "@netlify/functions";

const endpoint = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";

export const handler: Handler = async (event) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  if (!apiKey) return { statusCode: 500, body: JSON.stringify({ error: "Missing GOOGLE_MAPS_API_KEY" }) };

  const q = (event.queryStringParameters?.q || "").trim();
  const mode = (event.queryStringParameters?.mode || "text").trim(); // "text" | "phone"
  const region = (event.queryStringParameters?.region || "gb").trim(); // bias to GB

  if (!q) return { statusCode: 400, body: JSON.stringify({ error: "Add ?q=... to the URL" }) };

  const params = new URLSearchParams();
  params.set("key", apiKey);
  params.set("fields", "place_id,name,formatted_address");
  params.set("region", region);

  if (mode === "phone") {
    // E.164 format required, e.g. +447923979707
    params.set("input", q);
    params.set("inputtype", "phonenumber");
  } else {
    params.set("input", q);
    params.set("inputtype", "textquery");
  }

  const res = await fetch(`${endpoint}?${params.toString()}`);
  const json = await res.json();
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(json, null, 2),
  };
};