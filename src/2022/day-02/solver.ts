import Solver from '../../solver';
import { removeEmptyLinesPredicate } from '../../array-operations/filter';
import { splitStringOnChar } from '../../array-operations/map';

function summarize(accumulator: number, number: number) {
  return accumulator + number;
}

type Sign = 'Rock' | 'Paper' | 'Scissors';

export default class RockPaperScissors extends Solver<string[][]> {
  private formatRawSignPartOne(value: string): Sign {
    if (value === 'A' || value === 'X') return 'Rock';
    if (value === 'B' || value === 'Y') return 'Paper';
    if (value === 'C' || value === 'Z') return 'Scissors';
    throw Error(`Can't parse ${value}`);
  }

  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[][] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(splitStringOnChar(' '));
  }

  private calculateSignScore(sign: Sign): number {
    switch (sign) {
      case 'Rock':
        return 1;
      case 'Paper':
        return 2;
      case 'Scissors':
        return 3;
    }
  }

  private calculateResultScore(elf: Sign, human: Sign): number {
    if (elf === human) {
      return 3;
    }
    if (this.winsAgainst(human) === elf) {
      return 6;
    } else {
      return 0;
    }
  }

  private winsAgainst(sign: Sign): Sign {
    switch (sign) {
      case 'Rock':
        return 'Scissors';
      case 'Paper':
        return 'Rock';
      case 'Scissors':
        return 'Paper';
    }
  }

  private loosesAgainst(sign: Sign): Sign {
    console.log(`sign: ${JSON.stringify(sign, null, 2)}`);
    switch (sign) {
      case 'Rock':
        return 'Paper';
      case 'Paper':
        return 'Scissors';
      case 'Scissors':
        return 'Rock';
    }
  }

  private formatRawSignPartTwo(): (value: string[]) => Sign[] {
    return (value: string[]): Sign[] => {
      const elf_sign = this.formatRawSignPartOne(value[0]);
      return [elf_sign, this.calculateHumanSign(value[1], elf_sign)];
    };
  }

  private calculateHumanSign(human_action: string, elf_sign: 'Rock' | 'Paper' | 'Scissors'): Sign {
    if (human_action === 'X') return this.winsAgainst(elf_sign);
    if (human_action === 'Y') return elf_sign;
    if (human_action === 'Z') return this.loosesAgainst(elf_sign);
    throw new Error(`invalid move ${human_action}`);
  }

  solvePartOne(): number {
    const rounds = this.input.map((raw_round: string[]) => raw_round.map(this.formatRawSignPartOne));
    return this.calculateScore(rounds);
  }

  solvePartTwo(): number {
    const rounds = this.input.map(this.formatRawSignPartTwo());
    return this.calculateScore(rounds);
  }

  private calculateScore(rounds: Sign[][]) {
    const scores = rounds.map((signs: Sign[]) => {
      const elf = signs[0];
      const human = signs[1];
      return this.calculateSignScore(human) + this.calculateResultScore(elf, human);
    });
    return scores.reduce(summarize);
  }
}
