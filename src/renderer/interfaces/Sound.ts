import { Orientation } from './Orientation';

export type SoundName = 'dog' | 'dog2' | 'pur' | 'pur2';

export interface Sound {
  name: SoundName;
  orientation: Orientation;
}
