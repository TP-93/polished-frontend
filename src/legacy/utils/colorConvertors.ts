// @ts-nocheck
export function rgbToHex(r: any, g: any, b: any) {
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (r > 255 || g > 255 || b > 255) throw 'Invalid color component';
  // eslint-disable-next-line no-bitwise
  return ((r << 16) | (g << 8) | b).toString(16);
}
