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
    const program = [...this.input];
    const noun = 12;
    const verb = 2;
    program[1] = noun;
    program[2] = verb;
    return this.runProgram(program)[0];
  }

  solvePartTwo(): number {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 99; j++) {
        const program = [...this.input];
        const noun = i;
        const verb = j;
        program[1] = noun;
        program[2] = verb;
        if (this.runProgram(program)[0] === 19690720) return 100 * noun + verb;
      }
    }
    return 4711;
  }

  runProgram(input: number[] = this.input): number[] {
    for (let instruction_pointer = 0; instruction_pointer < input.length; instruction_pointer += 4) {
      const opcode = input[instruction_pointer];
      const parameter_1 = input[instruction_pointer + 1];
      const parameter_2 = input[instruction_pointer + 2];
      const parameter_4 = input[instruction_pointer + 3];
      switch (opcode) {
        case 1:
          input[parameter_4] = input[parameter_1] + input[parameter_2];
          break;
        case 2:
          input[parameter_4] = input[parameter_1] * input[parameter_2];
          break;
        case 99:
          return input;
      }
    }
    return [];
  }
}
