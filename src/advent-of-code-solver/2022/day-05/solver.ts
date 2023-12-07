import { removeEmptyLinesPredicate, removeUndefinedPredicate } from '../../common/array-operations/filter';
import { stringToNumber } from '../../common/array-operations/map';
import Solver from '../../solver';

export class SupplyInstructions {
  constructor(private readonly crates: string[][], private readonly instructions: number[][]) {}

  getNextInstruction() {
    return this.instructions.pop();
  }
  hasMoreInstructions(): boolean {
    return this.instructions.length > 0;
  }
  performPopInstruction(instruction: number[]) {
    const number_of_crates = instruction[0];
    const from = instruction[1];
    const to = instruction[2];
    for (let i = 0; i < number_of_crates; i++) {
      const crate = this.crates[from - 1].pop();
      if (crate !== undefined) this.crates[to - 1].push(crate);
    }
  }
  performMoveInstruction(instruction: number[]) {
    const number_of_crates = instruction[0];
    const from = instruction[1];
    const to = instruction[2];
    const moved_crates: string[] = [];
    for (let i = 0; i < number_of_crates; i++) {
      moved_crates.push(this.crates[from - 1].pop()!);
    }
    this.crates[to - 1].push(...moved_crates.reverse());
  }

  getTopOfEachCrate(): string {
    return this.crates
      .map((create_pile: string[]) => create_pile.pop())
      .filter(removeUndefinedPredicate)
      .toString()
      .replaceAll(',', '');
  }
}
export default class SupplyStacks extends Solver<SupplyInstructions> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): SupplyInstructions {
    const supply_stocks = raw_input
      .split('\n\n')[0]
      .split('\n')
      .map((rows: string) => rows.split(''));
    const index_row = supply_stocks.pop();
    const crates: string[][] = [];
    index_row!.forEach((value: string, index: number) => {
      if (value !== ' ') {
        const crates_pile: string[] = [];
        supply_stocks.forEach((row: string[]) => {
          if (row[index] !== ' ') crates_pile.push(row[index]);
        });
        crates.push(crates_pile.reverse());
      }
    });

    const instructions: number[][] = raw_input
      .split('\n\n')[1]
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line_of_instructions: string) => line_of_instructions.match(/[-+]?[0-9]*\.?[0-9]+/g)!.map(stringToNumber));

    return new SupplyInstructions(crates, instructions.reverse());
  }

  solvePartOne(): string {
    while (this.input.hasMoreInstructions()) {
      const instructions = this.input.getNextInstruction();
      this.input.performPopInstruction(instructions!);
    }
    return this.input.getTopOfEachCrate();
  }

  solvePartTwo(): string {
    while (this.input.hasMoreInstructions()) {
      const instructions = this.input.getNextInstruction();
      this.input.performMoveInstruction(instructions!);
    }
    return this.input.getTopOfEachCrate();
  }
}
