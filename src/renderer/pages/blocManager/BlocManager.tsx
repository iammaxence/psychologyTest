import { useEffect, useRef, useState } from 'react';
import randomIntFromInterval from 'renderer/feature/random/Random';
import { ScenarioExcercise } from 'renderer/feature/scenario/Scenario';
import Bloc from './Bloc';
import { TestResponse } from 'renderer/feature/lengthTestExercise/testResponse/TestResponse';
import { BlocResponse } from './BlocResponse';

const BlocManager = () => {
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

  const blocList: ScenarioExcercise[][] = [bloc1, bloc2];
  const [step, setStep] = useState<number>(0);
  const [currentBloc, setCurrentBloc] = useState<ScenarioExcercise[]>([]);

  const restBlocList = useRef<ScenarioExcercise[][]>(blocList);
  const responseForBlocManager = useRef<BlocResponse>([]);

  function selectRandomBloc(): number {
    const randomIndex = randomIntFromInterval(
      0,
      restBlocList.current.length - 1
    );
    setCurrentBloc(restBlocList.current[randomIndex]);
    return randomIndex;
  }

  function removeBloc(index: number): void {
    restBlocList.current = restBlocList.current.filter((_, i) => i !== index);
  }

  function selectNextRandomBloc(): void {
    const index = selectRandomBloc();
    removeBloc(index);
  }

  function getResultHandler(responseList: TestResponse[]): void {
    responseForBlocManager.current.push({ step, responseList });
    selectNextRandomBloc();

    if (step >= blocList.length - 1) {
      console.log(responseForBlocManager);
    }

    setStep((step) => step + 1);
  }

  function continueTest(): void {
    setStep((step) => step + 1);
  }

  useEffect(() => {
    selectNextRandomBloc();
  }, []);

  const displayBloc = () => {
    if (currentBloc && currentBloc.length > 0) {
      return <Bloc exerciseList={currentBloc} getResult={getResultHandler} />;
    } else {
      return (
        <div>
          <h1>Pause</h1>
          <button onClick={continueTest}> Reprendre </button>
        </div>
      );
    }
  };

  return displayBloc();
};

export default BlocManager;
