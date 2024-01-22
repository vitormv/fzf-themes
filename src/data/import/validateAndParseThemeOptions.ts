import { themeOptionsSchema } from '~/data/options.schema';
import {
  initialOptions,
  isValidOption,
  type ThemeOption,
  type ThemeOptions,
} from '~/data/options.store';

export const validateAndParseThemeOptions = (rawObj: Record<string, any>) => {
  if (!rawObj) return initialOptions;

  const normalizedObj: Partial<ThemeOptions> = {};

  for (const key in themeOptionsSchema.shape) {
    if (!isValidOption(key)) continue;

    const defaultValue = initialOptions[key];
    const receivedValue = rawObj[key] ?? defaultValue;

    const parsed = themeOptionsSchema.shape[key as ThemeOption].safeParse(receivedValue);

    normalizedObj[key] = parsed.success ? (parsed.data as any) : defaultValue;
  }

  return normalizedObj as ThemeOptions;
};
