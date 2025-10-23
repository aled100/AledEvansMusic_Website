// netlify/functions/google-reviews.ts
import type { Handler } from "@netlify/functions";

const API = "https://maps.googleapis.com/maps/api/place/details/json";
const FIELDS = [
  "name",
  "url",
  "rating",
  "user_ratings_total",
  "reviews",
].join(",");

export const handler: Handler = async () => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  const placeId = process.env.GOOGLE_PLACE_ID!;
  const max = Number(process.env.REV_MAX ?? 12);
  const minRating = Number(process.env.REV_MIN_RATING ?? 0);

  if (!apiKey || !placeId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID" }),
    };
  }

  const url = `${API}?place_id=${encodeURIComponent(placeId)}&fields=${FIELDS}&key=${apiKey}`;
  const res = await fetch(url);
  const json = await res.json();

  if (json.status !== "OK") {
    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "Places API error",
        status: json.status,
        message: json.error_message,
      }),
    };
  }

  const details = json.result;
  const reviews = (details.reviews ?? [])
    .filter((r: any) => (r.rating ?? 0) >= minRating)
    .sort((a: any, b: any) => (b.time ?? 0) - (a.time ?? 0))
    .slice(0, max)
    .map((r: any) => ({
      author: r.author_name,
      authorUrl: r.author_url,
      profilePhotoUrl: r.profile_photo_url,
      rating: r.rating,
      text: r.text,
      relativeTime: r.relative_time_description,
    }));

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
    body: JSON.stringify({
      name: details.name,
      url: details.url,
      rating: details.rating,
      reviewCount: details.user_ratings_total,
      reviews,
    }),
  };
};