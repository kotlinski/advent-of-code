import Solver from '../../solver';
import { removeEmptyLinesPredicate } from '../../array-operations/filter';
import { stringToNumber } from '../../array-operations/map';

class Tile {
  check = false;
  public number: number;
  constructor(number: number) {
    this.number = number;
  }
}

class BingoBoard {
  protected board: Tile[][] = [];
  score: number | undefined;
  hasWon(): boolean {
    if (this.score) return true;
    const hasWinningRow = (row: Tile[]) => row.filter((tile) => tile.check).length === 5;
    // winning column
    for (let i = 0; i < 5; i++) {
      const column = [];
      for (const row of this.board) {
        column.push(row[i]);
      }
      if (column.filter((tile) => tile.check).length === 5) return true;
    }

    return this.board.some(hasWinningRow);
  }

  checkNumber(number: number): void {
    for (const row of this.board) {
      for (const tile of row) {
        if (number === tile.number) {
          tile.check = true;
        }
      }
    }
    if (!this.score && this.hasWon()) this.score = this.calculateScore(number);
    return;
  }

  addRow(parsed_row: Tile[]) {
    this.board.push(parsed_row);
  }

  isComplete(): boolean {
    return this.board.length === 5;
  }

  calculateScore(winning_number: number) {
    let sum = 0;
    for (const row of this.board) {
      for (const tile of row) {
        if (!tile.check) {
          sum += tile.number;
        }
      }
    }
    return winning_number * sum;
  }
}

export interface BingoGame {
  numbers: number[];
  bingo_boards: BingoBoard[];
}

export default class GiantSquidSolver extends Solver<BingoGame> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): BingoGame {
    const numbers = raw_input.split('\n')[0].split(',').map(stringToNumber);
    let bingo_board: BingoBoard = new BingoBoard();
    const bingo_boards: BingoBoard[] = [];

    raw_input
      .split('\n')
      .slice(1)
      .filter(removeEmptyLinesPredicate)
      .forEach((row) => {
        const parsed_row = row
          .split(' ')
          .filter(removeEmptyLinesPredicate)
          .map((number) => new Tile(parseInt(number, 10)));
        bingo_board.addRow(parsed_row);
        if (bingo_board.isComplete()) {
          bingo_boards.push(bingo_board);
          bingo_board = new BingoBoard();
        }
      });
    return {
      numbers,
      bingo_boards,
    };
  }

  solvePartOne(): number {
    const bingo_game = this.input;
    return GiantSquidSolver.getWinners(bingo_game)[0].score!;
  }

  solvePartTwo(): number {
    const bingo_game = this.input;
    const last_winner = GiantSquidSolver.getWinners(bingo_game).pop();
    return last_winner!.score!;
  }

  private static getWinners(bingo_game: BingoGame): BingoBoard[] {
    const winners: BingoBoard[] = [];
    for (const number of bingo_game.numbers) {
      for (const bingo_board of bingo_game.bingo_boards) {
        if (!winners.includes(bingo_board)) {
          bingo_board.checkNumber(number);
          if (bingo_board.hasWon()) {
            winners.push(bingo_board);
          }
        }
      }
    }
    return winners;
  }
}
