"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControl = void 0;
const TabbableSelect_1 = require("./TabbableSelect");
const getControl = column => {
  if (column.options) {
    return TabbableSelect_1.tabbableSelection;
  }
  return undefined;
};
exports.getControl = getControl;
//# sourceMappingURL=index.js.map
