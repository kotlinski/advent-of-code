import { memoize } from '../../common/cache.js';
import Solver from '../../solver.js';

export default class LanternfishSolver extends Solver<number[]> {
  private readonly memo: (days_until_birth: number, days: number) => number;

  constructor(raw_input: string) {
    super(raw_input);
    this.memo = memoize<[number, number], number>(this.getNumberOfOffsprings(), (input) => `${input[0]},${input[1]}`);
  }

  parse(raw_input: string): number[] {
    return raw_input.split(',').map(Number);
  }

  solvePartOne(optional_param?: { iterations: number; input: number[] }): number {
    const lanternfish = optional_param?.input ?? this.input;
    const days = optional_param?.iterations ?? 80;
    let offsprings = lanternfish.length;
    lanternfish.forEach((days_until_birth) => {
      offsprings += this.memo(days_until_birth, days);
    });
    return offsprings;
  }

  solvePartTwo(): number {
    const lanternfish = this.input;
    const days = 256;
    let offsprings = lanternfish.length;
    lanternfish.forEach((days_until_birth) => {
      offsprings += this.memo(days_until_birth, days);
    });
    return offsprings;
  }

  private getNumberOfOffsprings() {
    return (days_until_birth: number, in_days: number): number => {
      in_days -= days_until_birth; // fast-forward to the next birth
      if (in_days <= 0) {
        return 0;
      }
      let offsprings = 0;
      for (let total_days = in_days; total_days > 0; total_days -= 7) {
        offsprings += 1;
        offsprings += this.memo(9, total_days);
      }
      return offsprings;
    };
  }
}
