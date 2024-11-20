import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { productarize } from '../../common/array-operations/reduce.js';
import { any_space } from '../../common/array-operations/split.js';

class Race {
  public readonly ms: number;
  public readonly distance: number;
  constructor({ ms, distance }: { ms: number; distance: number }) {
    this.ms = ms;
    this.distance = distance;
  }
}
export class BoatTournament {
  private readonly races: Race[];
  constructor(
    { distances, times }: { distances: number[]; times: number[] },
    private readonly race: Race,
  ) {
    this.races = distances.map((distance, index) => new Race({ distance, ms: times[index] }));
  }

  findWaysToWinTheRaces(): number[] {
    return this.races.map((race): number => {
      const distances: number[] = [];
      for (let i = 0; i <= race.ms; i++) {
        const speed = i;
        const distance = speed * (race.ms - i);
        distances.push(distance);
      }
      return distances.filter((distance) => distance > race.distance).length;
    });
  }
  findWaysToWinTheRace(): number {
    const distances: number[] = [];
    for (let i = 0; i <= this.race.ms; i++) {
      const speed = i;
      const distance = speed * (this.race.ms - i);
      distances.push(distance);
    }
    return distances.filter((distance) => distance > this.race.distance).length;
  }
}
export default class WaitForItSolver extends Solver<BoatTournament> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): BoatTournament {
    /*
      Time:      7  15   30
      Distance:  9  40  200
     */
    const lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    const times = lines[0].split(': ')[1].split(any_space).filter(removeEmptyLinesPredicate).map(Number);
    const distances = lines[1].split(': ')[1].split(any_space).filter(removeEmptyLinesPredicate).map(Number);
    const ms = Number(times.join(''));
    const distance = Number(distances.join(''));
    const race = new Race({ ms, distance });
    return new BoatTournament({ times, distances }, race);
  }

  solvePartOne(): number {
    return this.input.findWaysToWinTheRaces().reduce(productarize, 1);
  }

  solvePartTwo(): number {
    return this.input.findWaysToWinTheRace();
  }
}
