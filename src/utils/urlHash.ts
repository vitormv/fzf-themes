const ENC = {
  '+': '-',
  '/': '_',
} as const;

const DEC = {
  '-': '+',
  '_': '/',
  '.': '=',
} as const;

export const encodeHash = (base64: string) => {
  return base64.replace(/[+/]/g, (m: string) => ENC[m]);
};

export const decode = (safe: string) => {
  return safe.replace(/[-_.]/g, (m: string) => DEC[m]);
};
