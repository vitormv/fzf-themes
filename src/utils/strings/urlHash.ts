const ENC = {
  '+': '-',
  '/': '_',
};

const DEC = {
  '-': '+',
  '_': '/',
  '.': '=',
};

export const encodeHash = (base64: string) => {
  return base64.replace(/[+/]/g, (match: string) =>
    match in ENC ? ENC[match as keyof typeof ENC] : match,
  );
};

export const decode = (safe: string) => {
  return safe.replace(/[-_.]/g, (match: string) =>
    match in DEC ? DEC[match as keyof typeof DEC] : match,
  );
};
