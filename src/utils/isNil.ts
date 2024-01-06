export const isNil = <T>(val: T | undefined | null): val is NonNullable<T> => {
  return val === undefined || val === null;
};
