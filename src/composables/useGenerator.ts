export const getStringFromHex = function name(number: number) {
  return number.toString(16).padStart(6, "0");
};

export const getHexFromString = function name(number: string) {
  return parseInt(number, 16);
};
export const isHex = function (number: string) {
  const regex = /[0-9A-Fa-f]{6}/g;
  return number.match(regex) ? true : false;
};
