import { CaveType } from './graph.js';

export class Node {
  readonly key: string;
  public readonly neighbours: Node[] = [];
  public readonly type: CaveType;

  constructor(key: string) {
    this.key = key;
    if (key === 'start') {
      this.type = CaveType.START;
    } else if (key === 'end') {
      this.type = CaveType.END;
    } else {
      this.type = key === key.valueOf().toUpperCase() ? CaveType.LARGE : CaveType.SMALL;
    }
  }

  public toString = (): string => `${this.key}`;
}
