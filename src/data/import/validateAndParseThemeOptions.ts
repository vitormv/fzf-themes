import { themeOptionsSchema } from '~/data/options.schema';
import { initialOptions, isValidOption, type ThemeOptions } from '~/data/theme.store';

export const validateAndParseThemeOptions = (rawObj: Record<string, any>) => {
  if (!rawObj) return initialOptions;

  const normalizedObj: Partial<ThemeOptions> = {};

  for (const key in themeOptionsSchema.shape) {
    if (!isValidOption(key)) continue;

    const defaultValue = initialOptions[key];
    const receivedValue = rawObj[key] ?? defaultValue;

    const parsed = themeOptionsSchema.shape[key as keyof ThemeOptions].safeParse(receivedValue);

    normalizedObj[key] = parsed.success ? receivedValue : defaultValue;
  }

  return normalizedObj as ThemeOptions;
};
