export function stringToNumber(string_number: string): number {
  return parseInt(string_number, 10);
}

export function splitStringOnChar(char: string): (a: string) => string[] {
  return (a: string) => a.split(char);
}

export function fillInterval(interval: number[]): number[] {
  const start = interval[0];
  const end = interval[1];
  const full_interval: number[] = [];
  for (let i = start; i <= end; i++) {
    full_interval.push(i);
  }
  return full_interval;
}
