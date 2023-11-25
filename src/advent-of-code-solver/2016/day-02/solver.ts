import Solver from '../../../advent-of-code-solver/solver';
import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';

export type Instruction = 'U' | 'D' | 'L' | 'R';
export type Instructions = Instruction[];
type Button1To9 = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Button1ToD = 'A' | 'B' | 'C' | 'D' | Button1To9;
export default class BathroomSecuritySolver extends Solver<Instructions[]> {
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
    return this.solveKeypadInstructions<Button1To9>(this.setUpKeypad1());
  }
  solvePartTwo(): string {
    return this.solveKeypadInstructions<Button1ToD>(this.setUpKeypad2());
  }

  private solveKeypadInstructions<T extends Button1To9 | Button1ToD>(keypad: Map<T, Map<Instruction, T>>) {
    let final_button: T;
    const buttons: T[] = this.input.map(
      (instructions) =>
        (final_button = instructions.reduce(
          (button: T, instruction) => keypad.get(button)!.get(instruction) ?? button,
          final_button ?? '5',
        )),
    );
    return buttons.join('');
  }

  private setUpKeypad1(): Map<Button1To9, Map<Instruction, Button1To9>> {
    return new Map<Button1To9, Map<Instruction, Button1To9>>([
      [
        '1',
        new Map([
          ['D', '4'],
          ['R', '2'],
        ]),
      ],
      [
        '2',
        new Map([
          ['D', '5'],
          ['L', '1'],
          ['R', '3'],
        ]),
      ],
      [
        '3',
        new Map([
          ['D', '6'],
          ['L', '2'],
        ]),
      ],
      [
        '4',
        new Map([
          ['U', '1'],
          ['D', '7'],
          ['R', '5'],
        ]),
      ],
      [
        '5',
        new Map([
          ['U', '2'],
          ['D', '8'],
          ['L', '4'],
          ['R', '6'],
        ]),
      ],
      [
        '6',
        new Map([
          ['U', '3'],
          ['D', '9'],
          ['L', '5'],
        ]),
      ],
      [
        '7',
        new Map([
          ['U', '4'],
          ['R', '8'],
        ]),
      ],
      [
        '8',
        new Map([
          ['U', '5'],
          ['L', '7'],
          ['R', '9'],
        ]),
      ],
      [
        '9',
        new Map([
          ['U', '6'],
          ['L', '8'],
        ]),
      ],
    ]);
  }
  private setUpKeypad2(): Map<Button1ToD, Map<Instruction, Button1ToD>> {
    return new Map<Button1ToD, Map<Instruction, Button1ToD>>([
      ['1', new Map([['D', '3']])],
      [
        '2',
        new Map([
          ['D', '6'],
          ['R', '3'],
        ]),
      ],
      [
        '3',
        new Map([
          ['U', '1'],
          ['D', '7'],
          ['L', '2'],
          ['R', '4'],
        ]),
      ],
      [
        '4',
        new Map([
          ['D', '8'],
          ['L', '3'],
        ]),
      ],
      ['5', new Map([['R', '6']])],
      [
        '6',
        new Map([
          ['U', '2'],
          ['D', 'A'],
          ['L', '5'],
          ['R', '7'],
        ]),
      ],
      [
        '7',
        new Map([
          ['U', '3'],
          ['D', 'B'],
          ['L', '6'],
          ['R', '8'],
        ]),
      ],
      [
        '8',
        new Map([
          ['U', '4'],
          ['D', 'C'],
          ['L', '7'],
          ['R', '9'],
        ]),
      ],
      ['9', new Map([['L', '8']])],
      [
        'A',
        new Map([
          ['R', 'B'],
          ['U', '6'],
        ]),
      ],
      [
        'B',
        new Map([
          ['L', 'A'],
          ['U', '7'],
          ['D', 'D'],
          ['R', 'C'],
        ]),
      ],
      [
        'C',
        new Map([
          ['L', 'B'],
          ['U', '8'],
        ]),
      ],
      ['D', new Map([['U', 'B']])],
    ]);
  }
}
