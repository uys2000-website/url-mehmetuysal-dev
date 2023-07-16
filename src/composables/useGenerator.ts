export const getStringFromHex = function name(number: number) {
  return number.toString(16).padStart(6, "0");
};

export const getHexFromString = function name(number: string) {
  return parseInt(number, 16);
};

export const getNextUrl = function (lastUrl: string = "000000") {
  const number = getHexFromString("0x" + lastUrl);
  return getStringFromHex(number + 0x1);
};