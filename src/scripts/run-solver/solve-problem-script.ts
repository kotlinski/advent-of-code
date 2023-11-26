import path from 'path';
import Solver, { solverFactory } from '../../advent-of-code-solver/solver';
import { getTaskInputData } from '../api-client/advent-of-code-client';
import { TaskType } from '../input-validator';

export async function xmasFactory(year: number, day: number): Promise<Solver<any>> {
  const input = await getTaskInputData(year, day);
  const day_path = path.resolve(`./src/advent-of-code-solver/${year}/day-${String(day).padStart(2, '0')}/solver.ts`);

  type SolverConstructor = new (data_input: any) => Solver<any>;
  type SolverFileImport = { default: SolverConstructor };
  const { default: constructor } = (await import(day_path)) as SolverFileImport;
  return solverFactory(constructor, input);
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
