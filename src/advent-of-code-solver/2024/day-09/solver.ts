import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

type Block = { size: number; id: number };
type Storage = {
  empty: { size: number }[];
  data: Block[];
};

export default class DiskFragmenterSolver extends Solver<Storage> {
  private output = '';
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Storage {
    const numbers = raw_input.split('').filter(removeEmptyLinesPredicate).map(Number);
    return numbers.reduce(
      (blocks: Storage, size, index) => {
        if (index % 2 === 1) {
          blocks.empty.push({ size });
        } else {
          blocks.data.push({ size, id: index / 2 });
        }
        return blocks;
      },
      { empty: [], data: [] },
    );
  }

  solvePartOne(): number {
    const { empty, data } = this.input;
    const filled_void: Block[][] = empty.map(({ size }, index: number) => {
      return this.pickFromData(data, size, index);
    });
    console.log(`filled_void: ${JSON.stringify(filled_void, null, 2)}`);
    console.log(`data: ${JSON.stringify(data, null, 2)}`);
    const max = Math.max(empty.length, data.length);
    let result = 0;
    let index = 0;
    for (let i = 0; i < max; i++) {
      if (data.length > 0) {
        const { size, id } = data.shift()!;
        result += this.addResult(index, size, id);
        index += size;
      }
      if (filled_void.length > 0) {
        const blocks = filled_void.shift()!;
        for (const block of blocks) {
          result += this.addResult(index, block.size, block.id);
          index += block.size;
        }
      }
    }
    console.log(`output: ${JSON.stringify(this.output, null, 2)}`);
    return result;
  }

  private addResult(index: number, size: number, id: number) {
    let result = 0;
    for (let i = 0; i < size; i++) {
      this.output += id;
      result += (index + i) * id;
    }
    return result;
    // 0099811188827773336446555665..............
    // 0099811188827773336446555566..............
  }

  private pickFromData(blocks: Block[], size: number, tip: number) {
    const result: Block[] = [];
    while (size > 0) {
      if (blocks.length === 0) {
        console.log('no more blocks');
        throw new Error('no more blocks');
      }
      const block = blocks.pop()!;
      if (block.id <= tip) {
        blocks.push(block);
        size = 0; // quit
      } else if (block.size === size) {
        result.push(block);
        size = 0;
      } else if (block.size > size) {
        result.push({ size, id: block.id });
        blocks.push({ size: block.size - size, id: block.id });
        size = 0;
      } else {
        result.push(block);
        size -= block.size;
      }
    }
    return result;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
