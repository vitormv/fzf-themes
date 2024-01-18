import { isValidColor, type ColorOptions } from '~/data/colorsStore';
import { isValidOption, type ThemeOptions } from '~/data/themeStore';
import { colorDefinitions } from '~/fzf/fzfColorDefinitions';
import { arrayChunk } from '~/utils/arrayChunk';
import { base64Decode, base64Encode } from '~/utils/base64';
import { toFzfColorName, toStoreColorName } from '~/utils/toFzfColorName';

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

const sanitize = (str: string) => {
  return str.includes(' ') ? `"${str}"` : str;
};

const prepareForEnvExport = (themeOptions: ThemeOptions, colors: ColorOptions) => {
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

    if (!storeValue || !conf) return;

    const formatted = conf.format
      ? conf.format(String(storeValue), themeOptions)
      : String(storeValue);

    // abort early if shouldnt export
    if (conf.exportIf && !conf.exportIf(formatted, themeOptions)) return;

    optionsVariables.set(conf.exportVariable, formatted);
  });

  return { optionsVariables, colorVariables };
};

export const exportThemeToEnvVariable = (themeOptions: ThemeOptions, colors: ColorOptions) => {
  const { colorVariables, optionsVariables } = prepareForEnvExport(themeOptions, colors);

  const colorsForEnv = [...colorVariables.keys()].map((color) => {
    return `${color}:${colorVariables.get(color)}`;
  });

  const optionsForEnv = [...optionsVariables.keys()].map((option) => {
    return `${option}=${sanitize(optionsVariables.get(option) ?? '')}`;
  });

  // split all colors into lines with max 4 colors each
  const colorChunks = arrayChunk(colorsForEnv, 4)
    .map((chunk) => `--color=${chunk.join(',')}`)
    .join('\n');

  const optionsChunks = arrayChunk(optionsForEnv, 4)
    .map((chunk) => chunk.join(' '))
    .join('\n');

  return `export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS'\n${colorChunks}${
    optionsChunks.length > 0 ? `\n${optionsChunks}` : ''
  }'`;
};

export const exportToUrlHash = (themeOptions: ThemeOptions, colors: ColorOptions) => {
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
  const hash = base64Encode(JSON.stringify(exportedObj));

  return `${host}${path}#${hash}`;
};

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

  return { themeOptions, colors };
};
