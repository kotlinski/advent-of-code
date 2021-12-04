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
    console.log(`input: ${JSON.stringify(input, null, 2)}`);
    const values = input.map((value:number, index:number, numbers: number[])=>{
      for (let i = index+1; i < numbers.length && i<index+3; i++) {
        value += numbers[i]
      }
      return value;
    })
    return this.first(values)
  }
}
