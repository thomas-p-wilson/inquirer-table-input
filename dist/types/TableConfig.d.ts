import { Controller } from './Controller';
import { TableColumn } from './TableColumn';
export type Hotkey = {
    listener: (key: any, controller: Controller) => void;
    instructions: string | ((controller: Controller) => string);
};
export type TableConfig<_Value> = {
    message: string;
    columns: TableColumn[];
    rows: any[][];
    hotkeys?: Hotkey[];
    visible?: (row: any, controller: Controller) => boolean;
};
