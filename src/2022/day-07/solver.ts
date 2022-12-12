import Solver from '../../solver';
import { removeEmptyLinesPredicate } from '../../array-operations/filter';

import Dir from './filesystem/dir';
import { summarize } from '../../array-operations/reduce';
import { folderSizesVisitor } from './filesystem/visitors';
import { parseLinesToFileSystem } from './filesystem/command-line-parser';
import { highToLowCompareFunction } from '../../array-operations/sort';

export default class NoSpaceLeftOnDevice extends Solver<Dir> {
  constructor(raw_input: string) {
    super(raw_input);
  }

  parse(raw_input: string): Dir {
    const lines = raw_input.split('\n').filter(removeEmptyLinesPredicate);
    return parseLinesToFileSystem(lines);
  }

  solvePartOne(): number {
    const folder_sizes: [string, number][] = [...folderSizesVisitor(this.input)];
    const small_folders = folder_sizes.filter((folder_size: [string, number]) => folder_size[1] <= 100000);
    return small_folders.map((folder_size: [string, number]) => folder_size[1]).reduce(summarize, 0);
  }

  solvePartTwo(): number {
    const total_disk_space = 70_000_000;
    const space_needed = 30_000_000;
    const overdue = space_needed - (total_disk_space - this.input.getDirSize());
    const folder_sizes: [string, number][] = [...folderSizesVisitor(this.input)];
    const large_folders = folder_sizes.filter((folder_size: [string, number]) => folder_size[1] >= overdue);
    const sorted = large_folders.map((folder_size: [string, number]) => folder_size[1]).sort(highToLowCompareFunction());
    return sorted.pop()!;
  }
}
