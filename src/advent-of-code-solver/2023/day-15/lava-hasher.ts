export class LavaHasher {
  hash(input: string): number {
    const ascii_values = input.split('').map((char) => char.charCodeAt(0));
    return ascii_values.reduce((current_value: number, ascii_value) => {
      current_value += ascii_value;
      return (current_value * 17) % 256;
    }, 0);
  }
}
