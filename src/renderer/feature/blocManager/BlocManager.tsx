import { useEffect, useRef, useState } from 'react';
import { ScenarioHybrid } from 'renderer/data/Scenario';
import Bloc from './Bloc';
import { BlocResponse } from '../../types/BlocResponse';
import Pause from 'renderer/components/pause/Pause';
import { TestResponse } from '../../types/TestResponse';

interface PropsBlocManager {
  blocList: ScenarioHybrid[][];
  sendData: (data: BlocResponse[]) => void;
}
const BlocManager = ({ blocList, sendData }: PropsBlocManager) => {
  const [step, setStep] = useState<number>(0);
  const [currentBloc, setCurrentBloc] = useState<ScenarioHybrid[]>([]);
  const [isPause, setIsPause] = useState<boolean>(false);

  const restBlocList = useRef<ScenarioHybrid[][]>(blocList);
  const responseForBlocManager = useRef<BlocResponse[]>([]);

  useEffect(() => {
    selectNextBloc();
  }, []);

  useEffect(() => {
    if (step != 0 && step % 2 == 0) {
      setIsPause(true);
    }
  }, [step]);

  function selectNextBloc(): void {
    setCurrentBloc(restBlocList.current[0]);
    restBlocList.current.shift();
  }

  function getResultHandler(responseList: TestResponse[]): void {
    responseForBlocManager.current.push({ step, responseList });
    selectNextBloc();

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
    }
    if (isPause) {
      return <Pause stopPause={stopPause} />;
    }
    return <div></div>;
  };

  return displayBloc();
};

export default BlocManager;
