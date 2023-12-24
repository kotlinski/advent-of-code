import { summarize } from '../../../common/array-operations/reduce';

interface Lens {
  label: string;
  focal_length: number; // 1-9
}
export class LensBox {
  private readonly panels: Lens[];
  constructor(private readonly box_number: number) {
    this.panels = [];
  }
  size(): number {
    return this.panels.length;
  }

  toString(): string {
    const panels = this.panels.map((lens) => `[${lens.label} ${lens.focal_length}]`);
    return `Box ${this.box_number}: ${panels.join(' ')}`;
  }
  addLens({ focal_length, label }: Lens) {
    const index = this.panels.findIndex((lens) => lens.label === label);
    if (index !== -1) {
      this.panels.splice(index, 1, { label, focal_length });
    } else {
      this.panels.push({ label, focal_length });
    }
  }

  removeLens(lens_label: string) {
    const index = this.panels.findIndex((lens) => lens.label === lens_label);
    if (index === -1) return;
    this.panels.splice(index, 1);
  }

  getFocusingPower() {
    const lens_focus_power = this.panels.map(
      (lens: Lens, index: number) => (this.box_number + 1) * (index + 1) * lens.focal_length,
    );
    return lens_focus_power.reduce(summarize);
  }
}
