import { defineCollection, z } from 'astro:content';

const solutionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    pangrams: z.array(z.string()).describe('List of found pangrams'),
    hints: z.object({
      letter: z.string().optional(),
      startingWords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

export const collections = {
  solutions: solutionsCollection,
};
