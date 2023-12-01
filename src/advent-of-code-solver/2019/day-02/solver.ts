import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';
import { stringToNumber } from '../../common-operations/array-operations/map';

export default class ProgramAlarmSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split(',').filter(removeEmptyLinesPredicate).map(stringToNumber);
  }

  solvePartOne(): number {
    const program = this.input;
    program[1] = 12;
    program[2] = 2;
    return this.runProgramPart1(this.input)[0];
  }

  solvePartTwo(): number {
    return 4711;
  }

  runProgramPart1(input: number[] = this.input): number[] {
    for (let offset = 0; offset < input.length; offset += 4) {
      console.log(`input: ${JSON.stringify(input, null, 2)}`);
      const operation = input[offset];
      const index_value_a = input[offset + 1];
      const index_value_b = input[offset + 2];
      const result_index = input[offset + 3];
      console.log(`operation: ${operation}`);
      console.log(`value_a: ${index_value_a}`);
      console.log(`value_b: ${index_value_b}`);
      console.log(`result_index: ${result_index}`);
      switch (operation) {
        case 1:
          console.log(`input[${result_index}] = ${input[index_value_a]} + ${input[index_value_b]}`);
          input[result_index] = input[index_value_a] + input[index_value_b];
          break;
        case 2:
          console.log(`input[${result_index}] = ${input[index_value_a]} * ${input[index_value_b]}`);
          input[result_index] = input[index_value_a] * input[index_value_b];
          break;
        case 99:
          console.log(`input: ${JSON.stringify(input, null, 2)}`);
          return input;
      }
    }
    console.log(`end of loop}`);
    return [];
  }
}
