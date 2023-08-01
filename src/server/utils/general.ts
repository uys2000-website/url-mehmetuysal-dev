export const getStringFromHex = function name(number: number) {
  return number.toString(16).padStart(6, "0");
};

export const getHexFromString = function name(number: string) {
  return parseInt(number, 16);
};

export const getRecreatedIndex = function (index: string) {
  return getStringFromHex(getHexFromString(index));
};

type F = (...args: any[]) => any;
export const runLater = function <T extends F>(
  f: T,
  ...p: Parameters<typeof f>
) {
  setTimeout(() => f.apply(null, p));
};
