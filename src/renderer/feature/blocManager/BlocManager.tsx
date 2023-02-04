import { useEffect, useRef, useState } from 'react';
import randomIntFromInterval from 'renderer/feature/random/Random';
import { ScenarioExcercise } from 'renderer/data/Scenario';
import Bloc from './Bloc';
import { TestResponse } from 'renderer/feature/lengthTestExercise/testResponse/TestResponse';
import { BlocResponse } from './BlocResponse';
import Pause from 'renderer/components/pause/Pause';
import { makeBlocList } from 'renderer/data/BlocList';

interface PropsBlocManager {
  sendData: (data: BlocResponse[]) => void;
}
const BlocManager = ({ sendData }: PropsBlocManager) => {
  const blocList: ScenarioExcercise[][] = makeBlocList();
  const [step, setStep] = useState<number>(0);
  const [currentBloc, setCurrentBloc] = useState<ScenarioExcercise[]>([]);
  const [isPause, setIsPause] = useState<boolean>(false);

  const restBlocList = useRef<ScenarioExcercise[][]>(blocList);
  const responseForBlocManager = useRef<BlocResponse[]>([]);

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
      sendData(responseForBlocManager.current);
    }

    setStep((step) => step + 1);
  }

  useEffect(() => {
    selectNextRandomBloc();
  }, []);

  useEffect(() => {
    if (step != 0 && step % 2 == 0) {
      setIsPause(true);
    }
  }, [step]);

  function blocExists() {
    return currentBloc && currentBloc.length > 0;
  }

  function stopPause() {
    setIsPause(false);
  }

  const displayBloc = () => {
    if (blocExists() && !isPause) {
      return <Bloc exerciseList={currentBloc} getResult={getResultHandler} />;
    } else {
      return <Pause stopPause={stopPause} />;
    }
  };

  return displayBloc();
};

export default BlocManager;
