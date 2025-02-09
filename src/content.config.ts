import { defineCollection, z } from "astro:content";

export const collections = {
  posts: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
    }),
  }),
  friends: defineCollection({
    type: "data",
    schema: z.object({
      name: z.string(),
      href: z.string(),
      description: z.string().optional(),
    }),
  }),
};
