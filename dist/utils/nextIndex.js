"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextIndex = void 0;
const TruthyPredicate_1 = require("./TruthyPredicate");
const nextIndex = (rows, current, predicate = TruthyPredicate_1.truthyPredicate) => {
  console.log("Find next after ", current);
  for (let i = Math.max(current + 1, 0); i < rows.length * 2; i++) {
    if (predicate(rows[i % rows.length])) {
      console.log("  > Next: ", i % rows.length);
      return i % rows.length;
    }
  }
  return current;
};
exports.nextIndex = nextIndex;
//# sourceMappingURL=nextIndex.js.map
