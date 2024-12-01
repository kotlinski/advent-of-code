import { Node } from './node.js';

export enum CaveType {
  'SMALL',
  'LARGE',
  'START',
  'END',
}

export class Graph {
  public readonly nodes = new Map<string, Node>();
  public number_of_small_caves_allowed_to_be_visited_twice: number;

  constructor(paths: Node[][]) {
    this.number_of_small_caves_allowed_to_be_visited_twice = 0;
    for (const path of paths) {
      this.pushToGraph(path[0]);
      this.pushToGraph(path[1]);
      this.nodes.get(path[0].key)!.neighbours.push(this.nodes.get(path[1].key)!);
      this.nodes.get(path[1].key)!.neighbours.push(this.nodes.get(path[0].key)!);
    }
  }

  protected static readonly countCavesVisitedTwice = (history: Map<string, number>): number =>
    [...history.values()].reduce((count, current) => count + (current === 2 ? 1 : 0), 0);

  public toString = (): string => `Graph (${[...this.nodes.values()].map((node) => node.key).toString()})`;

  generatePaths(path: Node[]): Node[][] {
    const peek = path[path.length - 1];
    if (peek.type === CaveType.END) {
      return [path];
    }
    const routes: Node[][] = [];
    const non_looping_neighbours = peek.neighbours.filter(this.canBeVisitedAgain(path));
    if (non_looping_neighbours.length === 0) return [];
    non_looping_neighbours.forEach((node) => {
      this.generatePaths([...path, node]).forEach((route) => {
        routes.push(route);
      });
    });
    return routes;
  }

  private canBeVisitedAgain(path: Node[]) {
    return (neighbour: Node) => {
      const history = this.getHistory(path);
      const tot_count_caves_visited_twice = Graph.countCavesVisitedTwice(history);
      if ([...history.values()].some((value) => value > 2)) {
        return false;
      }
      if (tot_count_caves_visited_twice > this.number_of_small_caves_allowed_to_be_visited_twice) {
        return false;
      } else if (neighbour.type === CaveType.START) {
        return false;
      }
      return true;
    };
  }

  private getHistory(path: Node[]) {
    return path.reduce((path_count, current) => {
      if (current.type === CaveType.SMALL) {
        if (path_count.has(current.key)) {
          path_count.set(current.key, path_count.get(current.key)! + 1);
        } else {
          path_count.set(current.key, 1);
        }
      }
      return path_count;
    }, new Map<string, number>());
  }

  private pushToGraph(node: Node) {
    if (!this.nodes.has(node.key)) {
      this.nodes.set(node.key, node);
    }
  }
}
