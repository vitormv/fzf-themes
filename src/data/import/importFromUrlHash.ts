import { validateAndParseThemeOptions } from '~/data/import/validateAndParseThemeOptions';
import { toStoreColorName } from '~/utils/colors/toFzfColorName';
import { base64Decode } from '~/utils/strings/base64';

export const importFromUrlHash = (hash: string) => {
  const jsonString = base64Decode(hash);

  const themeOptions = JSON.parse(jsonString);

  const colorsStr = themeOptions.colors as string;

  const colors = Object.fromEntries(
    colorsStr.split(',').map((colorPair) => {
      const [name, value] = colorPair.split(':');

      return [toStoreColorName(name), value];
    }),
  );

  delete themeOptions.colors;

  return {
    themeOptions: validateAndParseThemeOptions(themeOptions),
    colors,
  };
};
