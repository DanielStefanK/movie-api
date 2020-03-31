import {Cast} from './cast'
import {Crew} from './crew'

export interface Credits {
  id: number,
  cast: Array<Cast>
  crew: Array<Crew>
}