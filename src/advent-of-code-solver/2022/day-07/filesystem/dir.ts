import { summarize } from '../../../common-operations/array-operations/reduce';

export default class Dir {
  private readonly sub_dirs: Map<string, Dir> = new Map<string, Dir>();
  private dir_file_size = 0;
  constructor(public readonly dir_name: string, public readonly parent: Dir | undefined) {}

  public toString(): string {
    let output = this.dir_name;
    let dir: Dir | undefined = this.parent;
    while (dir?.parent !== undefined) {
      output = `${dir.dir_name}/${output}`;
      dir = dir.parent;
    }
    return output;
  }

  addFileSize(file_size: number) {
    this.dir_file_size += file_size;
  }
  addSubDir(sub_dir: Dir) {
    this.sub_dirs.set(sub_dir.dir_name, sub_dir);
  }
  getSubDir(dir_name: string): Dir {
    if (this.sub_dirs.has(dir_name)) {
      return this.sub_dirs.get(dir_name)!;
    }
    this.addSubDir(new Dir(dir_name, this));
    return this.sub_dirs.get(dir_name)!;
  }

  getSubDirs(): Dir[] {
    return [...this.sub_dirs.values()];
  }

  getDirSize(): number {
    const dirs = this.getSubDirs();
    const sub_dir_sizes = dirs.map((dir: Dir) => dir.getDirSize()).reduce(summarize, 0);
    return this.dir_file_size + sub_dir_sizes;
  }
}
