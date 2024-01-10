import { isValidColor, type ColorsStore } from '~/data/colorsStore';
import { colorDefinitions } from '~/data/fzfDefinitions';
import { isValidOption, type ThemeOptions } from '~/data/themeStore';
import { boxCoordinatesToString } from '~/utils/boxCoordinates';
import { toFzfColorName } from '~/utils/toFzfColorName';

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
    format: (val) => boxCoordinatesToString(val),
  },
  padding: {
    exportVariable: 'padding',
    exportIf: (val) => val !== '0',
    format: (val) => boxCoordinatesToString(val),
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
    exportVariable: 'preview',
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

function array_chunk(arr: any[], chunkSize: number) {
  if (chunkSize <= 0) throw 'Invalid chunk size';

  const chunks = [];

  for (let i = 0, len = arr.length; i < len; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }

  return chunks;
}

const sanitize = (str: string) => {
  return str.includes(' ') ? `"${str}"` : str;
};

export const exportThemeToVariable = (
  themeOptions: ThemeOptions,
  colorStore: ColorsStore,
): string => {
  const optionsVariables: string[] = [];
  const colorVariables: string[] = [];

  Object.entries(colorStore.colors).forEach(([name, value]) => {
    if (!isValidColor(name)) return;

    const fzfColorName = toFzfColorName(name);
    const definitions = colorDefinitions[name];

    if (value) {
      colorVariables.push(`${fzfColorName}:${value}`);
    } else if (definitions.nullable && !definitions.inherits) {
      colorVariables.push(`${fzfColorName}:-1`);
    }
  });

  Object.keys(themeOptions).forEach((key) => {
    if (!isValidOption(key)) return;

    const conf = envExportConfiguration[key];
    const storeValue = themeOptions[key];

    const formatted = conf.format ? conf.format(storeValue, themeOptions) : String(storeValue);

    // abort early if shouldnt export
    if (conf.exportIf && !conf.exportIf(formatted, themeOptions)) return;

    optionsVariables.push(`--${conf.exportVariable}=${sanitize(formatted)}`);
  });

  // split all colors into lines with max 4 colors each
  const colorChunks = array_chunk(colorVariables, 4)
    .map((chunk) => `--color=${chunk.join(',')}`)
    .join('\n');

  const optionsChunks = array_chunk(optionsVariables, 4)
    .map((chunk) => chunk.join(' '))
    .join('\n');

  return `export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS'\n${colorChunks}${
    optionsChunks.length > 0 ? `\n${optionsChunks}` : ''
  }'`;
};
