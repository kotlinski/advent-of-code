export type Direction = 'L' | 'R';
export type KeyState = { direction_offset: number; key: string };

export class GhostCoordinate {
  public key: string;
  public right: string;
  public left: string;
  constructor(line: string) {
    this.key = line.split(' = (')[0];
    this.left = line.split(' = (')[1].split(', ')[0];
    this.right = line.split(' = (')[1].split(', ')[1].split(')')[0];
  }
}
export class GhostMap {
  private readonly connected_coordinates = new Map<string, GhostCoordinate>();
  constructor(
    private readonly instructions: Direction[],
    coordinates: GhostCoordinate[],
  ) {
    for (const coordinate of coordinates) {
      this.connected_coordinates.set(coordinate.key, coordinate);
    }
  }
  private recursiveTraversing(key_state: KeyState, kill_switch: number, end_key: RegExp): string[] {
    if (key_state.key.match(end_key) ?? key_state.direction_offset >= kill_switch) {
      return [key_state.key];
    }
    const next_key_state = this.performOneStep(key_state);
    return [key_state.key, ...this.recursiveTraversing(next_key_state, kill_switch, end_key)];
  }

  public performOneStep(key_state: KeyState): KeyState {
    const next_direction = this.instructions[key_state.direction_offset % this.instructions.length];
    const current_coordinate = this.connected_coordinates.get(key_state.key)!;
    return {
      key: next_direction === 'L' ? current_coordinate.left : current_coordinate.right,
      direction_offset: key_state.direction_offset + 1,
    };
  }

  public findPathFromStartToEnd(start_key_state: KeyState, end_key: RegExp): string[] {
    const path = [start_key_state.key];
    const chunk_size = 4_000;
    for (let steps = start_key_state.direction_offset; ; steps += chunk_size) {
      const most_recent_step = path.pop()!;
      if (most_recent_step.match(end_key)) {
        return [...path, most_recent_step];
      }
      const next_key_state: KeyState = { key: most_recent_step, direction_offset: steps };
      path.push(...this.recursiveTraversing(next_key_state, steps + chunk_size, end_key));
    }
  }

  findStartKeys(): string[] {
    return [...this.connected_coordinates.keys()].filter((key) => key[2] === 'A');
  }
}
