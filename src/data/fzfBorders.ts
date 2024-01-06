export type BorderStyle = {
  top: string;
  bottom: string;
  left: string;
  right: string;
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
};

export type BorderType = 'rounded' | 'sharp' | 'bold' | 'double' | 'block' | 'thinblock' | 'none';

export const BorderStyleDefinitions: Record<BorderType, BorderStyle> = {
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
};

export const borderTypes = Object.keys(BorderStyleDefinitions) as BorderType[];
