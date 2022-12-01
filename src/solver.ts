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

  public abstract solvePartOne(optional_params?: { iterations: number }): number;

  public abstract solvePartTwo(): number;

  protected abstract parse(raw_input: string): T;
}

export function solverFactory(constructor: new (input: string) => Solver<any>, input: string): Solver<any> {
  return new constructor(input);
}
