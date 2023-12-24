import { LensBox } from '../lens-box';

describe('LensBox', () => {
  let lens_box: LensBox;
  beforeAll(() => {
    lens_box = new LensBox(1);
  });
  describe('add and remove', () => {
    it('should add and remove a lens', () => {
      lens_box.addLens({ focal_length: 3, label: 'qp' });
      expect(lens_box.toString()).toEqual('Box 1: [qp 3]');
      lens_box.removeLens('qp');
      expect(lens_box.toString()).toEqual('Box 1: ');
    });
  });
  describe('adding same label twice', () => {
    it('should replace the first lens', () => {
      lens_box.addLens({ focal_length: 3, label: 'qp' });
      expect(lens_box.toString()).toEqual('Box 1: [qp 3]');
      lens_box.addLens({ focal_length: 7, label: 'qp' });
      expect(lens_box.toString()).toEqual('Box 1: [qp 7]');
    });
  });
  describe('removing something not existing', () => {
    it('should not crash', () => {
      lens_box.removeLens('qp');
      expect(lens_box.toString()).toEqual('Box 1: ');
    });
  });
  describe('getFocusingPower', () => {
    it('should multiply 2 (box 1) * 1 (first slot) * 7 (focal length)', () => {
      lens_box.addLens({ focal_length: 7, label: 'qp' });
      expect(lens_box.getFocusingPower()).toEqual(14);
    });
  });
});
