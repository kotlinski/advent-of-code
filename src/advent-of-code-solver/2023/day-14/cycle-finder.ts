export type CycleResult = { loads: number[]; index: number };

/**
 * If a sequence in an array is repeating, that sequence and the start index will be returned, otherwise undefined
 * Default number of repetitions to be considered a cyclic pattern is five.
 */
export function checkForCycles(number_array: number[], number_of_repetitions = 5): CycleResult | undefined {
  if (number_array.length < number_of_repetitions) return undefined;
  for (let i = 1; i <= number_array.length / number_of_repetitions; i++) {
    const numbers: number[] = [...number_array].reverse();
    const cycles: number[][] = [];

    for (let j = 0; j < number_of_repetitions; j++) {
      cycles.push(numbers.splice(0, i));
    }
    if (cycles.map((cycle) => cycle.toString()).every((cycle) => cycle === cycles[0].toString())) {
      return { loads: cycles[0].reverse(), index: number_array.length - i * number_of_repetitions };
    }
  }
  return undefined;
}
