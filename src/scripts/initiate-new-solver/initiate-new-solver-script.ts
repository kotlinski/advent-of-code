import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { parseSolverName, pascalName } from './html-parser';
import { getHtmlTaskDescription } from '../api-client/advent-of-code-client';

export async function initiateNewSolver({ year, day }: { year: number; day: number }) {
  const html = await getHtmlTaskDescription(year, day);
  const raw_solver_name = parseSolverName(html);
  const solver_name = pascalName(raw_solver_name);

  const day_path = path.resolve(`./src/advent-of-code-solver/${year}/day-${String(day).padStart(2, '0')}`);
  if (!existsSync(`${day_path}/__tests__`)) {
    mkdirSync(`${day_path}/__tests__`, { recursive: true });
  }

  if (!existsSync(`${day_path}/solver.ts`)) {
    const solver_path = path.resolve(`${__dirname}/day-template/solver`);
    const solver_template = readFileSync(solver_path).toString();
    writeFileSync(`${day_path}/solver.ts`, solver_template.replaceAll('Template', solver_name));
  }
  if (!existsSync(`${day_path}/__tests__/solver.test.ts`)) {
    const solver_test_path = path.resolve(`${__dirname}/day-template/solver.test`);
    const solver_test_template = readFileSync(solver_test_path).toString();
    writeFileSync(
      `${day_path}/__tests__/solver.test.ts`,
      solver_test_template.replaceAll('Template', solver_name).replace('day X', `day ${day}`),
    );
  }
  writeFileSync(`${day_path}/README.md`, `${raw_solver_name}\n\nhttps://adventofcode.com/${year}/day/${day}`);
}
