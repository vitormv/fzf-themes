import { writable } from 'svelte/store';
import { z } from 'zod';
import { themeOptionsSchema } from '~/data/options.schema';
import type { BorderStyle } from '~/fzf/fzfBorders';

export type ThemeOptions = z.infer<typeof themeOptionsSchema>;

export const initialOptions: ThemeOptions = {
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
} as const;

const _optionsStore = writable<ThemeOptions>(initialOptions);

export const optionsStore = {
  subscribe: _optionsStore.subscribe,
  set: <TKey extends keyof ThemeOptions>(key: TKey, value: ThemeOptions[TKey]) => {
    _optionsStore.update((settings) => ({
      ...settings,
      [key]: value,
    }));
  },
  updateAll: (value: ThemeOptions) => {
    _optionsStore.update(() => ({
      ...value,
    }));
  },
  setStyle: (style: BorderStyle) => {
    _optionsStore.update((settings) => ({
      ...settings,
      borderStyle: style,
    }));
  },
};

export const isValidOption = (keyName: string): keyName is keyof ThemeOptions => {
  return keyName in initialOptions;
};
