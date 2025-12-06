import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';

type ParsedType = { numbers: string[][]; operator: string }[];

export default class TrashCompactorSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    const lines = raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split(''));
    const operators = lines.at(-1)!;

    const frame_indexes: number[] = operators.reduce((indexes: number[], char: string, index: number) => {
      if (operators[index] !== ' ') {
        indexes.push(index);
      }
      return indexes;
    }, []);
    const frames = lines.map((line) => {
      return frame_indexes.map((start, i) => line.slice(start, frame_indexes[i + 1] ? frame_indexes[i + 1] - 1 : line.length));
    });
    return frames.pop()!.map((frame, i) => ({
      operator: frame.join('').trim(),
      numbers: frames.map((line) => line[i]),
    }));
  }

  solvePartOne(): number {
    const sums = this.compute(this.input);
    return sums.reduce(summarize);
  }

  private compute(input: ParsedType) {
    return input.map(({ numbers, operator }) => {
      return this.calculateLine({
        numbers: numbers.map((number) => Number(number.join('').trim())),
        operation: operator,
      });
    });
  }

  solvePartTwo(): number {
    const right_to_left = this.input.map(({ numbers, operator }) => {
      const flipped_numbers = [];
      for (let i = 0; i < numbers[0].length; i++) {
        const new_value: string[] = [];
        numbers.map((number) => {
          new_value.push(number[i]);
        });
        flipped_numbers.push(new_value);
      }
      return {
        numbers: flipped_numbers,
        operator,
      };
    });
    const sums = this.compute(right_to_left);
    return sums.reduce(summarize);
  }
  private calculateLine(line: { numbers: number[]; operation: string }): number {
    return line.numbers.reduce((sum: number, number: number) => {
      if (sum === 0) return number;
      if (line.operation === '+') {
        return sum + number;
      } else if (line.operation === '-') {
        return sum - number;
      } else if (line.operation === '*') {
        return sum * number;
      }
      throw new Error(`unknown operation {line.operation}`);
    }, 0);
  }
}
