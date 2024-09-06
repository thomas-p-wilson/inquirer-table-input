export const swap = <T>(arr: T[], p1: number, p2: number): T[] => {
  const tmp: T[] = [...arr];
  const _tmp = tmp[p1]!; // Copy an element
  tmp[p1] = tmp[p2]!; // Copy the other element over
  tmp[p2] = _tmp; // Replace the other element
  return tmp;
}