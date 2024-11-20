import { PathStore, PathSum } from '../path-store.js';
import { VisitorTracker } from '../visitor-tracker.js';
import { before, describe, it } from 'node:test';
import { expect } from 'expect';

describe('PathStore', () => {
  let path_store: PathStore;
  before(() => {
    const visitor_tracker = new VisitorTracker();
    path_store = new PathStore(visitor_tracker);
  });
  describe('consumeNextCandidate', () => {
    it('should pick the most promising stored path', () => {
      const good_path: PathSum = {
        coordinate: {
          x: 0,
          y: 1,
        },
        direction: 'down',
        sum: 1,
      };
      const bad_path: PathSum = {
        coordinate: {
          x: 1,
          y: 0,
        },
        direction: 'right',
        sum: 9,
      };
      path_store.storeCandidates([good_path, bad_path]);
      const path = path_store.consumeNextCandidate();
      expect(path).toEqual(good_path);
    });
  });
});
