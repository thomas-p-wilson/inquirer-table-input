import { ArrayFilterPredicate } from "../types/ArrayFilterPredicate";
import { truthyPredicate } from "./TruthyPredicate";
import { prevIndex } from "./prevIndex";

export const cycleReverse = <T>(rows: T[], current: T, predicate: ArrayFilterPredicate<T> = truthyPredicate) => {
  const prev = prevIndex(rows, rows.findIndex((v) => (v === current)), predicate);
  return rows[prev];
}
