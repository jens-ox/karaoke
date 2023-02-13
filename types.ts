export enum LineType {
  REGULAR = ':',
  GOLDEN = '*',
  FREESTYLE = 'F',
  BREAK = '-'
}

export type Line = {
  id: number
  type: LineType
  beat: number
  duration: number
  pitch: number
  text: string
}
