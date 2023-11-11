import Dir from './dir';

type LineType = 'cd' | 'ls' | 'dir' | 'file';

export function parseLineType(line: string, index?: number): LineType {
  if (line.match(/^\$ cd /)) return 'cd';
  if (line.match(/^\$ ls/)) return 'ls';
  if (line.match(/^dir/)) return 'dir';
  if (line.match(/^\d+ /)) return 'file';
  throw new Error(`can not parse: "${line}", at index ${index ?? 'x'}`);
}

export function parseLinesToFileSystem(lines: string[]) {
  let current_dir: Dir = new Dir('/', undefined);
  lines.forEach((line, index: number) => {
    switch (parseLineType(line, index)) {
      case 'cd':
        {
          const dir_name = line.replace('$ cd ', '');
          if (dir_name === '..') {
            current_dir = current_dir.parent!;
          } else if (dir_name === '/') {
            current_dir = findRootDir(current_dir);
          } else {
            current_dir = current_dir.getSubDir(dir_name);
          }
        }
        break;
      case 'ls':
      case 'dir':
        // do nothing
        break;
      case 'file':
        {
          const file_size = line.match(/^\d+/)!;
          current_dir.addFileSize(+file_size);
        }
        break;
    }
  });
  return findRootDir(current_dir);
}

function findRootDir(current_dir: Dir): Dir {
  while (current_dir.parent !== undefined) {
    current_dir = current_dir.parent;
  }
  return current_dir;
}
