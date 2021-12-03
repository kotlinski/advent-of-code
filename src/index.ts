import { parseInput } from './helpers/input-validator';
import { fetchInputData } from './helpers/adventofcode-client';
import { taskFactory, TaskType } from './task';

async function createTaskSolver(day: number) {
  const input = await fetchInputData(day);
  const file = `./2021/day-${day.toString().padStart(2, '0')}.ts`;
  const { default: day_xx } = await import(file);
  return taskFactory(day_xx, input);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  const { task_type, day } = parseInput(process.argv[2]);
  const task = await createTaskSolver(day);
  let answer: number;
  switch (task_type) {
    case TaskType.FIRST:
      answer = task.first();
      break;
    case TaskType.SECOND:
      answer = task.second();
  }
  console.log(`The answer is ${answer}`);
})();
