export function highToLowCompareFunction() {
  return (a: number, b: number) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
  };
}
export function lowToHighNumber(n1: number, n2: number) {
  return n1 - n2;
}
