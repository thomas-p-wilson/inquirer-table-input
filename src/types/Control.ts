import { Controller } from "./Controller";
import { TableColumn } from "./TableColumn";

export type Control = {
  onKeypress?: (key: any, column: TableColumn, controller: Controller) => void
  render?: () => string
  instructions?: string
}
