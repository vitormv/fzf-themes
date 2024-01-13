import { z } from 'zod';

const boxCoordinatesShape = z.object({
  top: z.number().finite().positive(),
  bottom: z.number().finite().positive(),
  left: z.number().finite().positive(),
  right: z.number().finite().positive(),
});

export const themeOptionsSchema = z.object({
  borderStyle: z
    .enum(['rounded', 'sharp', 'bold', 'double', 'block', 'thinblock', 'none'])
    .default('rounded'),
  borderLabel: z.string().optional(),
  borderLabelPosition: z.coerce.number().finite().default(0),
  previewBorderStyle: z
    .enum(['rounded', 'sharp', 'bold', 'double', 'block', 'thinblock'])
    .default('rounded'),
  padding: boxCoordinatesShape,
  margin: boxCoordinatesShape,
  prompt: z.string().default('> '),
  pointer: z.string().max(2).default('> '),
  marker: z.string().max(2).default('>'),
  separator: z.string().default('─'),
  scrollbar: z.string().max(2).default('│'),
  layout: z.enum(['default', 'reverse', 'reverse-list']).default('default'),
  info: z.enum(['default', 'right']).default('default').default('default'),
});

window.schema = themeOptionsSchema;
