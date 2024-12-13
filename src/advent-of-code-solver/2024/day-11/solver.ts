import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { memoize } from '../../common/cache.js';

type ParsedType = number[];

export default class PlutonianPebblesSolver extends Solver<ParsedType> {
  private moveStones: (stone: number, steps: number) => number;
  constructor(raw_input: string) {
    super(raw_input);
    this.moveStones = memoize<[number, number], number>(this.getStoneMover(), ([stone, step]) => `${stone}.${step}`);
  }
  private getStoneMover() {
    return (stone: number, steps: number): number => {
      if (steps === 0) {
        return 1;
      } else {
        steps--;
      }
      if (stone === 0) {
        return this.moveStones(1, steps);
      } else if (stone.toString().length % 2 === 0) {
        const stone_split = stone.toString().split('');
        const first = stone_split.splice(0, Math.ceil(stone_split.length / 2)).join('');
        const second = stone_split.join('');
        return this.moveStones(Number(first), steps) + this.moveStones(Number(second), steps);
      }
      return this.moveStones(stone * 2024, steps);
    };
  }

  parse(raw_input: string): ParsedType {
    return raw_input.split(' ').filter(removeEmptyLinesPredicate).map(Number);
  }

  solvePartOne(params?: { iterations: number }): number {
    const iterations = params?.iterations ?? 25;
    return this.input.reduce((sum, stone) => {
      return sum + this.moveStones(stone, iterations);
    }, 0);
  }

  solvePartTwo(): number {
    return this.input.reduce((sum, stone) => {
      return sum + this.moveStones(stone, 75);
    }, 0);
  }
}
