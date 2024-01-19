import { colorsSchema } from '~/data/colors.schema';
import { initialColors, type ColorValues, isValidColor } from '~/data/colors.store';

export const validateAndParseColors = (rawObj: Record<string, any>) => {
  if (!rawObj) return initialColors;

  const normalizedObj: Partial<ColorValues> = {};

  for (const key in colorsSchema.shape) {
    if (!isValidColor(key)) continue;

    const defaultValue = initialColors[key];
    const receivedValue = rawObj[key] ?? defaultValue;

    const parsed = colorsSchema.shape[key as keyof ColorValues].safeParse(receivedValue);

    normalizedObj[key] = parsed.success ? receivedValue : defaultValue;
  }

  return normalizedObj as ColorValues;
};
