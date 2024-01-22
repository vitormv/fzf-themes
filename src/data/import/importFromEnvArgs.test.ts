import { expect, it, describe } from 'vitest';
import { type ColorValues } from '~/data/colors.store';
import { importFromEnvArgs } from '~/data/import/importFromEnvArgs';

import { initialOptions, type ThemeOptions } from '~/data/options.store';

const sampleOptions: ThemeOptions = {
  borderStyle: 'block',
  borderLabel: ' Geralt of Rivia ',
  borderLabelPosition: 10,
  previewBorderStyle: 'double',
  padding: '2',
  margin: '3',
  prompt: 'Here: ',
  marker: '->',
  pointer: '*',
  separator: 'LALA ',
  scrollbar: '+',
  layout: 'reverse',
  info: 'right',
};

const sampleColors: ColorValues = {
  'fg': '#3d3131',
  'fg-plus': '#d0d0d0',
  'bg': '#ffdfdf',
  'bg-plus': '#262626',
  'hl': '#b0b05f',
  'hl-plus': '#5fd7ff',
  'info': '#054545',
  'marker': '#87ffe5',
  'prompt': '#1500d6',
  'spinner': '#b60000',
  'pointer': '#5ebcff',
  'header': '#00ff66',
  'gutter': '#1d350f',
  'border': '#2200ff',
  'separator': '#9e5757',
  'scrollbar': '#ff00d0',
  'preview-fg': '#b2c602',
  'preview-bg': '#002309',
  'preview-border': '#9b2f2f',
  'preview-scrollbar': '#ffe100',
  'preview-label': '#4f1212',
  'label': '#ff93e9',
  'query': '#ff0000',
  'disabled': '#9a0000',
};

describe('importFromEnvArgs()', () => {
  it('should parse full cli args', () => {
    const output = importFromEnvArgs(`
      --color=fg:#3d3131,fg+:#5f3952,bg:#ffdfdf,bg+:#af7272
      --color=hl:#b0b05f,hl+:#328c1b,info:#054545,marker:#87ffe5
      --color=prompt:#1500d6,spinner:#b60000,pointer:#5ebcff,header:#00ff66
      --color=gutter:#1d350f,border:#2200ff,separator:#9e5757,scrollbar:#ff00d0
      --color=preview-fg:#b2c602,preview-bg:#002309,preview-border:#9b2f2f,preview-scrollbar:#ffe100
      --color=preview-label:#4f1212,label:#ff93e9,query:#ff0000,disabled:#9a0000
      --border="block" --border-label=" Geralt of Rivia " --border-label-pos="10" --preview-window="border-double"
      --margin="3" --padding="2" --prompt="Here: " --pointer="*"
      --marker="->" --separator="LALA " --scrollbar="+" --layout="reverse"
      --info="right"
    `);

    expect(output).toEqual({
      themeOptions: sampleOptions,
      colors: sampleColors,
    });
  });

  it('should parse colors-only obj', () => {
    const output = importFromEnvArgs(`
      --color=fg:#3d3131,fg+:#5f3952,bg:#ffdfdf,bg+:#af7272
      --color=hl:#b0b05f,hl+:#328c1b,info:#054545,marker:#87ffe5
      --color=prompt:#1500d6,spinner:#b60000,pointer:#5ebcff,header:#00ff66
      --color=gutter:#1d350f,border:#2200ff,separator:#9e5757,scrollbar:#ff00d0
      --color=preview-fg:#b2c602,preview-bg:#002309,preview-border:#9b2f2f,preview-scrollbar:#ffe100
      --color=preview-label:#4f1212,label:#ff93e9,query:#ff0000,disabled:#9a0000
    `);

    expect(output).toEqual({
      themeOptions: initialOptions, // will use default
      colors: sampleColors,
    });
  });

  it('should be able to parse unset colors', () => {
    const output = importFromEnvArgs(`
      --color=fg:-1,bg:-1
      --color=fg+:#5f3952,,bg+:#af7272
      --color=hl:#b0b05f,hl+:#328c1b,info:#054545,marker:#87ffe5
      --color=prompt:#1500d6,spinner:#b60000,pointer:#5ebcff,header:#00ff66
      --color=gutter:#1d350f,border:#2200ff,separator:#9e5757,scrollbar:#ff00d0
      --color=preview-fg:#b2c602,preview-bg:#002309,preview-border:#9b2f2f,preview-scrollbar:#ffe100
      --color=preview-label:#4f1212,label:#ff93e9,query:#ff0000,disabled:#9a0000
    `);

    expect(output).toEqual({
      themeOptions: initialOptions, // will use default
      colors: {
        ...sampleColors,
        fg: '',
        bg: '',
      },
    });
  });

  it('should be able to parse empty colors', () => {
    // gutter is missing:
    const output = importFromEnvArgs(`
      --color=fg:#3d3131,fg+:#5f3952,bg:#ffdfdf,bg+:#af7272
      --color=hl:#b0b05f,hl+:#328c1b,info:#054545,marker:#87ffe5
      --color=prompt:#1500d6,spinner:#b60000,pointer:#5ebcff,header:#00ff66
      --color=border:#2200ff,separator:#9e5757,scrollbar:#ff00d0
      --color=preview-fg:#b2c602,preview-bg:#002309,preview-border:#9b2f2f,preview-scrollbar:#ffe100
      --color=preview-label:#4f1212,label:#ff93e9,query:#ff0000,disabled:#9a0000
    `);

    expect(output).toEqual({
      themeOptions: initialOptions,
      colors: {
        ...sampleColors,
        gutter: '',
      },
    });
  });

  it('should recover from wrong option values', () => {
    const output = importFromEnvArgs(`
      --color=fg:#3d3131,fg+:#5f3952,bg:#ffdfdf,bg+:#af7272
      --color=hl:#b0b05f,hl+:#328c1b,info:#054545,marker:#87ffe5
      --color=prompt:#1500d6,spinner:#b60000,pointer:#5ebcff,header:#00ff66
      --color=gutter:#1d350f,border:#2200ff,separator:#9e5757,scrollbar:#ff00d0
      --color=preview-fg:#b2c602,preview-bg:#002309,preview-border:#9b2f2f,preview-scrollbar:#ffe100
      --color=preview-label:#4f1212,label:#ff93e9,query:#ff0000,disabled:#9a0000
      --border="WHAT" --border-label-pos="THIS AINT RIGHT" --preview-window="NOPE"
      --margin="3,3,3,3,3" --padding="2,2,2,2,2,2,2,2" --pointer="TOOLONG"
      --marker="TOOLONG" --scrollbar="TOOLONG" --layout="WAT"
      --info="WAT"
    `);

    expect(output).toEqual({
      themeOptions: initialOptions,
      colors: sampleColors,
    });
  });
});
