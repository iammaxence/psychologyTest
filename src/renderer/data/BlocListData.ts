import bloc1 from './Bloc1';
import bloc2 from './Bloc2';
import { ScenarioHybrid } from './Scenario';

export const makeBlocListA = (): ScenarioHybrid[][] => [
  bloc1(true),
  bloc2(),
  bloc1(),
  bloc2(true),
];
export const makeBlocListB = (): ScenarioHybrid[][] => [
  bloc2(),
  bloc1(true),
  bloc2(true),
  bloc1(),
];
