import { TableColumnOption } from "./TableColumnOption";
export type TableColumn = {
    title: string;
    options?: TableColumnOption[] | string[];
    visible?: boolean;
};
