import { Grid, parseStringToMatrix } from '../../../../common/matrix/grid/grid';
import { CrucibleStepsProvider } from '../crucible-steps-provider';
import { Dijkstra } from '../dijkstra';
import { PathStore, PathSum } from '../path-store';
import { VisitorTracker } from '../visitor-tracker';

describe('Dijkstra', () => {
  let dijkstra: Dijkstra;
  let city_map: Grid<number>;
  describe('with a small city', () => {
    beforeAll(() => {
      city_map = new Grid<number>([
        //  1  2  3  4  5
        [1, 9, 1, 1, 1, 5], // 0
        [1, 8, 1, 9, 1, 6], // 1
        [1, 1, 1, 9, 2, 2], // 2
      ]);
      const path_store = new PathStore(new VisitorTracker());
      const steps_provider = new CrucibleStepsProvider(1, 3, city_map);
      dijkstra = new Dijkstra(steps_provider, path_store, { x: 0, y: 0 }, { x: 5, y: 2 });
    });
    describe('step', () => {
      it('should pick the most promising stored path', () => {
        let result: PathSum | undefined;
        while (result === undefined) {
          result = dijkstra.step();
        }
        expect(result.sum).toEqual(13);
      });
    });
  });
  describe('with a test city', () => {
    beforeAll(() => {
      const input = parseStringToMatrix(
        '2413432311323\n' +
          '3215453535623\n' +
          '3255245654254\n' +
          '3446585845452\n' +
          '4546657867536\n' +
          '1438598798454\n' +
          '4457876987766\n' +
          '3637877979653\n' +
          '4654967986887\n' +
          '4564679986453\n' +
          '1224686865563\n' +
          '2546548887735\n' +
          '4322674655533\n',
        (str) => Number(str),
      );
      city_map = new Grid<number>(input);
      const path_store = new PathStore(new VisitorTracker());
      const steps_provider = new CrucibleStepsProvider(1, 3, city_map);
      dijkstra = new Dijkstra(steps_provider, path_store, { x: 0, y: 0 }, { x: 12, y: 12 });
    });
    describe('step', () => {
      it('should pick the most promising stored path', () => {
        let result: PathSum | undefined;
        while (result === undefined) {
          result = dijkstra.step();
        }
        expect(result.sum).toEqual(102);
      });
    });
  });
});
