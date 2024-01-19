import { colorsSchema } from '~/data/colors.schema';
import { initialColors, type ColorValues } from '~/data/colors.store';
import { validateAndParseColors } from '~/data/import/validateAndParseColors';
import { validateAndParseThemeOptions } from '~/data/import/validateAndParseThemeOptions';
import { initialOptions, type ThemeOptions } from '~/data/options.store';
import type { FzfColor } from '~/types/fzf';
import { toStoreColorName } from '~/utils/colors/toFzfColorName';
import { base64Decode } from '~/utils/strings/base64';

type ImportFromUrlHashOutput = {
  colors: ColorValues;
  themeOptions: ThemeOptions;
};

export const importFromUrlHash = (hash: string): ImportFromUrlHashOutput => {
  let themeOptions;

  try {
    const jsonString = base64Decode(hash);
    themeOptions = JSON.parse(jsonString);
  } catch {
    return { themeOptions: initialOptions, colors: initialColors };
  }

  const colorsStr = themeOptions.colors as string;

  let colors = initialColors;

  if (colorsStr && String(colorsStr).includes(',')) {
    const rawColorObj = Object.fromEntries(
      colorsStr.split(',').map((colorPair) => {
        const [name, value] = colorPair.split(':');

        return [toStoreColorName(name) as FzfColor, value as string];
      }),
    );

    colors = colorsSchema.parse(rawColorObj);
  }

  delete themeOptions.colors;

  return {
    themeOptions: validateAndParseThemeOptions(themeOptions),
    colors: validateAndParseColors(colors),
  };
};
