import Task from '../task';

export default class Day01 implements Task {
  constructor(private readonly input: string) {}
  parse(): number[] {
    return this.input.split('\n').map((number) => parseInt(number, 10));
  }
  first(): number {
    return 1000;
  }
  second(): number {
    return 2;
  }
}
