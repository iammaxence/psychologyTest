import { Sound } from './Sound';

export type MiddlePosition = 'RIGHT' | 'LEFT' | 'MIDDLE';
export type UserResponse = 'RIGHT' | 'LEFT';

export interface UserStatistics {
  lengthStimuli: number;
  middlePosition: MiddlePosition;
  response: UserResponse;
  sound?: Sound;
}
