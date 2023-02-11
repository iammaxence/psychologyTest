import { ScenarioHybrid } from 'renderer/data/Scenario';

import {
  bigStimuliDivergenceLeft,
  bigStimuliDivergenceRight,
  bigStimuliLength,
  smallStimuliDivergenceLeft,
  smallStimuliDivergenceRight,
  smallStimuliLength,
} from './LengthData';

const bloc1: ScenarioHybrid[] = [
  {
    type: 'STIMULI',
    length: bigStimuliLength,
    middleDivergence: bigStimuliDivergenceLeft,
    sound: {
      name: 'dog',
      orientation: 'LEFT',
    },
    question: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'STIMULI',
    length: smallStimuliLength,
    middleDivergence: smallStimuliDivergenceLeft,
    sound: {
      name: 'dog',
      orientation: 'LEFT',
    },
    question: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'STIMULI',
    length: smallStimuliLength,
    middleDivergence: smallStimuliDivergenceRight,
    sound: {
      name: 'dog',
      orientation: 'LEFT',
    },
    question: 'Quel côté de la droite est le plus long ?',
  },
];
const bloc2: ScenarioHybrid[] = [
  {
    type: 'STIMULI',
    length: bigStimuliLength,
    middleDivergence: bigStimuliDivergenceRight,
    sound: {
      name: 'dog',
      orientation: 'RIGHT',
    },
    question: 'Quel côté de la droite est le plus court ?',
  },
  {
    type: 'STIMULI',
    length: bigStimuliLength,
    middleDivergence: smallStimuliDivergenceLeft,
    question: 'Quel côté de la droite est le plus court ?',
  },
  {
    type: 'STIMULI',
    length: smallStimuliLength,
    middleDivergence: smallStimuliDivergenceLeft,
    sound: {
      name: 'dog',
      orientation: 'RIGHT',
    },
    question: 'Quel côté de la droite est le plus court ?',
  },
  {
    type: 'STIMULI',
    length: smallStimuliLength,
    middleDivergence: smallStimuliDivergenceLeft,
    question: 'Quel côté de la droite est le plus court ?',
  },
];

const bloc3: ScenarioHybrid[] = [
  {
    type: 'STIMULI',
    length: bigStimuliLength,
    middleDivergence: bigStimuliDivergenceRight,
    sound: {
      name: 'dog',
      orientation: 'LEFT',
    },
    question: 'Quel côté de la droite est le plus court ?',
  },
];

export const makeBlocListA = (): ScenarioHybrid[][] => [bloc1, bloc2, bloc3];
export const makeBlocListB = (): ScenarioHybrid[][] => [bloc3, bloc1, bloc2];
