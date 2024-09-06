"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prevIndex = void 0;
const TruthyPredicate_1 = require("./TruthyPredicate");
const prevIndex = (rows, current, predicate = TruthyPredicate_1.truthyPredicate) => {
  for (let i = Math.min(current, rows.length - 1) - 1 + rows.length; i > 0; i--) {
    if (predicate(rows[i % rows.length])) {
      return i % rows.length;
    }
  }
  return current;
};
exports.prevIndex = prevIndex;
//# sourceMappingURL=prevIndex.js.map
