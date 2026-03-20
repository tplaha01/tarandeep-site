import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { remarkCodeMeta } from "./src/lib/remark-code-meta";

const posts = defineCollection({
  name: "posts",
  directory: "content",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    author: z.string().optional(),
    summary: z.string(),
    image: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm, remarkCodeMeta],
    });
    return { ...document, mdx };
  },
});

const cioLogs = defineCollection({
  name: "cioLogs",
  directory: "cio-logs",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    portfolioReturn: z.string(),
    spyReturn: z.string(),
    status: z.enum(["paper", "live"]).default("paper"),
    tags: z.array(z.string()).optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return { ...document, mdx };
  },
});

export default defineConfig({
  collections: [posts, cioLogs],
});
