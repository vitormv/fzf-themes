import { writable } from 'svelte/store';
import type { BorderStyle } from '~/data/fzfBorders';

export type BorderOptions = {
  style: BorderStyle;
  label: string;
  position: string;
};

const initialSettings: BorderOptions = {
  style: 'rounded',
  label: '',
  position: '',
};

const _borderStore = writable<BorderOptions>(initialSettings);

export const borderStore = {
  subscribe: _borderStore.subscribe,
  setStyle: (style: BorderStyle) => {
    _borderStore.update((settings) => ({
      ...settings,
      style,
    }));
  },
};
