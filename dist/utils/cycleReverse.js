"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cycleReverse = void 0;
const TruthyPredicate_1 = require("./TruthyPredicate");
const prevIndex_1 = require("./prevIndex");
const cycleReverse = (rows, current, predicate = TruthyPredicate_1.truthyPredicate) => {
  const prev = (0, prevIndex_1.prevIndex)(
    rows,
    rows.findIndex(v => v === current),
    predicate
  );
  return rows[prev];
};
exports.cycleReverse = cycleReverse;
//# sourceMappingURL=cycleReverse.js.map
