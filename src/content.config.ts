import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const gear = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gear' }),
  schema: z.object({
    intro: z.string(),
    categories: z.array(
      z.object({
        title: z.string(),
        items: z.array(
          z.object({
            name: z.string(),
            quantity: z.string().optional(),
            notes: z.string().optional(),
            link: z.string().url().optional(),
            skip: z.boolean().default(false),
          })
        ),
      })
    ),
  }),
});

export const collections = { blog, projects, gear };
