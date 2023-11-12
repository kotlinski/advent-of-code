import Solver, { solverFactory } from '../../advent-of-code-solver/solver';
import { fetchTaskInputData } from '../../api-client/advent-of-code-client';
import { TaskType } from '../input-validator';

export async function xmasFactory(year: number, day: number): Promise<Solver<any>> {
  const input = await fetchTaskInputData(year, day);
  const file = `./${year}/day-${day.toString().padStart(2, '0')}/solver.ts`;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { default: solver } = await import(file);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return solverFactory(solver, input);
}

export async function solveProblem({ year, day, task_type }: { year: number; day: number; task_type: TaskType }) {
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
}
