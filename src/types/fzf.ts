import type { z } from 'zod';
import type { colorsSchema } from '~/data/colors.schema';

export type FzfColor = keyof z.infer<typeof colorsSchema>;
