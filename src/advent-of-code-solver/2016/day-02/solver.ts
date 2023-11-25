import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';

export type Instruction = 'U' | 'D' | 'L' | 'R';
export type Instructions = Instruction[];
type Button = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export default class BathroomSecuritySolver extends Solver<Instructions[]> {
  private readonly keypad = this.setUpKeyPad();
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Instructions[] {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((instructions) => instructions.split('') as Instruction[]);
  }

  solvePartOne(): string {
    let finger_position: Button = 5;
    const buttons = this.input.map((instructions) => {
      finger_position = instructions.reduce(
        (button: Button, instruction) => this.keypad.get(button)!.get(instruction)!,
        finger_position,
      );
      return finger_position;
    });
    return buttons.join('');
  }

  solvePartTwo(): number {
    return 4711;
  }
  private setUpKeyPad(): Map<Button, Map<Instruction, Button>> {
    return new Map<Button, Map<Instruction, Button>>([
      [
        1,
        new Map([
          ['U', 1],
          ['D', 4],
          ['L', 1],
          ['R', 2],
        ]),
      ],
      [
        2,
        new Map([
          ['U', 2],
          ['D', 5],
          ['L', 1],
          ['R', 3],
        ]),
      ],
      [
        3,
        new Map([
          ['U', 3],
          ['D', 6],
          ['L', 2],
          ['R', 3],
        ]),
      ],
      [
        4,
        new Map([
          ['U', 1],
          ['D', 7],
          ['L', 4],
          ['R', 5],
        ]),
      ],
      [
        5,
        new Map([
          ['U', 2],
          ['D', 8],
          ['L', 4],
          ['R', 6],
        ]),
      ],
      [
        6,
        new Map([
          ['U', 3],
          ['D', 9],
          ['L', 5],
          ['R', 6],
        ]),
      ],
      [
        7,
        new Map([
          ['U', 4],
          ['D', 7],
          ['L', 7],
          ['R', 8],
        ]),
      ],
      [
        8,
        new Map([
          ['U', 5],
          ['D', 8],
          ['L', 7],
          ['R', 9],
        ]),
      ],
      [
        9,
        new Map([
          ['U', 6],
          ['D', 9],
          ['L', 8],
          ['R', 9],
        ]),
      ],
    ]);
  }
}
