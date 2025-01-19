export function calcSin(x: number): number {
  let result = 0;
  let sign = 1;
  let power = x;
  let factorial = 1;

  for (let n = 0; n < 1000000; n++) {
    if (n > 0) {
      factorial *= (2 * n) * (2 * n + 1);
      power *= x * x;
      sign *= -1;
    }

    const delta = calcDelta(sign, power, factorial);

    if (isNaN(result + delta)) {
      return result
    }

    result += delta;
  }

  return result;
}

function calcDelta(sign: number, power: number, factorial: number): number {
  return sign * (power / factorial);
}
