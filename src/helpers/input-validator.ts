export function verifyInput(day: number): void {
  if (Number.isNaN(day) || day < 1 || day > 25) {
    console.error('You have to choose a day between 1 and 25');
    console.error('For example: yarn day 1');
    process.exit(1);
  }
}

export enum TaskType {
  PART_ONE = 'first',
  PART_TWO = 'second',
}

export function parseTaskType(input: string): TaskType {
  return input.slice(-1) === '+' ? TaskType.PART_TWO : TaskType.PART_ONE;
}

export function parseInput(input: string): { day: number; task_type: TaskType } {
  const day = parseInt(input, 10);
  verifyInput(day);
  return {
    day,
    task_type: parseTaskType(input),
  };
}
