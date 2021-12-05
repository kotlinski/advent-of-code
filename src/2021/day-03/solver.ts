import Solver from '../../solver';

function countBitsPerIndex(input: number[][]): number[] {
  const binary_count: number[] = [];
  for (let i = 0; i < input[0].length; i++) {
    binary_count[i] = 0;
    for (const item of input) {
      binary_count[i] += item[i];
    }
  }
  return binary_count;
}

function mostCommonBitAccumulator(total: number) {
  return (count: number) => (count * 2 >= total ? 1 : 0);
}
function leastCommonBitAccumulator(total: number) {
  return (count: number) => (count * 2 < total ? 1 : 0);
}

function binaryArrayToDecimal(binary_array: number[]): number {
  return parseInt(binary_array.join(''), 2);
}

type RateAggregator = (any: number[][]) => number[];

export default class BinaryDiagnosticSolver extends Solver<number[]> {
  constructor(raw_input: string) {
    super(raw_input);
  }
  parse(raw_input: string): number[][] {
    return raw_input
      .split('\n')
      .map((binary) => binary.split('').map((decimal) => parseInt(decimal, 10)))
      .filter((binary_array) => binary_array.length > 0);
  }

  solvePartOne(): number {
    const diagnostic_report = this.input;
    const binary_gama_rate = BinaryDiagnosticSolver.calculateGamaRate(diagnostic_report);
    const binary_epsilon_rate = BinaryDiagnosticSolver.calculateEpsilonRate(diagnostic_report);
    return binaryArrayToDecimal(binary_gama_rate) * binaryArrayToDecimal(binary_epsilon_rate);
  }

  solvePartTwo(): number {
    const diagnostic_report = this.input;
    const oxygen_generator_rating = this.binaryFilter(diagnostic_report, BinaryDiagnosticSolver.calculateGamaRate);
    const co2_scrubber_rating = this.binaryFilter(diagnostic_report, BinaryDiagnosticSolver.calculateEpsilonRate);
    return co2_scrubber_rating * oxygen_generator_rating;
  }

  private static calculateGamaRate(diagnostic_report: number[][]) {
    return countBitsPerIndex(diagnostic_report).map(mostCommonBitAccumulator(diagnostic_report.length));
  }
  private static calculateEpsilonRate(diagnostic_report: number[][]) {
    return countBitsPerIndex(diagnostic_report).map(leastCommonBitAccumulator(diagnostic_report.length));
  }

  private binaryFilter(input: number[][], rate_aggregator: RateAggregator): number {
    let prospects = input;
    for (let i = 0; i < input[0].length && prospects.length > 1; i++) {
      const binary_rate = rate_aggregator(prospects);
      prospects = prospects.filter((binary_number) => binary_number[i] === binary_rate[i]);
    }
    return binaryArrayToDecimal(prospects[0]);
  }
}
