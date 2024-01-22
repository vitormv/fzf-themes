import { isValidColor, type ColorValues } from '~/data/colors.store';
import { fzfOptionsConfig, type FzfOptionDefinition } from '~/data/fzfOptions.config';
import { isValidOption, type ThemeOptions } from '~/data/options.store';
import { colorDefinitions } from '~/fzf/fzfColorDefinitions';
import { arrayChunk } from '~/utils/arrayChunk';
import { toFzfColorName } from '~/utils/colors/toFzfColorName';

const sanitize = (str: string) => {
  return `"${str}"`;
};

const prepareForEnvExport = (themeOptions: ThemeOptions, colors: ColorValues) => {
  const optionsVariables: Map<string, string> = new Map();
  const colorVariables: Map<string, string> = new Map();

  Object.entries(colors).forEach(([name, value]) => {
    if (!isValidColor(name)) return;

    const fzfColorName = toFzfColorName(name);
    const definitions = colorDefinitions[name];

    if (value) {
      colorVariables.set(fzfColorName, value);
    } else if (definitions.nullable && !definitions.inherits) {
      colorVariables.set(fzfColorName, '-1');
    }
  });

  Object.keys(themeOptions).forEach((key) => {
    if (!isValidOption(key)) return;

    const conf = fzfOptionsConfig[key] as FzfOptionDefinition<typeof key>;
    const storeValue = themeOptions[key];

    if (!conf) return;

    const formatted = conf.transformExport
      ? conf.transformExport(String(storeValue), themeOptions)
      : String(storeValue);

    // abort early if shouldn't export
    if (conf.exportIf && !conf.exportIf(formatted, themeOptions)) return;

    optionsVariables.set(conf.argName, formatted);
  });

  return { optionsVariables, colorVariables };
};

export const exportToEnvVariable = (
  themeOptions: ThemeOptions,
  colors: ColorValues,
  colorsOnly: boolean,
) => {
  const { colorVariables, optionsVariables } = prepareForEnvExport(themeOptions, colors);

  const colorsForEnv = [...colorVariables.keys()].map((color) => {
    return `${color}:${colorVariables.get(color)}`;
  });

  const optionsForEnv = [...optionsVariables.keys()].map((option) => {
    return `--${option}=${sanitize(optionsVariables.get(option) ?? '""')}`;
  });

  // split all colors into lines with max 4 colors each
  const colorChunks = arrayChunk(colorsForEnv, 4)
    .map((chunk) => `--color=${chunk.join(',')}`)
    .join('\n  ');

  const optionsChunks = colorsOnly
    ? []
    : arrayChunk(optionsForEnv, 4)
        .map((chunk) => chunk.join(' '))
        .join('\n  ');

  return `export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS'\n  ${colorChunks}${
    optionsChunks.length > 0 ? `\n  ${optionsChunks}` : ''
  }'`;
};
