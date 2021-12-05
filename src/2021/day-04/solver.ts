import Solver from '../../solver';

class Tile {
  check = false;
  public number: number;
  constructor(number: number) {
    this.number = number;
  }
}

class BingoBoard {
  protected board: Tile[][] = [];
  hasWon(): boolean {
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
    const numbers = raw_input
      .split('\n')[0]
      .split(',')
      .map((number) => parseInt(number, 10));
    let bingo_board: BingoBoard = new BingoBoard();
    const bingo_boards: BingoBoard[] = [];

    raw_input
      .split('\n')
      .slice(1)
      .filter((row) => row.length > 0)
      .forEach((row) => {
        const parsed_row = row
          .split(' ')
          .filter((num) => num.length > 0)
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
    const winners: BingoBoard[] = [];
    let winning_score = -1;

    for (const number of bingo_game.numbers) {
      for (const bingo_board of bingo_game.bingo_boards) {
        bingo_board.checkNumber(number);
        if (bingo_board.hasWon()) {
          winners.push(bingo_board);
        }
      }
      if (winners.length > 0) {
        winning_score = winners[0].calculateScore(number);
        break;
      }
    }
    return winning_score;
  }

  solvePartTwo(): number {
    return 4711;
  }
}
