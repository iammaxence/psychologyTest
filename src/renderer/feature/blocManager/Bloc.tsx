import { useCallback, useEffect, useRef, useState } from 'react';
import randomIntFromInterval from 'renderer/feature/random/Random';
import { ScenarioStimuli } from 'renderer/data/Scenario';
import { TestResponse } from '../exercise/stimuliExercise/testResponse/TestResponse';
import StimuliExercise from '../exercise/stimuliExercise/StimuliExercise';

interface PropsBloc {
  exerciseList: ScenarioStimuli[];
  getResult: (responseList: TestResponse[]) => void;
}
const Bloc = ({ exerciseList, getResult }: PropsBloc) => {
  const [currentExercise, setCurrentExercise] = useState<
    ScenarioStimuli | undefined
  >();

  const restExcerciseList = useRef<ScenarioStimuli[]>([]);
  const userResponseList = useRef<TestResponse[]>([]);

  useEffect(() => {
    init();
  }, [exerciseList]);

  function init(): void {
    initRestExerciceList();
    userResponseList.current = [];
  }

  function initRestExerciceList(): void {
    if (restExcerciseList.current.length == 0) {
      restExcerciseList.current = exerciseList;
      nextExercise();
    }
  }

  function selectRandomExercise(): number {
    const randomIndex = randomIntFromInterval(
      0,
      restExcerciseList.current.length - 1
    );
    setCurrentExercise(restExcerciseList.current[randomIndex]);
    return randomIndex;
  }

  function removeExercise(index: number) {
    restExcerciseList.current = restExcerciseList.current.filter(
      (_, i) => i !== index
    );
  }

  function nextExercise() {
    if (restExcerciseList.current.length == 0) {
      getResult(userResponseList.current);
    } else {
      const randomIndex = selectRandomExercise();
      removeExercise(randomIndex);
    }
  }

  function getResultHandler(testResponse: TestResponse) {
    userResponseList.current.push(testResponse);
    nextExercise();
  }

  const getExerciceResult = useCallback(
    (testResponse: TestResponse) => getResultHandler(testResponse),
    [currentExercise]
  );

  function displayExercise() {
    if (currentExercise) {
      return (
        <StimuliExercise
          stimuliLength={currentExercise.length}
          middleDivergence={currentExercise.middleDivergence}
          question={currentExercise.question}
          sendResult={getExerciceResult}
        />
      );
    }
  }

  return <div>{displayExercise()}</div>;
};

export default Bloc;
