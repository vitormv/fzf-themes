import { expect, it, describe } from 'vitest';
import { exportToUrlHash, importFromUrlHash } from './exportThemeToEnvVariable';
import type { ThemeOptions } from '~/data/themeStore';
import type { ColorValues } from '~/data/colorsStore';
import { filterEmptyObjValues } from '~/utils/filterEmptyObjValues';

const sampleThemeOptions: ThemeOptions = {
  borderStyle: 'rounded',
  borderLabel: '',
  borderLabelPosition: 0,
  previewBorderStyle: 'rounded',
  padding: '0',
  margin: '0',
  prompt: '> ',
  marker: '>',
  pointer: '◆',
  separator: '─',
  scrollbar: '│',
  layout: 'default',
  info: 'default',
};

const sampleColorOptions: ColorValues = {
  'fg': '#d0d0d0',
  'fg-plus': '#d0d0d0',
  'bg': '#121212',
  'bg-plus': '#262626',
  'hl': '#5f87af',
  'hl-plus': '#5fd7ff',
  'marker': '#87ff00',
  'prompt': '#d7005f',
  'spinner': '#af5fff',
  'pointer': '#af5fff',
  'border': '#262626',
  'separator': '',
  'scrollbar': '',
  'gutter': '',
  'query': '#d9d9d9',
  'disabled': '',
  'preview-fg': '',
  'preview-bg': '',
  'preview-border': '',
  'preview-scrollbar': '',
  'preview-label': '',
  'label': '#aeaeae',
  'header': '#87afaf',
  'info': '#afaf87',
};

describe('exportToUrlHash()', () => {
  it('should be able to encode and decode url hash to same object', () => {
    const urlOutput = exportToUrlHash(sampleThemeOptions, sampleColorOptions);

    const url = new URL(urlOutput);

    const imported = importFromUrlHash(url.hash.substring(1));

    expect(imported).toEqual({
      themeOptions: sampleThemeOptions,
      colors: filterEmptyObjValues(sampleColorOptions),
    });
  });
});
