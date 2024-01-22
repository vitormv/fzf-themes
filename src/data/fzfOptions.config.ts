import { type ThemeOption, type ThemeOptions } from '~/data/options.store';

export type FzfOptionDefinition<T extends ThemeOption> = {
  argName: string;
  exportIf?: (val: string, allOptions: ThemeOptions) => boolean;
  transformExport?: (val: ThemeOptions[T], allOptions: ThemeOptions) => string;
  transformImport?: (val: any) => string;
};

export type FzfOptions = {
  [K in ThemeOption]: FzfOptionDefinition<K>;
};

export const fzfOptionsConfig: FzfOptions = {
  margin: {
    argName: 'margin',
    exportIf: (val) => val !== '0',
  },
  padding: {
    argName: 'padding',
    exportIf: (val) => val !== '0',
  },
  borderStyle: {
    argName: 'border',
    exportIf: (val) => val !== 'none',
  },
  borderLabel: {
    argName: 'border-label',
    exportIf: (_, allOptions) => allOptions.borderStyle !== 'none',
  },
  borderLabelPosition: {
    argName: 'border-label-pos',
    exportIf: (_, allOptions) => !!allOptions.borderLabel,
  },
  previewBorderStyle: {
    argName: 'preview-window',
    transformExport: (val) => `border-${val}`,
    transformImport: (val: unknown) => String(val).substring(7), // remove "border-" prefix
  },
  separator: {
    argName: 'separator',
  },
  scrollbar: {
    argName: 'scrollbar',
  },
  prompt: {
    argName: 'prompt',
  },
  pointer: {
    argName: 'pointer',
  },
  marker: {
    argName: 'marker',
  },
  layout: {
    argName: 'layout',
    exportIf: (val) => val !== 'default',
  },
  info: {
    argName: 'info',
    exportIf: (val) => val !== 'default',
  },
};
