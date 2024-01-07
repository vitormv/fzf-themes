import { writable } from 'svelte/store';
import type { BorderStyle } from '~/data/fzfBorders';

export type ThemeOptions = {
  borderStyle: BorderStyle;
  borderLabel: string;
  borderLabelPosition: string;
};

const initialSettings: ThemeOptions = {
  borderStyle: 'rounded',
  borderLabel: '',
  borderLabelPosition: '',
};

const _optionsStore = writable<ThemeOptions>(initialSettings);

export const themeStore = {
  subscribe: _optionsStore.subscribe,
  set: <TKey extends keyof ThemeOptions>(key: TKey, value: ThemeOptions[TKey]) => {
    _optionsStore.update((settings) => ({
      ...settings,
      [key]: value,
    }));
  },
  setStyle: (style: BorderStyle) => {
    _optionsStore.update((settings) => ({
      ...settings,
      borderStyle: style,
    }));
  },
};
