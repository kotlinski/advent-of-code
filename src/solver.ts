/**
 * Abstract class for solving puzzel
 *
 * first and second assignment of the day
 */
export default abstract class Solver {
  protected input: number[];
  protected constructor(raw_input: string) {
    this.input = this.parse(raw_input);
  }
  protected abstract parse(raw_input: string): number[];
  public abstract solvePartOne(): number;
  public abstract solvePartTwo(): number;
}

export function solverFactory(constructor: new (input: string) => Solver, input: string): Solver {
  return new constructor(input);
}
