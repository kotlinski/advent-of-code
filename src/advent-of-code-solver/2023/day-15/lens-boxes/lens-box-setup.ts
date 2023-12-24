import { LensBox } from './lens-box';
import { summarize } from '../../../common/array-operations/reduce';
import { LavaHasher } from '../lava-hasher';

type LensOperation = '-' | '=';

interface BaseLensOperationStep {
  lens_label: string;
  box_number: number;
  operation: LensOperation;
}
export interface LensOperationAdd extends BaseLensOperationStep {
  operation: '=';
  focal_length: number;
}
export interface LensOperationRemove extends BaseLensOperationStep {
  operation: '-';
}

export class LensBoxSetup {
  private readonly lens_operations: (LensOperationAdd | LensOperationRemove)[];
  private readonly boxes: Map<number, LensBox> = new Map<number, LensBox>();

  // rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7
  constructor(hasher: LavaHasher, steps: string[]) {
    this.lens_operations = steps.map((step) => {
      const step_parts = step.split(/([-|=])/g);
      return {
        lens_label: step_parts[0],
        operation: step_parts[1] as '-' | '=',
        box_number: hasher.hash(step_parts[0]),
        focal_length: Number(step_parts[2]),
      };
    });
  }
  toString(): string {
    return [...this.boxes.values()].map((lens_box) => lens_box.toString()).join('\n');
  }

  /**
   * returns true if more operations are available.
   */
  performLensOperation(): boolean {
    const operation = this.lens_operations.shift();
    if (!operation) return false;
    switch (operation.operation) {
      case '-':
        this.removeLens(operation);
        break;
      case '=':
        this.addLens(operation);
        break;
    }
    return true;
  }

  private removeLens({ box_number, lens_label }: LensOperationRemove) {
    if (!this.boxes.has(box_number)) return;
    const box = this.boxes.get(box_number)!;
    box.removeLens(lens_label);
    if (box.size() === 0) this.boxes.delete(box_number);
  }

  private addLens({ box_number, lens_label, focal_length }: LensOperationAdd) {
    if (!this.boxes.has(box_number)) {
      this.boxes.set(box_number, new LensBox(box_number));
    }
    const box: LensBox = this.boxes.get(box_number)!;
    box.addLens({ label: lens_label, focal_length });
  }

  public getConfigurationFocusingPower(): number {
    const focusing_powers: number[] = [...this.boxes.values()].map((box) => box.getFocusingPower());
    return focusing_powers.reduce(summarize);
  }
}
