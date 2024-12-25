import WarehouseWoesSolver from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

const input =
  '########\n' +
  '#..O.O.#\n' +
  '##@.O..#\n' +
  '#...O..#\n' +
  '#.#.O..#\n' +
  '#...O..#\n' +
  '#......#\n' +
  '########\n' +
  '\n' +
  '<^^>>>vv<v>>v<<\n';
const input_2 =
  '##########\n' +
  '#..O..O.O#\n' +
  '#......O.#\n' +
  '#.OO..O.O#\n' +
  '#..O@..O.#\n' +
  '#O#..O...#\n' +
  '#O..O..O.#\n' +
  '#.OO.O.OO#\n' +
  '#....O...#\n' +
  '##########\n' +
  '\n' +
  '<vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^\n' +
  'vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v\n' +
  '><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<\n' +
  '<<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^\n' +
  '^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><\n' +
  '^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^\n' +
  '>^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^\n' +
  '<><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>\n' +
  '^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>\n' +
  'v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^\n\n';

describe('day 15', () => {
  let solver: WarehouseWoesSolver;
  describe('parser', () => {
    it('should parse the input', () => {
      solver = new WarehouseWoesSolver(input);
      expect(solver.input.robot).toEqual({
        x: 2,
        y: 2,
      });
      expect(solver.input.movements).toEqual([
        'left',
        'up',
        'up',
        'right',
        'right',
        'right',
        'down',
        'down',
        'left',
        'down',
        'right',
        'right',
        'down',
        'left',
        'left',
      ]);
      expect(solver.input.warehouse).toEqual([
        ['#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '.', '.', 'O', '.', 'O', '.', '#'],
        ['#', '#', '.', '.', 'O', '.', '.', '#'],
        ['#', '.', '.', '.', 'O', '.', '.', '#'],
        ['#', '.', '#', '.', 'O', '.', '.', '#'],
        ['#', '.', '.', '.', 'O', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '#', '#', '#', '#', '#', '#', '#'],
      ]);
    });
  });
  describe('part one', () => {
    describe('example 1', () => {
      it(`should equal to 2,028`, () => {
        solver = new WarehouseWoesSolver(input);
        const result = solver.solvePartOne();
        expect(result).toEqual(2_028);
      });
    });
    describe('example 2', () => {
      it(`should equal to 10,092`, () => {
        solver = new WarehouseWoesSolver(input_2);
        const result = solver.solvePartOne();
        expect(result).toEqual(10_092);
      });
    });
  });
  describe('part two', () => {
    describe('example 2', () => {
      it(`should equal to 9021`, () => {
        solver = new WarehouseWoesSolver(input_2);
        const result = solver.solvePartTwo();
        expect(result).toEqual(9021);
      });
    });
  });
});
