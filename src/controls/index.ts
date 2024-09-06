import { TableColumn } from "../types/TableColumn";
import { tabbableSelection } from "./TabbableSelect";

export const getControl = (column: TableColumn) => {
  if (column.options) {
    return tabbableSelection;
  }
  return undefined;
}
