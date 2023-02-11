import { Orientation } from './Orientation';

export type SoundName = 'dog' | 'pur';

export interface Sound {
  name: SoundName;
  orientation: Orientation;
}
