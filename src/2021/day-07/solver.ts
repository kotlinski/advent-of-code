import Solver from '../../solver';

function calculateTotalDistancesTo(positions: number[], goal: number) {
  return positions.reduce((total_distance, crab_position) => total_distance + Math.abs(goal-crab_position), 0)
}

export default class TheTreacheryOfWhalesSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): number[] {
    return raw_input.split(',').map((number) => parseInt(number, 10));
  }

  solvePartOne(): number {
    const crab_positions = this.input
    const min = Math.min(...crab_positions);
    const max = Math.max(...crab_positions);
    const total_distances = Array.from(new Array(max-min+1), (_x, i) => i + min);
    total_distances.forEach((horizontal_pos) =>{
      total_distances[horizontal_pos] = calculateTotalDistancesTo(crab_positions, horizontal_pos)
    })

    return Math.min(...total_distances);
  }

  solvePartTwo(): number {
    return 4711;
  }
}
