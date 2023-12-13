import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';

function allZeros(historical_values: number[][]) {
  const last_level = historical_values.at(-1)!;
  return last_level.every((value) => value === 0);
}

export class OasisAndSandInstabilitySensor {
  public readonly values: number[][];
  constructor(input: string) {
    this.values = input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split(' ').map(Number));
  }
  public extrapolate(historical_values: number[]) {
    const levels = [historical_values];
    this.buildLevelsTree(levels);

    const extrapolated_levels = levels.reverse().reduce((updated_levels: number[][], level, index) => {
      if (index === 0) {
        level.push(0);
        updated_levels.push(level);
        return updated_levels;
      }
      const last_level = updated_levels[index - 1];
      const last_value_last_level = last_level.at(-1)!;
      level.push(level.at(-1)! + last_value_last_level);
      updated_levels.push(level);
      return updated_levels;
    }, []);
    const history_with_future = extrapolated_levels.reverse()[0];
    return history_with_future.at(-1)!;
  }

  private buildLevelsTree(levels: number[][]) {
    while (!allZeros(levels)) {
      const next_level = levels.at(-1)!.reduce((level: number[], current, index, array) => {
        if (index + 1 === array.length) return level;
        level.push(array[index + 1] - current);
        return level;
      }, []);
      levels.push(next_level);
    }
  }
}
