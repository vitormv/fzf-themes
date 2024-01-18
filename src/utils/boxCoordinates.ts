const emptyCoords = { top: 0, right: 0, bottom: 0, left: 0 };

export type BoxCoordinates = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export const boxCoordinatesToString = (coords: BoxCoordinates) => {
  const isSameVertical = coords.top === coords.bottom;
  const isSameHorizontal = coords.left === coords.right;
  const isAllSame = isSameHorizontal && isSameVertical && coords.top === coords.left;

  if (isAllSame) {
    return String(coords.top);
  } else if (isSameVertical && isSameHorizontal) {
    return `${coords.top},${coords.left}`;
  } else if (isSameHorizontal) {
    return `${coords.top},${coords.left},${coords.bottom}`;
  } else {
    return `${coords.top},${coords.right},${coords.bottom},,${coords.left}`;
  }
};

export const stringToBoxCoordinates = (coordsStr: string) => {
  const coords = String(coordsStr)
    .split(',')
    .map((i) => Math.min(Number.parseInt(i, 10), 50));

  if (coords.some((i) => Number.isNaN(i))) return emptyCoords;

  if (!coordsStr) {
    return emptyCoords;
  }

  switch (coords.length) {
    case 4:
      return { top: coords[0], right: coords[1], bottom: coords[2], left: coords[3] };
    case 3:
      return { top: coords[0], right: coords[1], bottom: coords[2], left: coords[1] };
    case 2:
      return { top: coords[0], right: coords[1], bottom: coords[0], left: coords[1] };
    case 1: {
      return { top: coords[0], right: coords[0], bottom: coords[0], left: coords[0] };
    }
    default:
      return emptyCoords;
  }
};
