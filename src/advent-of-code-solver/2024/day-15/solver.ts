import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import { coordinateToString, Grid } from '../../common/matrix/grid/grid.js';
import { Coordinate } from '../../common/matrix/interface.js';
import { Direction } from '../../common/matrix/grid/direction.js';
import { Tile } from '../../common/matrix/grid/tile.js';

type ParsedType = {
  robot: Coordinate;
  warehouse: ('O' | '.' | '#')[][];
  movements: Direction[];
};

type WarehouseTile = 'O' | '.' | '#' | '[' | ']';
export default class WarehouseWoesSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    const [raw_warehouse, movement] = raw_input.split('\n\n').filter(removeEmptyLinesPredicate);
    const matrix = raw_warehouse.split('\n').map((line) => line.split('')) as ('O' | '.' | '#' | '@')[][];
    let robot: Coordinate | undefined;
    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] === '@') {
          matrix[y][x] = '.';
          robot = { y, x };
        }
      }
    }
    if (!robot) throw new Error('Robot not found');
    return {
      robot,
      warehouse: matrix as ('O' | '.' | '#')[][],
      movements: movement
        .split('\n')
        .map((line) => {
          return line.split('');
        })
        .flat()
        .map((movement: string) => {
          switch (movement) {
            case '<':
              return 'left';
            case '>':
              return 'right';
            case '^':
              return 'up';
            case 'v':
              return 'down';
          }
          throw new Error('Invalid movement');
        }),
    };
  }

  solvePartOne(): number {
    const { robot, warehouse, movements } = this.input;
    const warehouse_grid = new Grid<WarehouseTile>(warehouse);
    this.moveRobot(movements, warehouse_grid, robot);
    this.printWarehouse(warehouse_grid, robot, movements[movements.length - 1]);
    let score = 0;
    warehouse_grid.traverseTiles((tile) => {
      if (tile.value === 'O') {
        const { x, y } = tile.getCoordinate();
        score += y * 100 + x;
      }
    });
    return score;
  }

  private moveRobot(movements: Direction[], warehouse: Grid<WarehouseTile>, robot_pos: Coordinate) {
    movements.forEach((movement: Direction) => {
      const next = warehouse.getNextTileInDirection(robot_pos, movement);
      if (!next) throw new Error('Invalid movement');
      switch (next.value) {
        case '.':
          robot_pos = next;
          break;
        case '[':
        case ']':
        case 'O': {
          //if (movement === 'right' || movement === 'left') {
          const boxes = [...this.getSequenceOfHorizontalBoxes(warehouse, next, movement)];
          const can_be_pushed = boxes.every((box) => {
            const next_tile = warehouse.getNextTileInDirection(box, movement);
            return next_tile?.value !== '#';
          });
          if (can_be_pushed) {
            while (boxes.length > 0) {
              const box = boxes.pop()!;
              const next_tile = warehouse.getNextTileInDirection(box, movement)!;
              next_tile.value = box.value;
              box.value = '.';
            }
            robot_pos = next;
          }
          //}
          break;
        }
        case '#':
          break;
      }
      // this.printWarehouse(warehouse, robot_pos, movement);
    });
  }

  private getSequenceOfHorizontalBoxes(
    warehouse: Grid<WarehouseTile>,
    init: Tile<WarehouseTile>,
    direction: Direction /*'left' | 'right'*/,
  ) {
    const box_coordinates = new Set<Tile<WarehouseTile>>([init]);
    let count = 1;
    while (['O', '[', ']'].some((tile) => tile === warehouse.getTileInDirection(init, direction, count)!.value)) {
      box_coordinates.add(warehouse.getTileInDirection(init, direction, count)!);
      count++;
    }
    return box_coordinates;
  }

  solvePartTwo(): number {
    const {
      robot: { x, y },
      warehouse,
      movements,
    } = this.input;
    const robot = { x: 2 * x, y };
    const warehouse_grid = new Grid<WarehouseTile>(this.widenWarehouse(warehouse));
    this.printWarehouse(warehouse_grid, robot, movements[0]);
    return 1223213;
  }

  private printWarehouse(warehouse: Grid<WarehouseTile>, robot: Coordinate, movement: Direction) {
    const copy = new Grid<WarehouseTile | '@'>(warehouse.matrix.map((row) => row.map((tile) => tile.value)));
    copy.getTileAtCoordinate(robot)!.value = '@';
    console.log();
    console.log('Move: ', movement);
    console.log(copy.toString());
    console.log();
  }

  private widenWarehouse(warehouse: ('O' | '.' | '#')[][]): ('.' | '#' | '[' | ']')[][] {
    return warehouse.map((row) =>
      row
        .map((tile): ('.' | '#' | '[' | ']')[] => {
          if (tile === 'O') {
            return ['[', ']'];
          } else if (tile === '.') {
            return ['.', '.'];
          } else if (tile === '#') {
            return ['#', '#'];
          }
          throw new Error('Invalid tile');
        })
        .flat(),
    );
  }
}
