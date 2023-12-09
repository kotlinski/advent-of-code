function findGreatestCommonDivisor(a: number, b: number): number {
  // Euclidean algorithm to find GCD
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function findLeastCommonMultiplierOfTwo(a: number, b: number): number {
  // LCM(a, b) = |a * b| / GCD(a, b)
  return Math.abs(a * b) / findGreatestCommonDivisor(a, b);
}

export function findLeastCommonMultiplier(numbers: number[]): number {
  let least_common_multiplier = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    least_common_multiplier = findLeastCommonMultiplierOfTwo(least_common_multiplier, numbers[i]);
  }

  return least_common_multiplier;
}
