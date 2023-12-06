import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { stringToNumber } from '../../common/array-operations/map';
import { productarize } from '../../common/array-operations/reduce';
import { any_space } from '../../common/array-operations/split';

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
  constructor({ distances, times }: { distances: number[]; times: number[] }) {
    this.races = distances.map((distance, index) => new Race({ distance, ms: times[index] }));
  }

  findWaysToWin(): number[] {
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
    const times = lines[0].split(': ')[1].split(any_space).filter(removeEmptyLinesPredicate).map(stringToNumber);
    const distances = lines[1].split(': ')[1].split(any_space).filter(removeEmptyLinesPredicate).map(stringToNumber);
    return new BoatTournament({ times, distances });
  }

  solvePartOne(): number {
    return this.input.findWaysToWin().reduce(productarize, 1);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
