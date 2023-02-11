import { bigStimuliLength, smallStimuliLength } from 'renderer/data/LengthData';
import { Orientation } from 'renderer/interfaces/Orientation';
import { SoundName } from 'renderer/interfaces/Sound';
import {
  MiddlePosition,
  UserResponse,
} from 'renderer/interfaces/UserStatistics';

function translateSoundNameStats(soundName?: SoundName): string {
  if (soundName === 'dog') {
    return 'Chien';
  }
  if (soundName === 'pur') {
    return 'Pur';
  }
  return 'Aucun';
}

function translateSoundOrientationStats(orientation?: Orientation): string {
  if (orientation === 'RIGHT') {
    return 'D';
  }
  if (orientation === 'LEFT') {
    return 'G';
  }
  return 'X';
}

function translatePositionStimuliStats(position: MiddlePosition): string {
  switch (position) {
    case 'MIDDLE':
      return 'Milieu';
    case 'RIGHT':
      return 'D';
    default:
      return 'G';
  }
}

function translateResponseStats(response: UserResponse): string {
  if (response === 'RIGHT') {
    return 'D';
  }
  return 'G';
}

function transalteLengthStimuliStats(length: number): string {
  if (length === bigStimuliLength) {
    return 'Grand';
  }
  if (length === smallStimuliLength) {
    return 'Petit';
  }
  return 'X';
}

export {
  translateSoundNameStats,
  translateSoundOrientationStats,
  translatePositionStimuliStats,
  translateResponseStats,
  transalteLengthStimuliStats,
};
