import { ScenarioHybrid, ScenarioStimuli } from 'renderer/data/Scenario';
import dogbark from '../../../assets/sound/dog.mp3';

const bloc1: ScenarioHybrid[] = [
  {
    type: 'STIMULI',
    length: 918,
    middleDivergence: 100,
    sound: dogbark,
    soundOrientation: 'LEFT',
    question: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'STIMULI',
    length: 300,
    middleDivergence: -100,
    sound: dogbark,
    soundOrientation: 'LEFT',
    question: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'STIMULI',
    length: 100,
    middleDivergence: 10,
    sound: dogbark,
    soundOrientation: 'LEFT',
    question: 'Quel côté de la droite est le plus long ?',
  },
];
const bloc2: ScenarioHybrid[] = [
  {
    type: 'STIMULI',
    length: 918,
    middleDivergence: -150,
    sound: dogbark,
    soundOrientation: 'RIGHT',
    question: 'Quel côté de la droite est le plus court ?',
  },
  {
    type: 'STIMULI',
    length: 100,
    middleDivergence: -10,
    sound: dogbark,
    soundOrientation: 'RIGHT',
    question: 'Quel côté de la droite est le plus court ?',
  },
];

const bloc3: ScenarioHybrid[] = [
  {
    type: 'STIMULI',
    length: 320,
    middleDivergence: -50,
    sound: dogbark,
    soundOrientation: 'LEFT',
    question: 'Quel côté de la droite est le plus court ?',
  },
];

export const makeBlocListA = (): ScenarioHybrid[][] => [bloc1, bloc2, bloc3];
export const makeBlocListB = (): ScenarioHybrid[][] => [bloc3, bloc1, bloc2];
