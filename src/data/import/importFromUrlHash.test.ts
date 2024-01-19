import { expect, it, describe } from 'vitest';
import { initialColors } from '~/data/colors.store';
import { encodeObjForUrlHash } from '~/data/export/exportToUrlHash';
import { importFromUrlHash } from '~/data/import/importFromUrlHash';

import { initialOptions, type ThemeOptions } from '~/data/options.store';

const sampleThemeOptions: ThemeOptions = {
  borderStyle: 'block',
  borderLabel: ' Geralt of Rivia ',
  borderLabelPosition: 10,
  previewBorderStyle: 'double',
  padding: '2',
  margin: '3',
  prompt: 'Here: ',
  marker: '->',
  pointer: '*',
  separator: 'LALA',
  scrollbar: '++',
  layout: 'reverse',
  info: 'right',
};

const allWrongColors = {
  'fg': undefined,
  'fg-plus': undefined,
  'bg': undefined,
  'bg-plus': undefined,
  'hl': undefined,
  'hl-plus': undefined,
  'marker': undefined,
  'prompt': undefined,
  'spinner': undefined,
  'pointer': undefined,
  'border': undefined,
  'separator': 'GERALT',
  'scrollbar': null,
  'gutter': 42,
  'query': undefined,
  'disabled': [],
  'preview-fg': new Date(),
  'preview-bg': 1.22,
  'preview-border': 'WAT',
  'preview-scrollbar': Number.NaN,
  'preview-label': new Error(),
  'label': undefined,
  'header': undefined,
  'info': undefined,
};

describe('importFromUrlHash()', () => {
  it('should handle malformed string', () => {
    const output = importFromUrlHash('this aint right...');

    expect(output).toEqual({
      themeOptions: initialOptions,
      colors: initialColors,
    });
  });

  it('should handle base 64 string that contains NO object', () => {
    const output = importFromUrlHash(
      'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==',
    );

    expect(output).toEqual({
      themeOptions: initialOptions,
      colors: initialColors,
    });
  });

  it('should handle base 64 malformed object', () => {
    const str = encodeObjForUrlHash({ shouldnt: 'be here', why: undefined });

    const output = importFromUrlHash(str);

    expect(output).toEqual({
      themeOptions: initialOptions,
      colors: initialColors,
    });
  });

  it('can handle partially correct objects', () => {
    const str = encodeObjForUrlHash({
      borderStyle: 'double',
      colors: allWrongColors,
    });

    const output = importFromUrlHash(str);

    expect(output).toEqual({
      themeOptions: { ...initialOptions, borderStyle: 'double' },
      colors: initialColors,
    });
  });
});
