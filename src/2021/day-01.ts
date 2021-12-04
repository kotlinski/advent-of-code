import Task from '../task';

export default class Day01 implements Task {
  constructor(private readonly input: string) {}
  parse(): number[] {
    return this.input.split('\n').map((number) => parseInt(number, 10));
  }
  first(input: number[]): number {
    let prev = Number.MAX_VALUE;
    return input.filter((value:number) => (prev < (prev = value))).length
  }
  second(_input: number[]): number {
    return 2;
  }
}
