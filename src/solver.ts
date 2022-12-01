/**
 * Abstract class for solving puzzel
 *
 * first and second assignment of the day
 */
export default abstract class Solver<T> {
  protected input: T;

  protected constructor(raw_input: string) {
    this.input = this.parse(raw_input);
  }

  protected abstract parse(raw_input: string): T;

  public abstract solvePartOne(optional_param?: { input?: T; iterations?: number }): number;

  public abstract solvePartTwo(): number;
}

export function solverFactory(constructor: new (input: string) => Solver<any>, in_data: string): Solver<any> {
  return new constructor(in_data);
}
