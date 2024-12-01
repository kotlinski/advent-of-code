import { LavaHasher } from '../../lava-hasher.js';
import { LensBoxSetup } from '../lens-box-setup.js';
import { before, describe, it } from 'node:test';
import { expect } from 'expect';

describe('LensBox', () => {
  let lens_box_setup: LensBoxSetup;
  before(() => {
    const steps = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'.split(',');
    lens_box_setup = new LensBoxSetup(new LavaHasher(), steps);
  });
  describe('performLensOperation', () => {
    const expected_output: string[] = [
      'Box 0: [rn 1]',
      'Box 0: [rn 1]',
      'Box 0: [rn 1]\n' + 'Box 1: [qp 3]',
      'Box 0: [rn 1] [cm 2]\n' + 'Box 1: [qp 3]',
      'Box 0: [rn 1] [cm 2]',
      'Box 0: [rn 1] [cm 2]\n' + 'Box 3: [pc 4]',
      'Box 0: [rn 1] [cm 2]\n' + 'Box 3: [pc 4] [ot 9]',
      'Box 0: [rn 1] [cm 2]\n' + 'Box 3: [pc 4] [ot 9] [ab 5]',
      'Box 0: [rn 1] [cm 2]\n' + 'Box 3: [ot 9] [ab 5]',
      'Box 0: [rn 1] [cm 2]\n' + 'Box 3: [ot 9] [ab 5] [pc 6]',
      'Box 0: [rn 1] [cm 2]\n' + 'Box 3: [ot 7] [ab 5] [pc 6]',
    ];
    it('each step should have the expected output', () => {
      let index = 0;
      while (lens_box_setup.performLensOperation()) {
        expect(lens_box_setup.toString()).toEqual(expected_output[index++]);
      }
    });
  });
  describe('getConfigurationFocusingPower', () => {
    it('each step should have the expected output', () => {
      while (lens_box_setup.performLensOperation()) {
        // do all steps
      }
      expect(lens_box_setup.getConfigurationFocusingPower()).toEqual(145);
    });
  });
});
