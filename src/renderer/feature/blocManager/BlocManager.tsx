import { useEffect, useRef, useState } from 'react';
import randomIntFromInterval from 'renderer/feature/random/Random';
import { ScenarioStimuli } from 'renderer/data/Scenario';
import Bloc from './Bloc';
import { BlocResponse } from './BlocResponse';
import Pause from 'renderer/components/pause/Pause';
import { makeBlocList } from 'renderer/data/BlocList';
import { TestResponse } from '../exercise/stimuliExercise/testResponse/TestResponse';

interface PropsBlocManager {
  sendData: (data: BlocResponse[]) => void;
}
const BlocManager = ({ sendData }: PropsBlocManager) => {
  const blocList: ScenarioStimuli[][] = makeBlocList();
  const [step, setStep] = useState<number>(0);
  const [currentBloc, setCurrentBloc] = useState<ScenarioStimuli[]>([]);
  const [isPause, setIsPause] = useState<boolean>(false);

  const restBlocList = useRef<ScenarioStimuli[][]>(blocList);
  const responseForBlocManager = useRef<BlocResponse[]>([]);

  useEffect(() => {
    selectNextRandomBloc();
  }, []);

  useEffect(() => {
    if (step != 0 && step % 2 == 0) {
      setIsPause(true);
    }
  }, [step]);

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
