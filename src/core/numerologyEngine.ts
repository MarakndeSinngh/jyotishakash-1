export function sumDigits(val: number | string): number {
  return String(val)
    .replace(/[^0-9]/g, '')
    .split('')
    .reduce((acc, d) => acc + Number(d), 0);
}

export function reduceToDigit(val: number | string): number {
  let res = sumDigits(val);
  while (res > 9) {
    res = sumDigits(res);
  }
  return res === 0 ? 1 : res;
}
