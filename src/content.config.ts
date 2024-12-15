import { defineCollection, z } from "astro:content";
import { date } from "astro:schema";

export const collections = {
  blogs: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
    }),
  }),
  friends: defineCollection({
    type: "data",
    schema: z.object({}),
  }),
};
