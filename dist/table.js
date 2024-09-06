"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Separator = void 0;
const core_1 = require("@inquirer/core");
const ansi_escapes_1 = __importDefault(require("ansi-escapes"));
const cli_table_1 = __importDefault(require("cli-table"));
const chalk_1 = __importDefault(require("chalk"));
const nextIndex_1 = require("./utils/nextIndex");
const prevIndex_1 = require("./utils/prevIndex");
const swap_1 = require("./utils/swap");
const controls_1 = require("./controls");
const isEditable = col => !!col?.options;
exports.default = (0, core_1.createPrompt)((config, done) => {
  const { message, columns, hotkeys = [], visible = () => true } = config;
  const [rows, setRows] = (0, core_1.useState)(config.rows);
  const [[x, y], setPosition] = (0, core_1.useState)([
    (0, nextIndex_1.nextIndex)(columns, -1, isEditable),
    (0, nextIndex_1.nextIndex)(rows, -1)
  ]);
  const [control, setControl] = (0, core_1.useState)((0, controls_1.getControl)(columns[x]));
  const [settings, setSettings] = (0, core_1.useState)({});
  const controller = (0, core_1.useMemo)(
    () => ({
      rows,
      setRows,
      x,
      y,
      setPosition,
      control,
      setControl,
      settings,
      setSettings
    }),
    [rows, setRows, x, y, setPosition, control, setControl]
  );
  (0, core_1.useKeypress)(async key => {
    hotkeys.forEach(({ listener }) => listener(key, controller));
    if ((0, core_1.isUpKey)(key)) {
      setPosition([x, (0, prevIndex_1.prevIndex)(rows, y, row => visible(row, controller))]);
    }
    if ((0, core_1.isDownKey)(key)) {
      setPosition([x, (0, nextIndex_1.nextIndex)(rows, y, row => visible(row, controller))]);
    }
    if (key.name === "left") {
      setPosition([(0, prevIndex_1.prevIndex)(columns, x, isEditable), y]);
    }
    if (key.name === "right") {
      setPosition([(0, nextIndex_1.nextIndex)(columns, x, isEditable), y]);
    }
    if (key.ctrl && key.name === "w") {
      const _prev = (0, prevIndex_1.prevIndex)(rows, y);
      setRows((0, swap_1.swap)(rows, y, _prev));
      setPosition([x, _prev]);
    }
    if (key.ctrl && key.name === "s") {
      const _next = (0, nextIndex_1.nextIndex)(rows, y);
      setRows((0, swap_1.swap)(rows, y, _next));
      setPosition([x, _next]);
    }
    if ((0, core_1.isEnterKey)(key)) {
      done(rows);
    }
    if (control && control.onKeypress) {
      control.onKeypress(key, columns[x], controller);
    }
  });
  const table = new cli_table_1.default({
    head: columns.map(({ title }) => title)
  });
  const data = rows
    .map((row, r) => {
      if (!visible(row, controller) && r !== y) {
        return;
      }
      return columns.map((_def, c) => {
        if (r === y && c === x) {
          return `[${row[c] ?? ""}]`;
        }
        return row[c] ?? "";
      });
    })
    .filter(r => !!r);
  table.push(...data);
  let str = [
    `${chalk_1.default.green("? ")}${chalk_1.default.bold(message)}`,
    "Navigate with arrows",
    "Order with CTRL+W, CTRL+S",
    ...(control.instructions ? [control.instructions] : []),
    ...hotkeys.map(({ instructions }) =>
      typeof instructions === "function" ? instructions(controller) : instructions
    ),
    "ENTER to continue",
    table.toString()
  ].join("\n");
  return `${ansi_escapes_1.default.cursorSavePosition}${ansi_escapes_1.default.eraseDown}${str}${ansi_escapes_1.default.cursorRestorePosition}${ansi_escapes_1.default.cursorHide}`;
});
var core_2 = require("@inquirer/core");
Object.defineProperty(exports, "Separator", {
  enumerable: true,
  get: function() {
    return core_2.Separator;
  }
});
//# sourceMappingURL=table.js.map
