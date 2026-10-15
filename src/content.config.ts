import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['en', 'es', 'pt']),
    description: z.string(),
    series: z.enum(['artisanlabs', 'data-analysis', 'medellin-asterisk']).optional(),
    translationKey: z.string().optional(),
    cover: z.string().startsWith('/media/writing/').optional(),
    originalUrl: z.string().url().optional(),
    originalPath: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
