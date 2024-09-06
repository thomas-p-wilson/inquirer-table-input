"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cycle = void 0;
const TruthyPredicate_1 = require("../utils/TruthyPredicate");
const nextIndex_1 = require("./nextIndex");
const cycle = (rows, current, predicate = TruthyPredicate_1.truthyPredicate) => {
  const next = (0, nextIndex_1.nextIndex)(
    rows,
    rows.findIndex(v => v === current),
    predicate
  );
  return rows[next];
};
exports.cycle = cycle;
//# sourceMappingURL=cycle.js.map
