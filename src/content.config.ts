import { defineCollection, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      lang: z.string().optional(),
      href: z.string().optional(),
      pin: z.boolean().optional(),
      draft: z.boolean().optional(),
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
