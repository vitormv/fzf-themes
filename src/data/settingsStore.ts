import type { FzfColor } from '~/types/fzf';
import { writable } from 'svelte/store';
import { colorDefinitions } from '~/data/fzfDefinitions';
import { isNil } from '~/utils/isNil';

export type SettingsStore = {
  selectedColor: FzfColor;
  colors: Record<FzfColor, string>;
};

const initialSettings: SettingsStore = {
  selectedColor: 'fg',
  colors: Object.fromEntries(
    Object.entries(colorDefinitions).map(([token, options]) => [token, options.initial ?? '']),
  ) as SettingsStore['colors'],
};

const _settingsStore = writable<SettingsStore>(initialSettings);

/**
 * Given a color token, get its value from the store, or recursively try
 * to find the first parent with a color.
 * @todo recursively iterate through parents
 */
export const getColorOrFallback = (token: FzfColor, colors: SettingsStore['colors']) => {
  if (colors[token]) {
    return colors[token];
  }

  if (!isNil(colorDefinitions[token].inherits)) {
    return colors[colorDefinitions[token].inherits!];
  }

  return '';
};

export const settingsStore = {
  subscribe: _settingsStore.subscribe,
  setSelected: (token: FzfColor) => {
    _settingsStore.update((settings) => ({
      ...settings,
      selectedColor: token,
    }));
  },
  updateColor: (token: string, color: string | undefined) => {
    _settingsStore.update((settings) => ({
      ...settings,
      colors: {
        ...settings.colors,
        [token]: color,
      },
    }));
  },
};
