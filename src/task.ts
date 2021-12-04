export enum TaskType {
  FIRST = 'first',
  SECOND = 'second',
}

/**
 * Abstract class for solving puzzel
 *
 * first and second assignment of the day
 */
export default abstract class Task {
  public abstract parse(): number[];
  public abstract first(input: number[]): number;
  public abstract second(input: number[]): number;
}

export function taskFactory(constructor: new (input: string) => Task, input: string): Task {
  return new constructor(input);
}
