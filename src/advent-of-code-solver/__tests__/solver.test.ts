import TheTreacheryOfWhalesSolver from '../2021/day-07/solver.js';
import { solverFactory } from '../solver.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('solverFactory', () => {
  it('should create a solver', () => {
    const solver = solverFactory(TheTreacheryOfWhalesSolver, '1,1,2');
    expect(solver.solvePartOne()).toEqual(1);
  });
});
