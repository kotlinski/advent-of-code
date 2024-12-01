export function verifyInput(year: number, day: number): void {
  if (Number.isNaN(year) || year < 2015) {
    console.error(`The year input must be a number 2015+, year was ${year}`);
    console.error('For example: yarn solve 2024 1');
    process.exit(1);
  }
  if (Number.isNaN(day) || day < 1 || day > 25) {
    console.error(`You have to choose a day between 1 and 25, ${day} is out of range`);
    console.error(`For example: yarn solve ${year} 1`);
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

export function parseInput([_node_path, script_path, year_input, day_input]: string[]): {
  year: number;
  day: number;
  task_type: TaskType;
  script: 'solve' | 'init-solver';
} {
  const year = parseInt(year_input, 10);
  const day = parseInt(day_input, 10);
  verifyInput(year, day);
  return {
    script: verifyScriptName(script_path),
    year,
    day,
    task_type: parseTaskType(day_input),
  };
}
