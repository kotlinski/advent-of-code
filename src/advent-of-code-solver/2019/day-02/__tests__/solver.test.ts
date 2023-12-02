import ProgramAlarmSolver from '../solver';

describe('day 2', () => {
  let solver: ProgramAlarmSolver;
  describe('runProgram', () => {
    type TestCase = { input: string; output: number[] };
    const cases: TestCase[] = [
      { input: '1,9,10,3,2,3,11,0,99,30,40,50\n', output: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50] },
      { input: '1,0,0,0,99\n', output: [2, 0, 0, 0, 99] },
      { input: '2,3,0,3,99\n', output: [2, 3, 0, 6, 99] },
      { input: '2,4,4,5,99,0\n', output: [2, 4, 4, 5, 99, 9801] },
      { input: '1,1,1,4,99,5,6,0,99\n', output: [30, 1, 1, 4, 2, 5, 6, 0, 99] },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output.join(', ')}`, () => {
        solver = new ProgramAlarmSolver(input);
        const result = solver.runProgram();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part one', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,9,19,23,2,23,10,27,1,27,5,31,1,31,6,35,1,6,35,39,2,39,13,43,1,9,43,47,2,9,47,51,1,51,6,55,2,55,10,59,1,59,5,63,2,10,63,67,2,9,67,71,1,71,5,75,2,10,75,79,1,79,6,83,2,10,83,87,1,5,87,91,2,9,91,95,1,95,5,99,1,99,2,103,1,103,13,0,99,2,14,0,0\n',
        output: 3931283,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new ProgramAlarmSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      {
        input:
          '1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,6,19,1,9,19,23,2,23,10,27,1,27,5,31,1,31,6,35,1,6,35,39,2,39,13,43,1,9,43,47,2,9,47,51,1,51,6,55,2,55,10,59,1,59,5,63,2,10,63,67,2,9,67,71,1,71,5,75,2,10,75,79,1,79,6,83,2,10,83,87,1,5,87,91,2,9,91,95,1,95,5,99,1,99,2,103,1,103,13,0,99,2,14,0,0\n',
        output: 6979,
      },
    ];
    describe.each(cases)('with input $input', ({ input, output }: TestCase) => {
      it(`should equal to ${output}`, () => {
        solver = new ProgramAlarmSolver(input);
        const result = solver.solvePartTwo();
        expect(result).toEqual(output);
      });
    });
  });
});
