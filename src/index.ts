import { parseInput, TaskType } from './helpers/input-validator';
import Solver, { solverFactory } from './solver';
import { fetchTaskInputData } from './helpers/adventofcode-client';

export async function xmasFactory(day: number): Promise<Solver> {
  const input = await fetchTaskInputData(day);
  const file = `./2021/day-${day.toString().padStart(2, '0')}/solver.ts`;
  const { default: solver } = await import(file);
  return solverFactory(solver, input);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  const { task_type, day } = parseInput(process.argv[2]);
  const solver = await xmasFactory(day);
  let answer: number;
  switch (task_type) {
    case TaskType.PART_ONE:
      answer = solver.solvePartOne();
      break;
    case TaskType.PART_TWO:
      answer = solver.solvePartTwo();
  }
  console.log(`The answer is ${answer}`);
})();
