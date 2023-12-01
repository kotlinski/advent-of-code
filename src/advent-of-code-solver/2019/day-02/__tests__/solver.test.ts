import ProgramAlarmSolver from '../solver';

describe('day 2', () => {
  let solver: ProgramAlarmSolver;
  describe('part one', () => {
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
        const result = solver.runProgramPart1();
        expect(result).toEqual(output);
      });
    });
  });
  describe('part two', () => {
    type TestCase = { input: string; output: number };
    const cases: TestCase[] = [
      { input: ')\n', output: 4711 },
      { input: '()())\n', output: 4711 },
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
