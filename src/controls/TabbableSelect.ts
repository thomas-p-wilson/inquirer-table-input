import { Control } from '../types/Control';
import { Controller } from '../types/Controller';
import { TableColumn } from '../types/TableColumn';
import { cycle } from '../utils/cycle';
import { cycleReverse } from '../utils/cycleReverse';
import { replace } from '../utils/replace';

export const tabbableSelection: Control = {
  onKeypress: (key: any, { options }: TableColumn, { rows, setRows, x, y }: Controller) => {
    const { shift } = key;
    if (key.name === 'tab' || key.name === 'space') {
      if (options) {
        const fn = shift ? cycleReverse : cycle;
        const nextOption = fn(options!.map((o) => (!o || typeof o === 'string' ? o : o.value)), rows[y]![x])!;
        const updatedRows = replace(rows, x, y, nextOption);
        setRows(updatedRows);
      }
    }
  },
  render: () => {
    return '';
  },
  instructions: 'TAB or SPACE to cycle through options',
}
