import { solverFactory } from './solver';
import TheTreacheryOfWhalesSolver from './2021/day-07/solver';

describe('solverFactory', () => {
  it('should create a solver', () => {
    const solver = solverFactory(TheTreacheryOfWhalesSolver, '1,1,2');
    expect(solver.solvePartOne()).toEqual(1);
  });
});
