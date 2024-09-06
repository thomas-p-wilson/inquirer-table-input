import { ArrayFilterPredicate } from '../types/ArrayFilterPredicate';
import { truthyPredicate } from '../utils/TruthyPredicate';
import { nextIndex } from './nextIndex';

/**
 * Cycle through an array of
 * @param rows
 * @param current
 * @param fn
 * @returns
 */
export const cycle = <T>(rows: T[], current: string, predicate: ArrayFilterPredicate<T> = truthyPredicate) => {
  const next = nextIndex(rows, rows.findIndex((v) => (v === current)), predicate);
  return rows[next]!;
}

