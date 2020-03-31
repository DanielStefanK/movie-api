import {Credit} from './credit'

export interface Crew extends Credit {
  department: string,
  job: string
}