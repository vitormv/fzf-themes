import type { FzfColor } from '~/types/fzf';

type ColorDefinition = {
  initial: string;
  inherits?: FzfColor;
  nullable: boolean;
};

export const colorDefinitions: Record<FzfColor, ColorDefinition> = {
  'fg': {
    initial: '#d0d0d0',
    nullable: true,
  },
  'fg-plus': {
    initial: '#d0d0d0',
    nullable: true,
    inherits: 'fg',
  },
  'bg': {
    initial: '#121212',
    nullable: true,
  },
  'bg-plus': {
    initial: '#262626',
    nullable: false,
  },
  'hl': {
    initial: '#5f87af',
    nullable: false,
  },
  'hl-plus': {
    initial: '#5fd7ff',
    nullable: false,
    inherits: 'fg',
  },
  'info': {
    initial: '#afaf87',
    nullable: false,
  },
  'marker': {
    initial: '#87ff00',
    nullable: false,
  },
  'prompt': {
    initial: '#d7005f',
    nullable: false,
  },
  'spinner': {
    initial: '#af5fff',
    nullable: false,
  },
  'pointer': {
    initial: '#af5fff',
    nullable: false,
  },
  'header': {
    initial: '#87afaf',
    nullable: false,
  },
  'gutter': {
    initial: '#262626',
    nullable: true,
    inherits: 'bg-plus',
  },
  'border': {
    initial: '#262626',
    nullable: false,
  },
  'separator': {
    initial: '',
    nullable: true,
    inherits: 'border',
  },
  'scrollbar': {
    initial: '',
    nullable: true,
    inherits: 'border',
  },
  'label': {
    initial: '#aeaeae',
    nullable: false,
  },
  'query': {
    initial: '#d9d9d9',
    nullable: false,
  },
  'disabled': {
    initial: '',
    nullable: true,
    inherits: 'query',
  },
  'preview-fg': {
    initial: '',
    nullable: true,
    inherits: 'fg',
  },
  'preview-bg': {
    initial: '',
    nullable: true,
    inherits: 'bg',
  },
  'preview-border': {
    initial: '',
    nullable: true,
    inherits: 'border',
  },
  'preview-scrollbar': {
    initial: '',
    nullable: true,
    inherits: 'border',
  },
  'preview-label': {
    initial: '',
    nullable: true,
    inherits: 'label',
  },
} as const;

/**
 * once at runtime, create an easy dictionary of which color inherits from which
 */
export const colorInheritances = Object.fromEntries(
  Object.entries(colorDefinitions).map(([k, v]) => {
    let inherits: FzfColor[] = [];

    let tokenLookup = v.inherits;

    while (tokenLookup) {
      inherits.push(tokenLookup);

      tokenLookup = colorDefinitions[tokenLookup].inherits;
    }

    return [k, inherits];
  }),
) as Record<FzfColor, FzfColor[]>;

/**
 * The order of colors is constantly changing in the settings store, so prefer
 * to use {@link colorDefinitions} to guarantee consistent order
 */
export const orderedColorTokens = Object.keys(colorDefinitions) as FzfColor[];
