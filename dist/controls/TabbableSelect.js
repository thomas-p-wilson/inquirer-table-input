"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabbableSelection = void 0;
const cycle_1 = require("../utils/cycle");
const cycleReverse_1 = require("../utils/cycleReverse");
const replace_1 = require("../utils/replace");
exports.tabbableSelection = {
  onKeypress: (key, { options }, { rows, setRows, x, y }) => {
    const { shift } = key;
    if (key.name === "tab" || key.name === "space") {
      if (options) {
        const fn = shift ? cycleReverse_1.cycleReverse : cycle_1.cycle;
        const nextOption = fn(
          options.map(o => (!o || typeof o === "string" ? o : o.value)),
          rows[y][x]
        );
        const updatedRows = (0, replace_1.replace)(rows, x, y, nextOption);
        setRows(updatedRows);
      }
    }
  },
  render: () => {
    return "";
  },
  instructions: "TAB or SPACE to cycle through options"
};
//# sourceMappingURL=TabbableSelect.js.map
