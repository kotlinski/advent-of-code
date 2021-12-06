import Solver from '../../solver';

const map = new Map<string, number>();

function getNumberOfOffsprings(days_until_birth: number, in_days: number): number {
  in_days -= days_until_birth; // fast-forward to the next birth
  if (in_days <= 0) {
    return 0;
  }
  if (map.has(`${days_until_birth},${in_days}`)) {
    return map.get(`${days_until_birth},${in_days}`)!;
  }
  let offsprings = 0;
  for (let total_days = in_days; total_days > 0; total_days -= 7) {
    offsprings += 1;
    offsprings += getNumberOfOffsprings(9, total_days);
  }

  map.set(`${days_until_birth},${in_days}`, offsprings);
  return offsprings;
}

export default class LanternfishSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split(',').map((number) => parseInt(number, 10));
  }

  solvePartOne(optional_param?: { iterations: number; input: number[] }): number {
    const lanternfish = optional_param?.input ?? this.input;
    const DAYS = optional_param?.iterations ?? 80;
    let offsprings = lanternfish.length;
    lanternfish.forEach((days_until_birth) => {
      offsprings += getNumberOfOffsprings(days_until_birth, DAYS);
    });
    return offsprings;
  }

  solvePartTwo(): number {
    const lanternfish = this.input;
    const DAYS = 256;
    let offsprings = lanternfish.length;
    lanternfish.forEach((days_until_birth) => {
      offsprings += getNumberOfOffsprings(days_until_birth, DAYS);
    });
    return offsprings;
  }
}
