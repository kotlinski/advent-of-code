import Solver from '../../solver';
import SyntaxScoringSolver from './solver';

describe('day X', () => {
  let day: Solver<string[][]>;
  beforeEach(() => {
    const raw_input =
      '[({(<(())[]>[[{[]{<()<>>\n' +
      '[(()[<>])]({[<{<<[]>>(\n' +
      '{([(<{}[<>[]}>{[]{[(<()>\n' +
      '(((({<>}<{<{<>}{[]{[]{}\n' +
      '[[<[([]))<([[{}[[()]]]\n' +
      '[{[{({}]{}}([{[{{{}}([]\n' +
      '{<[[]]>}<{[{[{[]{()[[[]\n' +
      '[<(<(<(<{}))><([]([]()\n' +
      '<{([([[(<>()){}]>(<<{{\n' +
      '<{([{{}}[<[[[<>{}]]]>[]]\n';
    day = new SyntaxScoringSolver(raw_input);
  });
  describe('part one', () => {
    it('should have a total syntax error score of 26397', () => {
      expect(day.solvePartOne()).toEqual(26397);
    });
  });
  describe('part two', () => {
    it('should be 4711', () => {
      expect(day.solvePartTwo()).toEqual(4711);
    });
  });
});
