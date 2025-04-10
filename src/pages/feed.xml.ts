import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  if (!context.site) {
    return;
  }
  const blogEntries = await getCollection("blog").then((entries) => {
    return entries.filter((entry) => !entry.data.draft);
  });
  return rss({
    title: "Saurlax's Blog",
    description: "A blog about web development, programming, and more.",
    site: context.site,
    items: blogEntries
      .sort((a, b) => {
        return b.data.date.getTime() - a.data.date.getTime();
      })
      .slice(0, 12)
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.body,
        link: `/${post.collection}/${post.slug}/`,
      })),
  });
}
