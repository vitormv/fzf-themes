export type BorderTypeGlyphs = {
  top: string;
  bottom: string;
  left: string;
  right: string;
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
};

export type BorderStyle = 'rounded' | 'sharp' | 'bold' | 'double' | 'block' | 'thinblock' | 'none';

// @todo: add border disclaimers for block and thinblock
export const BorderStyleDefinitions: Record<BorderStyle, BorderTypeGlyphs> = {
  none: {
    top: '',
    bottom: '',
    left: '',
    right: '',
    topLeft: '',
    topRight: '',
    bottomLeft: '',
    bottomRight: '',
  },
  // ╭─────────────────╮
  // │     rounded     │
  // ╰─────────────────╯
  rounded: {
    top: '─',
    bottom: '─',
    left: '│',
    right: '│',
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
  },
  // ┌─────────────────┐
  // │      sharp      │
  // └─────────────────┘
  sharp: {
    top: '─',
    bottom: '─',
    left: '│',
    right: '│',
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
  },
  // ┏━━━━━━━━━━━━━━━━━┓
  // ┃      bold       ┃
  // ┗━━━━━━━━━━━━━━━━━┛
  bold: {
    top: '━',
    bottom: '━',
    left: '┃',
    right: '┃',
    topLeft: '┏',
    topRight: '┓',
    bottomLeft: '┗',
    bottomRight: '┛',
  },
  // ╔════════════════╗
  // ║     double     ║
  // ╚════════════════╝
  double: {
    top: '═',
    bottom: '═',
    left: '║',
    right: '║',
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
  },
  // ▛▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▜
  // ▌      block      ▐
  // ▙▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▟
  block: {
    top: '▀',
    bottom: '▄',
    left: '▌',
    right: '▐',
    topLeft: '▛',
    topRight: '▜',
    bottomLeft: '▙',
    bottomRight: '▟',
  },
  thinblock: {
    top: '▔',
    bottom: '▁',
    left: '▏',
    right: '▕',
    topLeft: '🭽',
    topRight: '🭾',
    bottomLeft: '🭼',
    bottomRight: '🭿',
  },
};

export const borderTypes = Object.keys(BorderStyleDefinitions) as BorderStyle[];
export const layoutTypes = ['default' as const, 'reverse' as const, 'reverse-list' as const];
export type Layout = (typeof layoutTypes)[number];
