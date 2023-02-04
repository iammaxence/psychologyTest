import { ScenarioExcercise } from 'renderer/data/Scenario';

const bloc1: ScenarioExcercise[] = [
  {
    type: 'EXERCISE',
    length: 918,
    middleDivergence: 100,
    question: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'EXERCISE',
    length: 300,
    middleDivergence: -100,
    question: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'EXERCISE',
    length: 100,
    middleDivergence: 10,
    question: 'Quel côté de la droite est le plus long ?',
  },
];
const bloc2: ScenarioExcercise[] = [
  {
    type: 'EXERCISE',
    length: 918,
    middleDivergence: -150,
    question: 'Quel côté de la droite est le plus court ?',
  },
  {
    type: 'EXERCISE',
    length: 100,
    middleDivergence: -10,
    question: 'Quel côté de la droite est le plus court ?',
  },
];

const bloc3: ScenarioExcercise[] = [
  {
    type: 'EXERCISE',
    length: 320,
    middleDivergence: -50,
    question: 'Quel côté de la droite est le plus court ?',
  },
];

export const makeBlocList = (): ScenarioExcercise[][] => [bloc1, bloc2, bloc3];
