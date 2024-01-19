import { z } from 'zod';

const hexColor = z.string().startsWith('#').length(7);
const hexColorOptional = z
  .union([z.string().startsWith('#').length(7), z.literal('')])
  .default('')
  .catch('');

export const colorsSchema = z.object({
  'fg': hexColor.default('#d0d0d0').catch('#d0d0d0'),
  'fg-plus': hexColor.default('#d0d0d0').catch('#d0d0d0'),
  'bg': hexColor.default('#121212').catch('#121212'),
  'bg-plus': hexColor.default('#262626').catch('#262626'),
  'hl': hexColor.default('#5f87af').catch('#5f87af'),
  'hl-plus': hexColor.default('#5fd7ff').catch('#5fd7ff'),
  'info': hexColor.default('#afaf87').catch('#afaf87'),
  'marker': hexColor.default('#87ff00').catch('#87ff00'),
  'prompt': hexColor.default('#d7005f').catch('#d7005f'),
  'spinner': hexColor.default('#af5fff').catch('#af5fff'),
  'pointer': hexColor.default('#af5fff').catch('#af5fff'),
  'header': hexColor.default('#87afaf').catch('#87afaf'),
  'gutter': hexColorOptional,
  'border': hexColor.default('#262626').catch('#262626'),
  'separator': hexColorOptional,
  'scrollbar': hexColorOptional,
  'preview-fg': hexColorOptional,
  'preview-bg': hexColorOptional,
  'preview-border': hexColorOptional,
  'preview-scrollbar': hexColorOptional,
  'preview-label': hexColorOptional,
  'label': hexColor.default('#aeaeae').catch('#aeaeae'),
  'query': hexColor.default('#d9d9d9').catch('#d9d9d9'),
  'disabled': hexColorOptional,
});

export type ColorName = keyof z.infer<typeof colorsSchema>;
