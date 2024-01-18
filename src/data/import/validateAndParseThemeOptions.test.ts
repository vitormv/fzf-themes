import { expect, it, describe } from 'vitest';
import { validateAndParseThemeOptions } from '~/data/import/validateAndParseThemeOptions';

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

describe('validateAndParseThemeOptions()', () => {
  it('should parse complete object', () => {
    const output = validateAndParseThemeOptions(sampleThemeOptions);

    expect(output).toEqual(sampleThemeOptions);
  });

  it('can handle weird types', () => {
    expect(validateAndParseThemeOptions('WAT' as any)).toEqual(initialOptions);
    expect(validateAndParseThemeOptions(undefined as any)).toEqual(initialOptions);
    expect(validateAndParseThemeOptions(null as any)).toEqual(initialOptions);
    expect(validateAndParseThemeOptions(new Date() as any)).toEqual(initialOptions);
  });

  it('can handle partial objects', () => {
    const partial = {
      borderLabel: 'Geralt of Rivia',
    };

    const output = validateAndParseThemeOptions(partial);

    expect(output).toEqual({
      ...initialOptions,
      borderLabel: 'Geralt of Rivia',
    });
  });

  it('should recover from bad obj values', () => {
    const allBrokenObj: Record<keyof ThemeOptions, any> = {
      borderStyle: 'invalid-border-style',
      borderLabel: undefined,
      borderLabelPosition: new Error(),
      previewBorderStyle: 10,
      padding: 0,
      margin: 2,
      prompt: null,
      marker: undefined,
      pointer: 2,
      separator: 1.04,
      scrollbar: new Error(),
      layout: new Date(),
      info: 'nothing to see here',
    };

    const output = validateAndParseThemeOptions(allBrokenObj);

    expect(output).toEqual(initialOptions);
  });
});
