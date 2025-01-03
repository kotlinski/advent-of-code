/**
 * Abstract class for solving puzzle
 *
 * first and second assignment of the day
 */
export default abstract class Solver<T> {
  public input: T;

  protected constructor(raw_input: string) {
    this.input = this.parse(raw_input);
  }

  protected abstract parse(raw_input: string): T;

  public abstract solvePartOne(optional_param?: Record<string, string | number | T>): number | string;

  public abstract solvePartTwo(): number | string;
}

export function solverFactory(constructor: new (input: string) => Solver<any>, in_data: string): Solver<any> {
  return new constructor(in_data);
}
