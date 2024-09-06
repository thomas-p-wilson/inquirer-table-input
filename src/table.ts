import {
  createPrompt,
  useState,
  useKeypress,
  useMemo,
  isUpKey,
  isDownKey,
  isEnterKey,
} from '@inquirer/core';
import ansiEscapes from 'ansi-escapes';
import Table from 'cli-table';
import chalk from 'chalk'
import { TableConfig } from './types/TableConfig';
import { TableColumn } from './types/TableColumn';
import { nextIndex } from './utils/nextIndex';
import { prevIndex } from './utils/prevIndex';
import { swap } from './utils/swap';
import { getControl } from './controls';
import { Controller } from './types/Controller';

const isEditable = (col: TableColumn) => (
  !!col?.options
)

export default createPrompt(
  <Value,>(config: TableConfig<Value>, done: (value: Array<Value>) => void) => {
    const {
      message,
      columns,
      hotkeys = [],
      visible = () => true,
    } = config;
    const [rows, setRows] = useState<any[][]>(config.rows);
    const [[x, y], setPosition] = useState<[number, number]>([nextIndex(columns, -1, isEditable), nextIndex(rows, -1)]);
    const [control, setControl] = useState<any>(getControl(columns[x]!));
    const [settings, setSettings] = useState<any>({});

    const controller: Controller = useMemo(() => ({
      rows,
      setRows,
      x,
      y,
      setPosition,
      control,
      setControl,
      settings,
      setSettings,
    }), [rows, setRows, x, y, setPosition, control, setControl]);

    useKeypress(async (key) => {
      hotkeys.forEach(({ listener }) => (listener(key, controller)));

      if (isUpKey(key)) {
        setPosition([x, prevIndex(rows, y, (row) => (visible(row, controller)))]);
      }
      if (isDownKey(key)) {
        setPosition([x, nextIndex(rows, y, (row) => (visible(row, controller)))]);
      }
      if (key.name === 'left') {
        setPosition([prevIndex(columns, x, isEditable), y]);
      }
      if (key.name === 'right') {
        setPosition([nextIndex(columns, x, isEditable), y]);
      }
      if (key.ctrl && key.name === 'w') {
        const _prev = prevIndex(rows, y);
        setRows(swap(rows, y, _prev));
        setPosition([x, _prev]);
      }
      if (key.ctrl && key.name === 's') {
        const _next = nextIndex(rows, y);
        setRows(swap(rows, y, _next));
        setPosition([x, _next]);
      }
      if (isEnterKey(key)) {
        done(rows as any);
      }
      if (control && control.onKeypress) {
        control.onKeypress(key, columns[x], controller);
      }
    });

    // Table
    const table = new Table({
      head: columns.map(({ title }) => (title)),
    });
    const data = rows
      .map((row, r) => {
        if (!visible(row, controller) && r !== y) {
          return;
        }

        return columns.map((_def, c) => {
          if (r === y && c === x) {
            return `[${row[c] ?? ''}]`;
          }
          return row[c] ?? '';
        });
      })
      .filter((r) => (!!r));
    table.push(...data);

    let str = [
      `${chalk.green('? ')}${chalk.bold(message)}`,
      'Navigate with arrows',
      'Order with CTRL+W, CTRL+S',
      ...(control.instructions ? [control.instructions] : []),
      ...(hotkeys.map(({ instructions }) => (typeof instructions === 'function' ? instructions(controller) : instructions))),
      'ENTER to continue',
      table.toString(),
    ].join('\n');
    return `${ansiEscapes.cursorSavePosition}${ansiEscapes.eraseDown}${str}${ansiEscapes.cursorRestorePosition}${ansiEscapes.cursorHide}`;
  },
);

export { Separator } from '@inquirer/core';
