export type Scenario = ScenarioText | ScenarioExcercise;

interface ScenarioText {
  type: 'TEXT';
  title: string;
  description: string;
  bloc?: string;
}

interface ScenarioExcercise {
  type: 'EXERCISE';
  length: number;
  middleDivergence: number;
  question: string;
}

export const makeScenario = (): Scenario[] => [
  {
    type: 'TEXT',
    title: "Phase d'entrainement",
    description:
      "Le but du test est d'indiquer quel côté de la ligne qui vous sera présentée est la plus courte \
      ou la plus longue selon la consigne. Vous devez répondre à la question à l'aide des flèches du clavier.",
  },
  {
    type: 'TEXT',
    title: '',
    description:
      "Avant que chaque ligne apparaisse une croix vous sera présentée au centre de l'écran. Nous vous demandons \
      de fixer cette croix en attendant l'apparation de la droite. La question posée ne variera pas pour chaque essai \
      mais par groupe",
  },
  {
    type: 'TEXT',
    title: '',
    description: "Nous allons commencer par vous demander d'estimer:",
    bloc: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'EXERCISE',
    length: 918,
    middleDivergence: 100,
    question: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'EXERCISE',
    length: 918,
    middleDivergence: 80,
    question: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'EXERCISE',
    length: 918,
    middleDivergence: -80,
    question: 'Quel côté de la droite est le plus long ?',
  },
  {
    type: 'TEXT',
    title: '',
    description:
      "Nous allons désormais faire le même exercice mais vous devrez indiquer quel côté de la droite est le plus court. \
      Toujours avec les fleches du clavier. Une croix apparaîtra encore sur l'écran avant l'apparition de la droite \
      qu'il faudra fixer",
  },
  {
    type: 'TEXT',
    title: '',
    description: "Nous allons donc vous demander cette fois-ci d'estimer:",
    bloc: 'Quel côté de la droite est le plus court ?',
  },
  {
    type: 'EXERCISE',
    length: 92,
    middleDivergence: -15,
    question: 'Quel côté de la droite est le plus court ?',
  },
  {
    type: 'EXERCISE',
    length: 92,
    middleDivergence: 20,
    question: 'Quel côté de la droite est le plus court ?',
  },
  {
    type: 'EXERCISE',
    length: 92,
    middleDivergence: -15,
    question: 'Quel côté de la droite est le plus court ?',
  },
  {
    type: 'TEXT',
    title: "Fin de l'entrainement",
    description:
      "L'essai est terminé et le test va débuter. N'hésitez pas à poser des questions si besoin avant de débuter",
  },
];
