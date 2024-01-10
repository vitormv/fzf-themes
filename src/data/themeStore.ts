import { writable } from 'svelte/store';
import type { BorderStyle, InfoStyle, Layout } from '~/data/fzfBorders';

export type BoxCoordinates = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type ThemeOptions = {
  borderStyle: BorderStyle;
  borderLabel: string;
  borderLabelPosition: number;
  previewBorderStyle: BorderStyle;
  padding: BoxCoordinates;
  margin: BoxCoordinates;
  prompt: string;
  pointer: string;
  marker: string;
  separator: string;
  scrollbar: string;
  layout: Layout;
  info: InfoStyle;
};

const initialSettings: ThemeOptions = {
  borderStyle: 'rounded',
  borderLabel: '',
  borderLabelPosition: 0,
  previewBorderStyle: 'rounded',
  padding: { top: 0, bottom: 0, left: 0, right: 0 }, // @todo: store plain strings
  margin: { top: 0, bottom: 0, left: 0, right: 0 }, // @todo: store plain strings
  prompt: '> ',
  marker: '>',
  pointer: '◆',
  separator: '─',
  scrollbar: '│',
  layout: 'default',
  info: 'default',
} as const;

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

export const isValidOption = <T extends string>(keyName: T): keyName is keyof ThemeOptions => {
  return keyName in initialSettings;
};
