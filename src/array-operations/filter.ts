export function print<T>(a: T): T {
  console.log(`${JSON.stringify(a, null, 2)}`);
  return a;
}

export const removeEmptyLinesPredicate = (line: string | any[]) => line.length > 0;

export const mustBeEqualOrHigherThanPredicate = (compare: number) => (n: number) => n >= compare;
