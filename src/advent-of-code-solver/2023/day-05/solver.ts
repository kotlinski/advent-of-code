import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { stringToNumber } from '../../common/array-operations/map';
import { lowToHighNumber } from '../../common/array-operations/sort';

const map_keys: MapKey[] = [
  'seed-to-soil map',
  'soil-to-fertilizer map',
  'fertilizer-to-water map',
  'water-to-light map',
  'light-to-temperature map',
  'temperature-to-humidity map',
  'humidity-to-location map',
];
type MapKey =
  | 'seed-to-soil map'
  | 'soil-to-fertilizer map'
  | 'fertilizer-to-water map'
  | 'water-to-light map'
  | 'light-to-temperature map'
  | 'temperature-to-humidity map'
  | 'humidity-to-location map';
/**
 * seeds: 79 14 55 13
 *
 * seed-to-soil map:
 * 50 98 2
 * 52 50 48
 *
 * soil-to-fertilizer map:
 * 0 15 37
 * 37 52 2
 * 39 0 15
 *
 * fertilizer-to-water map:
 * 49 53 8
 * 0 11 42
 * 42 0 7
 * 57 7 4
 *
 * water-to-light map:
 * 88 18 7
 * 18 25 70
 *
 * light-to-temperature map:
 * 45 77 23
 * 81 45 19
 * 68 64 13
 *
 * temperature-to-humidity map:
 * 0 69 1
 * 1 0 69
 *
 * humidity-to-location map:
 * 60 56 37
 * 56 93 4
 */
export class FoodProductionMapper {
  private readonly seeds: number[];
  private readonly production = new Map<MapKey, Mapper[]>();
  constructor(input: string[]) {
    this.seeds = input[0].split(': ')[1].split(' ').map(stringToNumber);

    let current_key: MapKey;
    for (let i = 1; i < input.length; i++) {
      const line = input[i];
      const potential_key = line.split(':')[0];
      console.log(`potential_key: ${potential_key}`);

      if (map_keys.includes(potential_key as MapKey)) {
        current_key = potential_key as MapKey;
        this.production.set(current_key, []);
      } else {
        console.log(`line: ${JSON.stringify(line, null, 2)}`);
        console.log(`current_key: ${current_key!}`);
        this.production.get(current_key!)!.push(new Mapper(line));
      }
    }
  }
  public calculateClosestLocation() {
    const locations: number[] = this.seeds.map((seed) => {
      console.log(`seed: ${seed}`);
      return map_keys.reduce((mapped_value: number, key: MapKey) => {
        const mappers = this.production.get(key)!;
        const current_mapper = mappers?.filter((mapper) => {
          const min = mapper.source_range_start;
          const max = mapper.source_range_start + mapper.range_length;
          return min <= mapped_value && max >= mapped_value;
        })[0];
        if (current_mapper) {
          mapped_value += current_mapper.destination_range_start - current_mapper.source_range_start;
        }
        console.log(`${key}: ${mapped_value}`);
        return mapped_value;
      }, seed);
    });

    return locations.sort(lowToHighNumber)[0];
  }
}
class Mapper {
  public readonly destination_range_start: number;
  public readonly source_range_start: number;
  public readonly range_length: number;
  constructor(input: string) {
    const map_numbers = input.split(' ').map(stringToNumber);
    this.destination_range_start = map_numbers[0];
    this.source_range_start = map_numbers[1];
    this.range_length = map_numbers[2];
  }
}
export default class IfYouGiveASeedAFertilizerSolver extends Solver<FoodProductionMapper> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): FoodProductionMapper {
    return new FoodProductionMapper(raw_input.split('\n').filter(removeEmptyLinesPredicate));
  }

  solvePartOne(): number {
    return this.input.calculateClosestLocation();
  }

  solvePartTwo(): number {
    return 4711;
  }
}
