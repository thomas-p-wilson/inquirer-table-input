import { ArrayFilterPredicate } from "../types/ArrayFilterPredicate";
import { truthyPredicate } from "./TruthyPredicate";

export const prevIndex = <T>(rows: T[], current: number, predicate: ArrayFilterPredicate<T> = truthyPredicate) => {
  for (let i = Math.min(current, rows.length - 1) - 1 + rows.length; i > 0; i--) {
    if (predicate(rows[i % rows.length]!)) {
      return i % rows.length;
    }
  }
  return current;
}
