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
  second(input: number[]): number {
    const values = input.map((value:number, index:number, numbers: number[])=>value + numbers[index+1] + numbers[index+2])
    return this.first(values)
  }
}
