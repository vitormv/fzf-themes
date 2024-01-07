import { writable } from 'svelte/store';
import type { BorderStyle } from '~/data/fzfBorders';

export type BoxCoordinates = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type ThemeOptions = {
  borderStyle: BorderStyle;
  borderLabel: string;
  borderLabelPosition: string;
  padding: BoxCoordinates;
  margin: BoxCoordinates;
  prompt: string;
  pointer: string;
  marker: string;
  separator: string;
  scrollbar: string;
};

const initialSettings: ThemeOptions = {
  borderStyle: 'rounded',
  borderLabel: '',
  borderLabelPosition: '',
  padding: { top: 0, bottom: 0, left: 1, right: 1 },
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  prompt: '> ',
  marker: '>',
  pointer: '◆',
  separator: '─',
  scrollbar: '│',
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
