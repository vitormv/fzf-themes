import { isValidColor, type ColorValues } from '~/data/colors.store';
import { type ThemeOptions } from '~/data/options.store';
import { toFzfColorName } from '~/utils/colors/toFzfColorName';
import { base64Encode } from '~/utils/strings/base64';

export const encodeObjForUrlHash = (obj: Record<string, any>) => {
  return base64Encode(JSON.stringify(obj));
};

export const exportToUrlHash = (themeOptions: ThemeOptions, colors: ColorValues) => {
  const colorVariables: Map<string, string> = new Map();

  Object.entries(colors).forEach(([name, value]) => {
    if (!isValidColor(name)) return;

    const fzfColorName = toFzfColorName(name);

    if (value) {
      colorVariables.set(fzfColorName, value);
    }
  });

  const colorsString = [...colorVariables.keys()]
    .map((color) => {
      return `${color}:${colorVariables.get(color)}`;
    })
    .join(',');

  const optionsForEnv = Object.fromEntries(
    Object.keys(themeOptions).map((option) => {
      return [option, themeOptions[option as keyof ThemeOptions]];
    }),
  );

  const exportedObj = {
    ...optionsForEnv,
    colors: colorsString,
  };

  const host = `${document.location.protocol}//${document.location.host}`;
  const path = import.meta.env.BASE_URL;

  return `${host}${path}#${encodeObjForUrlHash(exportedObj)}`;
};
