export const toFzfColorName = (name: string) => {
  return name.replace('-plus', '+');
};

export const toStoreColorName = (name: string) => {
  return name.replace('+', '-plus');
};
