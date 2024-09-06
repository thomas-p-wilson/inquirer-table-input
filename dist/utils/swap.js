"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swap = void 0;
const swap = (arr, p1, p2) => {
  const tmp = [...arr];
  const _tmp = tmp[p1];
  tmp[p1] = tmp[p2];
  tmp[p2] = _tmp;
  return tmp;
};
exports.swap = swap;
//# sourceMappingURL=swap.js.map
