import { TableColumn } from './types/TableColumn';
import { Controller } from './types/Controller';
declare const _default: <Value>(config: {
    message: string;
    columns: TableColumn[];
    rows: any[][];
    hotkeys?: import("./types/TableConfig").Hotkey[] | undefined;
    visible?: ((row: any, controller: Controller) => boolean) | undefined;
}, context?: import("@inquirer/type").Context) => import("@inquirer/type").CancelablePromise<Value[]>;
export default _default;
export { Separator } from '@inquirer/core';
