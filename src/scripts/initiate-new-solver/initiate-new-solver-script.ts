import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { parseSolverName, pascalName } from './html-parser.js';
import { getHtmlTaskDescription } from '../api-client/advent-of-code-client.js';
const dirname = import.meta.dirname;

export async function initiateNewSolver({ year, day }: { year: number; day: number }) {
  const html = await getHtmlTaskDescription(year, day);
  const raw_solver_name = parseSolverName(html);
  const solver_name = pascalName(raw_solver_name);

  const root_readme_path = path.resolve(`./README.md`);
  const root_readme = readFileSync(root_readme_path).toString();
  const regex = new RegExp(`advent-of-code-solver/${year}\\) \\| (\\d*) \\|`, 'g');
  const replace_number = String(day * 2).padEnd(2, ' ');
  const updated_root_readme = root_readme.replace(regex, (match, group) => {
    return match.replace(`${group}`, replace_number);
  });
  writeFileSync(root_readme_path, updated_root_readme);

  const year_path = path.resolve(`./src/advent-of-code-solver/${year}`);
  const year_readme_path = `${year_path}/README.md`;
  if (!existsSync(year_readme_path)) {
    const readme_path = path.resolve(`${dirname}/year-template/README`);
    const readme_template = readFileSync(readme_path).toString();
    writeFileSync(year_readme_path, readme_template.replaceAll('YEAR', year.toString()));
  }
  let readme = readFileSync(year_readme_path).toString();
  const padded_day = String(day).padStart(2, '0');
  const day_table_row = `| [Day ${day}](https://github.com/kotlinski/advent-of-code/tree/main/src/advent-of-code-solver/${year}/day-${padded_day}) |   🌟   |   🌟   |\n`;
  if (!readme.includes(day_table_row)) {
    readme += day_table_row;
  }
  writeFileSync(year_readme_path, readme);

  const day_path = path.resolve(`${year_path}/day-${padded_day}`);
  if (!existsSync(`${day_path}/__tests__`)) {
    mkdirSync(`${day_path}/__tests__`, { recursive: true });
  }
  if (!existsSync(`${day_path}/solver.ts`)) {
    const solver_path = path.resolve(`${dirname}/day-template/solver`);
    const solver_template = readFileSync(solver_path).toString();
    writeFileSync(`${day_path}/solver.ts`, solver_template.replaceAll('Template', solver_name));
  }
  if (!existsSync(`${day_path}/__tests__/solver.test.ts`)) {
    const solver_test_path = path.resolve(`${dirname}/day-template/solver.test`);
    const solver_test_template = readFileSync(solver_test_path).toString();
    writeFileSync(
      `${day_path}/__tests__/solver.test.ts`,
      solver_test_template.replaceAll('Template', solver_name).replace('day X', `day ${day}`),
    );
  }
  writeFileSync(`${day_path}/README.md`, `${raw_solver_name}\n\nhttps://adventofcode.com/${year}/day/${day}`);
}
