import { ArrayFilterPredicate } from "../types/ArrayFilterPredicate";
import { truthyPredicate } from "./TruthyPredicate";

export const nextIndex = <T>(rows: T[], current: number, predicate: ArrayFilterPredicate<T> = truthyPredicate) => {
  console.log('Find next after ', current);
  for (let i = Math.max(current + 1, 0); i < rows.length * 2; i++) {
    if (predicate(rows[i % rows.length]!)) {
      console.log('  > Next: ', i % rows.length);
      return i % rows.length;
    }
  }
  return current;
}
