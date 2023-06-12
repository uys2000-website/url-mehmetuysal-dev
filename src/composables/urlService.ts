export const hexAsString = function name(number: number) {
  return number.toString(16).padStart(6, "0");
};

export const stringAsHex = function name(number: string) {
  return parseInt(number, 16);
};

export const getUrl = function (lastUrl: string = "000000") {
  const number = stringAsHex("0x" + lastUrl);
  return hexAsString(number + 0x1);
};
