/**
 * See year 2023 day 12 for usage or 2024 day 11
 *
 * The type T is an array of the memoized function's input parameters.
 */
export function memoize<T extends unknown[], U>(fn: (...a: T) => U, resolver: (input: T) => string) {
  const memo: Map<string, U> = new Map();
  return function (...x: T) {
    const key = resolver(x);
    return memo.set(key, memo.has(key) ? memo.get(key)! : fn(...x)).get(key)!;
  };
}
