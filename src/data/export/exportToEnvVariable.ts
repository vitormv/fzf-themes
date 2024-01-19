import { isValidColor, type ColorValues } from '~/data/colors.store';
import { isValidOption, type ThemeOptions } from '~/data/options.store';
import { colorDefinitions } from '~/fzf/fzfColorDefinitions';
import { arrayChunk } from '~/utils/arrayChunk';
import { toFzfColorName } from '~/utils/colors/toFzfColorName';

type ExportItemDefinition<T extends keyof ThemeOptions> = {
  exportVariable: string;
  exportIf?: (val: string, allOptions: ThemeOptions) => boolean;
  format?: (val: ThemeOptions[T], allOptions: ThemeOptions) => string;
};

export type ExportDefinitions = {
  [K in keyof ThemeOptions]: ExportItemDefinition<K>;
};

const envExportConfiguration: ExportDefinitions = {
  margin: {
    exportVariable: 'margin',
    exportIf: (val) => val !== '0',
  },
  padding: {
    exportVariable: 'padding',
    exportIf: (val) => val !== '0',
  },
  borderStyle: {
    exportVariable: 'border',
    exportIf: (val) => val !== 'none',
  },
  borderLabel: {
    exportVariable: 'border-label',
    exportIf: (_, allOptions) => allOptions.borderStyle !== 'none',
  },
  borderLabelPosition: {
    exportVariable: 'border-label-pos',
    exportIf: (_, allOptions) => !!allOptions.borderLabel,
  },
  previewBorderStyle: {
    exportVariable: 'preview-window',
    exportIf: (val) => val !== 'none',
    format: (val) => `border-${val}`,
  },
  separator: {
    exportVariable: 'separator',
  },
  scrollbar: {
    exportVariable: 'scrollbar',
  },
  prompt: {
    exportVariable: 'prompt',
  },
  pointer: {
    exportVariable: 'pointer',
  },
  marker: {
    exportVariable: 'marker',
  },
  layout: {
    exportVariable: 'layout',
    exportIf: (val) => val !== 'default',
  },
  info: {
    exportVariable: 'info',
    exportIf: (val) => val !== 'default',
  },
};

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

    const conf = envExportConfiguration[key] as ExportItemDefinition<typeof key>;
    const storeValue = themeOptions[key];

    if (!conf) return;

    const formatted = conf.format
      ? conf.format(String(storeValue), themeOptions)
      : String(storeValue);

    // abort early if shouldn't export
    if (conf.exportIf && !conf.exportIf(formatted, themeOptions)) return;

    optionsVariables.set(conf.exportVariable, formatted);
  });

  return { optionsVariables, colorVariables };
};

export const exportToEnvVariable = (themeOptions: ThemeOptions, colors: ColorValues) => {
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

  const optionsChunks = arrayChunk(optionsForEnv, 4)
    .map((chunk) => chunk.join(' '))
    .join('\n  ');

  return `export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS'\n  ${colorChunks}${
    optionsChunks.length > 0 ? `\n  ${optionsChunks}` : ''
  }'`;
};
