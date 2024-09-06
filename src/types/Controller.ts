import { Control } from "./Control"

export type Controller = {
  rows: any[][]
  setRows: (rows: any[][]) => void
  x: number
  y: number
  setPosition: (pos: [number, number]) => void
  control: Control | undefined
  setControl: (control: Control) => void
  settings: any
  setSettings: (settings: any) => void
}
