/**
 * Decide whether to use black/white text depending on bg color
 *
 * @source https://24ways.org/2010/calculating-color-contrast
 */
export const getContrastColor = (bgColor: string) => {
  const r = parseInt(bgColor.substring(1, 3), 16);
  const g = parseInt(bgColor.substring(3, 5), 16);
  const b = parseInt(bgColor.substring(5, 7), 16);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? ('dark' as const) : ('light' as const);
};
