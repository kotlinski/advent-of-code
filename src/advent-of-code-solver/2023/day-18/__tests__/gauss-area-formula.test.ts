import { Coordinate } from '../../../common/matrix/interface.js';
import { findArea } from '../gauss-area-formula.js';
import { beforeEach, describe, it } from 'node:test';
import { expect } from 'expect';

describe('findArea', () => {
  let coordinates: Coordinate[];
  describe('a four corner polygon starting at x:0, y:0', () => {
    beforeEach(() => {
      coordinates = [
        { x: 0, y: 0 },
        { x: 0, y: 3 },
        { x: 7, y: 3 },
        { x: 7, y: 0 },
      ];
    });
    it('should return 21', () => {
      expect(findArea(coordinates)).toEqual(21);
    });
  });
  describe('an offset four corner polygon', () => {
    beforeEach(() => {
      coordinates = [
        { x: 1, y: 0 },
        { x: 7, y: 0 },
        { x: 7, y: 3 },
        { x: 1, y: 3 },
      ];
    });
    it('should return 18', () => {
      expect(findArea(coordinates)).toEqual(18);
    });
  });
  describe('a five corner polygon', () => {
    beforeEach(() => {
      coordinates = [
        { x: 2, y: 7 },
        { x: 10, y: 1 },
        { x: 8, y: 6 },
        { x: 11, y: 7 },
        { x: 7, y: 10 },
      ];
    });
    it('should return 32', () => {
      expect(findArea(coordinates)).toEqual(32);
    });
  });
});
