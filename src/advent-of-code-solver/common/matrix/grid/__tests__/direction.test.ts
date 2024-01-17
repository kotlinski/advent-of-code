import { getDirection } from '../direction';

describe('getDirection', () => {
  it('right', () => {
    const direction = getDirection({ x: 0, y: 0 }, { x: 1, y: 0 });
    expect(direction).toEqual('right');
  });
  it('left', () => {
    const direction = getDirection({ x: 1, y: 0 }, { x: 0, y: 0 });
    expect(direction).toEqual('left');
  });
  it('up', () => {
    const direction = getDirection({ x: 0, y: 1 }, { x: 0, y: 0 });
    expect(direction).toEqual('up');
  });
  it('down', () => {
    const direction = getDirection({ x: 0, y: 0 }, { x: 0, y: 1 });
    expect(direction).toEqual('down');
  });
});
