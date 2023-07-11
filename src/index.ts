import { fetchTaskInputData } from './helpers/adventofcode-client';
import { parseInput, TaskType } from './helpers/input-validator';
import Solver, { solverFactory } from './solver';

export async function xmasFactory(year: number, day: number): Promise<Solver<any>> {
  const input = await fetchTaskInputData(year, day);
  const file = `./${year}/day-${day.toString().padStart(2, '0')}/solver.ts`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { default: solver } = await import(file);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return solverFactory(solver, input);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  const { task_type, year, day } = parseInput(process.argv[2], process.argv[3]);
  const solver = await xmasFactory(year, day);
  let answer: number | string;
  switch (task_type) {
    case TaskType.PART_ONE:
      answer = solver.solvePartOne();
      break;
    case TaskType.PART_TWO:
      answer = solver.solvePartTwo();
  }
  console.log(`The answer is ${answer}`);
})();
