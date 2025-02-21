import { defineCollection, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      pin: z.boolean().optional(),
      lang: z.string().optional(),
      // If provided, the card of this blog will be a link to this URL
      href: z.string().optional(),
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
