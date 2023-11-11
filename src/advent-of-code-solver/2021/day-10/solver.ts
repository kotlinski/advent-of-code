import { removeEmptyLinesPredicate } from '../../common-operations/array-operations/filter';
import { splitStringOnChar } from '../../common-operations/array-operations/map';
import { summarize } from '../../common-operations/array-operations/reduce';
import Solver from '../../solver';

const isClosingChar = (nav_char: string) => '>)]}'.split('').some((char) => char === nav_char);

function isMatching(char_a: string, char_b: string): boolean {
  if (char_a === ']' && char_b === '[') {
    return true;
  } else if (char_a === '>' && char_b === '<') {
    return true;
  } else if (char_a === '}' && char_b === '{') {
    return true;
  } else if (char_a === ')' && char_b === '(') {
    return true;
  }
  return false;
}

function isCorrupt(line: string[]): boolean {
  return line.some(isClosingChar);
}

function reduceCompleteChunks(line: string[]) {
  for (let i = 0; i < line.length; i++) {
    if (isClosingChar(line[i])) {
      const j = i - 1;
      if (isMatching(line[i], line[j])) {
        line.splice(j, i - j + 1);
        i = -1;
      } else {
        return;
      }
    }
  }
}

function getSyntaxErrorScore(corrupt_line: string[]): number {
  const corrupt_char = corrupt_line.find(isClosingChar);
  switch (corrupt_char) {
    case ')': {
      return 3;
    }
    case ']': {
      return 57;
    }
    case '}': {
      return 1197;
    }
    case '>': {
      return 25137;
    }
  }
  return 0;
}

export default class SyntaxScoringSolver extends Solver<string[][]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): string[][] {
    return raw_input.split('\n').filter(removeEmptyLinesPredicate).map(splitStringOnChar(''));
  }

  solvePartOne(): number {
    const navigation_sub_system_line = this.input;

    navigation_sub_system_line.forEach(reduceCompleteChunks);
    const corrupt_lines = navigation_sub_system_line.filter(isCorrupt);
    const scores = corrupt_lines.map(getSyntaxErrorScore);
    return scores.reduce(summarize, 0);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
