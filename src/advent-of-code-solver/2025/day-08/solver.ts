import Solver from '../../../advent-of-code-solver/solver.js';
import { removeEmptyLinesPredicate } from '../../common/array-operations/filter.js';

type Point3D = [number, number, number];
type ParsedType = Point3D[];

type Line = { a: Point3D; b: Point3D; distance: number };

function generateLines(points: Point3D[]): Line[] {
  const lines: Line[] = [];
  const pts = [...points];
  while (pts.length > 0) {
    const point_a = pts.pop()!;
    lines.push(
      ...pts.map((point_b) => ({
        a: point_a,
        b: point_b,
        distance: Math.sqrt(
          (point_a[0] - point_b[0]) ** 2 +
          (point_a[1] - point_b[1]) ** 2 +
          (point_a[2] - point_b[2]) ** 2
        ),
      }))
    );
  }
  return lines;
}

function addLineToClusters(clusters: Set<string>[], line: Line) {
  const idx = clusters.reduce((indexes: number[], lines, index) => {
    if (lines.has(line.a.toString()) || lines.has(line.b.toString())) {
      lines.add(line.a.toString());
      lines.add(line.b.toString());
      indexes.push(index);
    }
    return indexes;
  }, []);

  if (idx.length === 0) {
    clusters.push(new Set([line.a.toString(), line.b.toString()]));
  } else if (idx.length === 1) {
    clusters[idx[0]].add(line.a.toString());
    clusters[idx[0]].add(line.b.toString());
  } else {
    let merge = new Set([line.a.toString(), line.b.toString()]);
    idx.sort((a, b) => b - a);
    idx.forEach((id) => {
      const removed = clusters.splice(id, 1)[0];
      merge = new Set([...merge, ...removed]);
    });
    clusters.push(merge);
  }
}


export default class PlaygroundSolver extends Solver<ParsedType> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): ParsedType {
    return raw_input
      .split('\n')
      .filter(removeEmptyLinesPredicate)
      .map((line) => line.split(',').map(Number)) as ParsedType;
  }

  solvePartOne(input_params?: { input: number }): number {
    const points = this.input;
    const lines = generateLines(points)

    const pick_top = input_params?.input ?? 1000;
    lines.sort(({ distance: a }, { distance: b }) => a - b);
    const shortest_distances = lines.slice(0, pick_top)

    const clusters: Set<string>[] = [];
    while (shortest_distances.length > 0) {
      const line = shortest_distances.shift()!;
      addLineToClusters(clusters, line)
    }
    clusters.sort((a, b) => b.size - a.size);
    const [a, b, c] = clusters;

    return a.size * b.size * c.size;
  }

  solvePartTwo(): number {
    const points = this.input;
    const total_points = points.length;

    const lines = generateLines(points)

    lines.sort(({ distance: a }, { distance: b }) => a - b);

    const clusters: Set<string>[] = [];
    let last_line;
    while (this.calculateClusterSize(clusters) < total_points || clusters.length !== 1) {
      const line = lines.shift()!;
      last_line = line;
      addLineToClusters(clusters, line)
    }
    const { a, b } = last_line!;

    return a[0] * b[0];
  }

  private calculateClusterSize(clusters: Set<string>[]) {
    return clusters.reduce((a, c) => a + c.size, 0);
  }
}
