import { initiateNewSolver } from './scripts/initiate-new-solver/initiate-new-solver-script.js';
import { parseInput } from './scripts/input-validator.js';
import { solveProblem } from './scripts/run-solver/solve-problem-script.js';

export async function main() {
  const { script, task_type, year, day } = parseInput(process.argv);
  switch (script) {
    case 'solve':
      console.log('Will solve problem');
      await solveProblem({ year, day, task_type });
      break;
    case 'init-solver':
      console.log('will initiate new solver');
      await initiateNewSolver({ year, day });
      break;
    default:
      throw new Error('unknown script');
  }
  process.exit(0);
}
