import { all_directions } from '../../../../common/matrix/grid/direction.js';
import { Grid } from '../../../../common/matrix/grid/grid.js';
import { CrucibleStepsProvider } from '../crucible-steps-provider.js';
import { before, describe, it } from 'node:test';
import { expect } from 'expect';

describe('CrucibleStepsProvider', () => {
  let crucible_steps_provider: CrucibleStepsProvider;
  const city_map: Grid<number> = new Grid<number>([
    //  1  2  3  4  5
    [1, 9, 1, 1, 1, 5], // 0
    [1, 8, 1, 9, 1, 6], // 1
    [1, 1, 1, 9, 2, 2], // 2
  ]);
  before(() => {
    crucible_steps_provider = new CrucibleStepsProvider(1, 3, city_map);
  });
  describe('createChildPaths', () => {
    describe('initial path with no steps', () => {
      it(`should return new paths down and right`, () => {
        const paths = crucible_steps_provider.createChildPaths({ coordinate: { x: 0, y: 0 }, sum: 0 }, all_directions);
        expect(paths.length).toEqual(5);
        // down 1 step
        expect(paths[0]).toEqual({
          coordinate: {
            x: 0,
            y: 1,
          },
          direction: 'down',
          sum: 1,
        });
        // down 2 steps
        expect(paths[1]).toEqual({
          coordinate: {
            x: 0,
            y: 2,
          },
          direction: 'down',
          sum: 2,
        });
        // right 1 step
        expect(paths[2]).toEqual({
          coordinate: {
            x: 1,
            y: 0,
          },
          direction: 'right',
          sum: 9,
        });
        // right 2 steps
        expect(paths[3]).toEqual({
          coordinate: {
            x: 2,
            y: 0,
          },
          direction: 'right',
          sum: 10,
        });
        // right 3 steps
        expect(paths[4]).toEqual({
          coordinate: {
            x: 3,
            y: 0,
          },
          direction: 'right',
          sum: 11,
        });
      });
    });
    describe('from a path with one step right', () => {
      it(`should return two paths heading "down"`, () => {
        const paths = crucible_steps_provider.createChildPaths({ coordinate: { x: 1, y: 0 }, sum: 9 }, ['down']);
        expect(paths.length).toEqual(2);
        // down 1 step
        expect(paths[0]).toEqual({
          coordinate: {
            x: 1,
            y: 1,
          },
          direction: 'down',
          sum: 17,
        });
        // down 2 steps
        expect(paths[1]).toEqual({
          coordinate: {
            x: 1,
            y: 2,
          },
          direction: 'down',
          sum: 18,
        });
      });
    });
  });
});
