export const getStringFromHex = function name(number: number) {
  return number.toString(16).padStart(6, "0");
};

export const getHexFromString = function name(number: string) {
  return parseInt(number, 16);
};
