import { isFullyVisibleInDirection, numberOfVisibleTreesInDirection } from './treegrid-operations';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter';
import { splitStringOnChar } from '../../common/array-operations/map';
import { productarize } from '../../common/array-operations/reduce';
import { highToLowCompareFunction } from '../../common/array-operations/sort';
import { all_directions } from '../../common/matrix/grid/direction';
import Solver from '../../solver';

export default class TreetopTreeHouse extends Solver<number[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[][] {
    const lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return lines.map(splitStringOnChar('')).map((line) => line.map(Number));
  }

  solvePartOne(): number {
    let count = 0;
    for (let row = 0; row < this.input.length; row++) {
      for (let column = 0; column < this.input[row].length; column++) {
        count += all_directions.some(isFullyVisibleInDirection(this.input, row, column)) ? 1 : 0;
      }
    }
    return count;
  }

  solvePartTwo(): number {
    const products: number[] = [];
    for (let row = 0; row < this.input.length; row++) {
      for (let column = 0; column < this.input[row].length; column++) {
        products.push(all_directions.map(numberOfVisibleTreesInDirection(this.input, row, column)).reduce(productarize, 1));
      }
    }
    return products.sort(highToLowCompareFunction())[0];
  }
}
