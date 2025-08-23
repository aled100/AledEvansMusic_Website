import { z, defineCollection } from "astro:content";

const about = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    photo: z.string(),
  }),
});

export const collections = { about };
