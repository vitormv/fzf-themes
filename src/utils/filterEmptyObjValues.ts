export const filterEmptyObjValues = (obj: Record<string, string>) => {
  const objNoEmptyValues: Record<string, string> = {};

  for (const prop in obj) {
    if (!obj[prop]) continue;

    objNoEmptyValues[prop] = obj[prop];
  }

  return objNoEmptyValues;
};
