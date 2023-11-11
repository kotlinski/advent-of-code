import TheTreacheryOfWhalesSolver from './advent-of-code-solver/2021/day-07/solver';
import { solverFactory } from './advent-of-code-solver/solver';

describe('solverFactory', () => {
  it('should create a solver', () => {
    const solver = solverFactory(TheTreacheryOfWhalesSolver, '1,1,2');
    expect(solver.solvePartOne()).toEqual(1);
  });
});
