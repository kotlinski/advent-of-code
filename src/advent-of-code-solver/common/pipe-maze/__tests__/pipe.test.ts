import { getPipeFromCoordinates } from '../pipe.js';
import { describe, it } from 'node:test';
import { expect } from 'expect';

describe('pipe', () => {
  describe('getPipeFromCoordinates', () => {
    it('should figure out |', () => {
      const pipe = getPipeFromCoordinates({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 });
      expect(pipe).toEqual('|');
    });
    it('should figure out L', () => {
      const pipe = getPipeFromCoordinates({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 });
      expect(pipe).toEqual('L');
    });
    it('should figure out J', () => {
      const pipe = getPipeFromCoordinates({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 });
      expect(pipe).toEqual('J');
    });
    it('should figure out F', () => {
      const pipe = getPipeFromCoordinates({ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 1, y: 0 });
      expect(pipe).toEqual('F');
    });
    it('should figure out 7', () => {
      const pipe = getPipeFromCoordinates({ x: 1, y: 1 }, { x: 1, y: 0 }, { x: 0, y: 0 });
      expect(pipe).toEqual('7');
    });
    it('should figure out 7 (reversed)', () => {
      const pipe = getPipeFromCoordinates({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 });
      expect(pipe).toEqual('7');
    });
  });
});
