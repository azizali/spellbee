import { defineCollection, z } from 'astro:content';

const answersCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    centerLetter: z.string().describe('The center/required letter (1 character)'),
    surroundingLetters: z.array(z.string()).describe('The 6 surrounding letters'),
    pangrams: z.array(z.string()).describe('List of found pangrams'),
    hints: z.object({
      letter: z.string().optional(),
      startingWords: z.array(z.string()).optional(),
    }).optional(),
  }),
});

export const collections = {
  answers: answersCollection,
};
