import { z } from 'zod';

export const themeOptionsSchema = z.object({
  borderStyle: z
    .enum(['rounded', 'sharp', 'bold', 'double', 'block', 'thinblock', 'none'])
    .default('rounded'),
  borderLabel: z.string().optional(),
  borderLabelPosition: z.coerce.number().finite().default(0),
  previewBorderStyle: z
    .enum(['rounded', 'sharp', 'bold', 'double', 'block', 'thinblock'])
    .default('rounded'),
  margin: z
    .string()
    .regex(/^[0-9]+(,[0-9]+){0,3}$/)
    .default('0'),
  padding: z
    .string()
    .regex(/^[0-9]+(,[0-9]+){0,3}$/)
    .default('0'),
  prompt: z.string().default('> '),
  pointer: z.string().max(2).default('> '),
  marker: z.string().max(2).default('>'),
  separator: z.string().default('─'),
  scrollbar: z.string().max(2).default('│'),
  layout: z.enum(['default', 'reverse', 'reverse-list']).default('default'),
  info: z.enum(['default', 'right']).default('default').default('default'),
});
