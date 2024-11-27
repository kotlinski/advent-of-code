import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { summarize } from '../../common/array-operations/reduce.js';

type CubeColor = 'red' | 'green' | 'blue';
export class Game {
  public readonly game_id: number;
  private readonly sets: Record<CubeColor, number>[];
  constructor(private readonly game_record: string) {
    this.game_id = Number(this.game_record.split(':')[0].replace('Game ', ''));
    const raw_sets = this.game_record.split(':')[1].split(';');
    this.sets = raw_sets.reduce((prev_sets: Record<CubeColor, number>[], set: string) => {
      const raw_cubes: string[] = set.split(',');
      const cubes = raw_cubes.reduce(
        (previous_cubes: Record<CubeColor, number>, raw_cube: string) => {
          if (raw_cube.endsWith('blue')) {
            previous_cubes.blue += Number(raw_cube.replace(' blue', ''));
          } else if (raw_cube.endsWith('red')) {
            previous_cubes.red += Number(raw_cube.replace(' red', ''));
          } else if (raw_cube.endsWith('green')) {
            previous_cubes.green += Number(raw_cube.replace(' green', ''));
          }
          return previous_cubes;
        },
        { red: 0, green: 0, blue: 0 },
      );
      return [...prev_sets, cubes];
    }, []);
  }
  public getSets(): Record<CubeColor, number>[] {
    return [...this.sets.values()];
  }

  getMaxNumbers(): Record<CubeColor, number> {
    return [...this.sets.values()].reduce(
      (previous: Record<CubeColor, number>, current: Record<CubeColor, number>) => ({
        red: previous.red > current.red ? previous.red : current.red,
        green: previous.green > current.green ? previous.green : current.green,
        blue: previous.blue > current.blue ? previous.blue : current.blue,
      }),
      {
        red: 0,
        green: 0,
        blue: 0,
      },
    );
  }
}
export default class CubeConundrumSolver extends Solver<Game[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Game[] {
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((record: string) => new Game(record));
  }

  solvePartOne(): number {
    const fulfilled_games = this.input.filter((game) => {
      for (const { red, green, blue } of game.getSets()) {
        if (red > 12 || green > 13 || blue > 14) {
          return false;
        }
      }
      return true;
    });
    const fulfilled_game_ids = fulfilled_games.map((game) => game.game_id);
    return fulfilled_game_ids.reduce(summarize, 0);
  }

  solvePartTwo(): number {
    const game_powers = this.input.map((game) => {
      const { red, green, blue } = game.getMaxNumbers();
      return red * green * blue;
    });
    return game_powers.reduce(summarize, 0);
  }
}
