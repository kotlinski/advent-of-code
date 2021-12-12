import Solver from '../../solver';
import { Graph } from './graph';
import { Node } from './node';

export default class PassagePathingSolver extends Solver<Graph> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Graph {
    const paths = raw_input
      .split('\n')
      .filter((line: string) => line.length > 0)
      .map((path) => path.split('-').map((key) => new Node(key)));
    return new Graph(paths);
  }

  solvePartOne(): number {
    this.input.number_of_small_caves_allowed_to_be_visited_twice = 0;
    const paths = this.input.generatePaths([this.input.nodes.get('start')!]);
    return paths.length;
  }

  solvePartTwo(): number {
    this.input.number_of_small_caves_allowed_to_be_visited_twice = 1;
    const paths = this.input.generatePaths([this.input.nodes.get('start')!]);
    return paths.length;
  }
}
