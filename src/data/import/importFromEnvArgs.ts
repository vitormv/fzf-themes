import parser from 'yargs-parser';
import { fzfOptionsConfig } from '~/data/fzfOptions.config';
import { validateAndParseColors } from '~/data/import/validateAndParseColors';
import { validateAndParseThemeOptions } from '~/data/import/validateAndParseThemeOptions';
import { isValidOption, type ThemeOption, type ThemeOptions } from '~/data/options.store';
import { toFzfColorName } from '~/utils/colors/toFzfColorName';

export const importFromEnvArgs = (argsStr: string) => {
  const parsedObj = parser(argsStr.replace(/\n/g, ' '));
  const themeOptions: Partial<ThemeOptions> = {};
  const colors: Record<string, string> = {};

  for (const argKey in parsedObj) {
    if (argKey === 'color') {
      if (Array.isArray(parsedObj[argKey])) {
        const splitColors = String(parsedObj[argKey]).split(',');

        for (const color of splitColors) {
          let [colorName, colorValue] = String(color).split(':');

          colorValue = String(colorValue).trim();

          colors[toFzfColorName(colorName)] = colorValue === '-1' ? '' : colorValue;
        }
      }
    }

    const optionName = Object.keys(fzfOptionsConfig).find(
      (i) => fzfOptionsConfig[i as ThemeOption]?.argName === argKey,
    );

    if (!optionName || !isValidOption(optionName)) continue;

    themeOptions[optionName] =
      fzfOptionsConfig[optionName].transformImport?.(parsedObj[argKey]) ?? parsedObj[argKey];
  }

  return {
    themeOptions: validateAndParseThemeOptions(themeOptions),
    colors: validateAndParseColors(colors),
  };
};
