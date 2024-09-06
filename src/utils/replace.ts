export const replace = <T>(arr: T[], x: number, y: number, val: string): T[] => {
  const tmp = [...arr];
  (tmp as any)[y]![x]! = val;
  return tmp;
}
  