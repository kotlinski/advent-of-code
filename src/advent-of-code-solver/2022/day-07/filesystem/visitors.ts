import Dir from './dir';

export function folderSizesVisitor(dir: Dir): Map<string, number> {
  let dir_sizes = new Map<string, number>();
  dir_sizes.set(dir.toString(), dir.getDirSize());
  dir.getSubDirs().forEach((sub_dir) => (dir_sizes = new Map([...dir_sizes.entries(), ...folderSizesVisitor(sub_dir)])));
  return dir_sizes;
}
export function printerVisitor(dir: Dir, tabs: string): string {
  let output = `${tabs}- ${dir.dir_name} (dir) (${dir.getDirSize()})\n`;
  dir.getSubDirs().forEach((sub_dir) => (output += printerVisitor(sub_dir, `${tabs}  `)));
  return output;
}
