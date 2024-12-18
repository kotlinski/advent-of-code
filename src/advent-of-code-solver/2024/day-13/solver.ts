import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';

interface XYValue {
  x: number;
  y: number;
}
type ParsedType = { a: XYValue; b: XYValue; prize: XYValue }[];

export default class ClawContraptionSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    return raw_input
      .split('\n\n')
      .filter(removeEmptyLinesPredicate)
      .map((section) => {
        const parsed_sections = section
          .split('\n')
          .filter(removeEmptyLinesPredicate)
          .map((numbers) => {
            const key = numbers.match(/(\w+):/)![1].toLowerCase();
            const [x, y] = numbers.match(/\d+/g)!.map(Number);
            return { [key]: { x, y } };
          });
        return Object.assign({}, ...parsed_sections);
      });
  }

  solvePartOne(): number {
    const costs = this.findMinCosts();
    return costs.reduce(summarize, 0);
  }

  solvePartTwo(): number {
    const costs = this.findMinCosts(10_000_000_000_000);
    return costs.reduce(summarize, 0);
  }

  private findMinCosts(extra_input = 0): number[] {
    return this.input
      .map(({ a, b, prize }) => {
        return { a, b, prize: { x: extra_input + prize.x, y: extra_input + prize.y } };
      })
      .map(({ a, b, prize }) => {
        const numerator_a = b.y * prize.x - b.x * prize.y;
        const numerator_b = a.x * prize.y - a.y * prize.x;
        const denominator = a.x * b.y - a.y * b.x;
        const b_count = numerator_b / denominator;
        const a_count = numerator_a / denominator;
        if (b_count < 0 || a_count < 0) {
          //console.log('negative numbers');
          //this.prettyPrint(a, b, prize, a_count, b_count);
          return 0;
        } else if (Math.floor(b_count) !== b_count) {
          // this.prettyPrint(a, b, prize, a_count, b_count);
          return 0;
        } else if (Math.floor(a_count) !== a_count) {
          return 0;
        }
        return a_count * 3 + b_count;
      });
  }

  private prettyPrint(a: XYValue, b: XYValue, prize: { x: number; y: number }, a_count: number, b_count: number) {
    console.log(
      `Button A: X+${a.x}, Y+${a.y}\n` +
        `Button B: X+${b.x}, Y+${b.y}\n` +
        `Prize: X=${prize.x}, Y=${prize.y}\n\n` +
        `A: ${a_count}\n` +
        `B: ${b_count}\n` +
        `Prize: X=${prize.x} = ${b_count * b.x} + ${a_count * a.x} = \n` +
        `         ${b_count * b.x + a_count * a.x}\n` +
        `Prize: Y=${prize.y} = ${b_count * b.y} + ${a_count * a.y} = \n` +
        `         ${b_count * b.y + a_count * a.y}\n\n`,
    );
  }

  private maxIterations(b: XYValue, prize: XYValue): number {
    return Math.round(Math.min(prize.x / b.x, prize.y / b.y));
  }
}
