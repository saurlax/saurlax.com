import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  if (!context.site) {
    return;
  }
  const blog = await getCollection("blog");
  return rss({
    title: "Saurlax's Blog",
    description: "A blog about web development, programming, and more.",
    site: context.site,
    items: blog
      .sort((a, b) => {
        return b.data.date.getTime() - a.data.date.getTime();
      })
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.body.slice(0, 200),
        link: `/blog/${post.slug}/`,
      })),
  });
}
