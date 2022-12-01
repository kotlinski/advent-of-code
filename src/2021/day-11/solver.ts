import Solver from '../../solver';

function prettyPrint(dumbo_octopi: number[][]) {
  let output = '';
  for (const line of dumbo_octopi) {
    for (const dumbo of line) {
      output += `${dumbo},`;
    }
    output += '\n';
  }
  console.log(output);
}

function addOneToEveryDumbo(dumbo_octopi: number[][]) {
  dumboIterator(dumbo_octopi, (x, y) => {
    dumbo_octopi[y][x]++;
  });
}

function containsSomethingThatCanFlash(line: number[]): boolean {
  return line.some((dumbo) => dumbo >= 10);
}

function createAFlashDiff(dumbo_octopi: number[][]) {
  const flash_diff: number[][] = []
  dumboIterator(dumbo_octopi, (x, y) => {
    if (!flash_diff[y]) flash_diff[y] = []
    flash_diff[y][x] = 0
    {
      [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1],
      ].forEach((coordinate_offset: number[]) => {
        const neighbour_x = x + coordinate_offset[1];
        const neighbour_y = y + coordinate_offset[0];
        if (
            neighbour_x >= 0 &&
            neighbour_y >= 0 &&
            neighbour_x < dumbo_octopi[0].length &&
            neighbour_y < dumbo_octopi.length
        ) {
          if (dumbo_octopi[neighbour_y][neighbour_x] > 9) {
            flash_diff[y][x]++;
          }
        }
      });
    }
  })
  return flash_diff;
}

function deprecateDumbos(dumbo_octopi: number[][]): void {
  dumboIterator(dumbo_octopi, (x, y) => {
    if (dumbo_octopi[y][x] > 9) {
      dumbo_octopi[y][x] = 0;
    }
  })
}

function countDeprecateDumbos(dumbo_octopi: number[][]): number {
  let count = 0;
  dumboIterator(dumbo_octopi, (x, y) => {
    if (dumbo_octopi[y][x] === 0) {
      count++;
    }
  })
  return count;
}

function addDiffToNonDeprecatedDumbos(dumbo_octopi: number[][], flash_diff: number[][]) {
  dumboIterator(dumbo_octopi, (x, y) => {
    if (dumbo_octopi[y][x] !== 0) {
      dumbo_octopi[y][x] += flash_diff[y][x]
    }
  })
}

function dumboIterator(dumbo_octopi: number[][], operation: (y: number, x: number) => any) {
  for (let y = 0; y < dumbo_octopi.length; y++) {
    for (let x = 0; x < dumbo_octopi[0].length; x++) {
      operation(x, y)
    }
  }
}

function performStep(dumbo_octopi: number[][]) {
  addOneToEveryDumbo(dumbo_octopi);
  while (dumbo_octopi.some(containsSomethingThatCanFlash)) {
    const flash_diff: number[][] = createAFlashDiff(dumbo_octopi);
    deprecateDumbos(dumbo_octopi);
    addDiffToNonDeprecatedDumbos(dumbo_octopi, flash_diff);
  }
}

export default class DumboOctopusSolver extends Solver<number[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[][] {
    return raw_input
        .split('\n')
        .filter((line: string) => line.length > 0)
        .map((line) => line.split('').map((number) => parseInt(number, 10)));
  }

  solvePartOne(optional_params?: { iterations: number }): number {
    const dumbo_octopi = this.input;
    let total_flashes = 0;
    const steps = optional_params?.iterations ?? 100;
    for (let i = 0; i < steps; i++) {
      performStep(dumbo_octopi);
      total_flashes += countDeprecateDumbos(dumbo_octopi);
    }
    prettyPrint(dumbo_octopi)
    return total_flashes;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
