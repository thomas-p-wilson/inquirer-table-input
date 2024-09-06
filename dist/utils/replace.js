"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replace = void 0;
const replace = (arr, x, y, val) => {
  const tmp = [...arr];
  tmp[y][x] = val;
  return tmp;
};
exports.replace = replace;
//# sourceMappingURL=replace.js.map
