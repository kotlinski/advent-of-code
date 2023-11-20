export function print<T>(a: T): T {
  console.log(`${JSON.stringify(a, null, 2)}`);
  return a;
}

export const removeEmptyLinesPredicate = (line: string | any[]) => line.length > 0;
export const removeSpacePredicate = (line: string | any[]) => line !== ' ';
export const removeNonNumbers = (number: number | any[]) => !Number.isNaN(number);
export const removeUndefinedPredicate = (line: any | undefined) => line !== undefined;

export const mustBeEqualOrHigherThanPredicate = (compare: number) => (n: number) => n >= compare;
