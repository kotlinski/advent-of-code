import { Graph } from './graph.js';
import { Node } from './node.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';
import Solver from '../../solver.js';

export default class PassagePathingSolver extends Solver<Graph> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Graph {
    const paths = raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
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
