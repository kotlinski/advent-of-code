export function verifyInput(day: number): void {
  if (Number.isNaN(day) || day < 1 || day > 25) {
    console.error(`You have to choose a day between 1 and 25, ${day} is out of range`);
    console.error('For example: yarn day 1');
    process.exit(1);
  }
}
export function verifyScriptName(script: string): 'solve' | 'init-solver' {
  if (script.includes('initiate-new-solver/index.ts')) {
    return 'init-solver';
  }
  if (script.includes('run-solver/index.ts')) {
    return 'solve';
  }
  console.error(`Script name ${script} not valid`);
  process.exit(1);
}

export enum TaskType {
  PART_ONE = 'first',
  PART_TWO = 'second',
}

export function parseTaskType(input: string): TaskType {
  return input.slice(-1) === '+' ? TaskType.PART_TWO : TaskType.PART_ONE;
}

export function parseInput(
  input_1: string,
  input_2: string,
  input_3: string,
): { year: number; day: number; task_type: TaskType; script: 'solve' | 'init-solver' } {
  const year = parseInt(input_2, 10);
  const day = parseInt(input_3, 10);
  verifyInput(day);
  return {
    script: verifyScriptName(input_1),
    year,
    day,
    task_type: parseTaskType(input_3),
  };
}
