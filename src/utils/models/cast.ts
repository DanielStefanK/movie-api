import {Credit} from './credit'

export interface Cast extends Credit {
  cast_id: number,
  character: string,
  order: number
}