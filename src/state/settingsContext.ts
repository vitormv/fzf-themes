import type { FzfColor } from '~/types/fzf';

import { writable } from 'svelte/store';

export const initialColors: Record<FzfColor, string> = {
  'fg': '#d0d0d0',
  'fg-plus': '#d0d0d0',
  'bg': '#121212',
  'bg-plus': '#262626',
  'hl': '#5f87af',
  'hl-plus': '#5fd7ff',
  'info': '#afaf87',
  'marker': '#87ff00',
  'prompt': '#d7005f',
  'spinner': '#af5fff',
  'pointer': '#af5fff',
  'header': '#87afaf',
  'gutter': '#262626',
  'border': '#262626',
  'separator': 'var(--fzf-border)',
  'scrollbar': 'var(--fzf-border)',
} as const;

const initialSettings: Settings = {
  selectedColor: 'fg',
  colors: initialColors,
};

export type Settings = {
  selectedColor: FzfColor;
  colors: Record<FzfColor, string>;
};

const initSettingsStore = (initialData: Settings) => {
  const store = writable<Settings>(initialData);

  return {
    subscribe: store.subscribe,
    setSelected: (token: FzfColor) => {
      store.update((settings) => ({
        ...settings,
        selectedColor: token,
      }));
    },
    updateColor: (token: string, color: string | undefined) => {
      store.update((settings) => ({
        ...settings,
        colors: {
          ...settings.colors,
          [token]: color,
        },
      }));
    },
  };
};

export const settingsStore = initSettingsStore(initialSettings);
