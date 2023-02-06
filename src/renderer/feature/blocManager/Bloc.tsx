import { useCallback, useEffect, useRef, useState } from 'react';
import randomIntFromInterval from 'renderer/feature/utils/random/Random';
import { ScenarioHybrid } from 'renderer/data/Scenario';
import { TestResponse } from '../../types/TestResponse';
import StimuliExercise from '../exercise/stimuliExercise/StimuliExercise';

interface PropsBloc {
  exerciseList: ScenarioHybrid[];
  getResult: (responseList: TestResponse[]) => void;
}
const Bloc = ({ exerciseList, getResult }: PropsBloc) => {
  const [currentExercise, setCurrentExercise] = useState<
    ScenarioHybrid | undefined
  >();

  const restExcerciseList = useRef<ScenarioHybrid[]>([]);
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
        <div>
          <StimuliExercise
            stimuliLength={currentExercise.length}
            middleDivergence={currentExercise.middleDivergence}
            sound={currentExercise.sound}
            soundOrientation={currentExercise.soundOrientation}
            question={currentExercise.question}
            sendResult={getExerciceResult}
          />
        </div>
      );
    }
  }

  return <div>{displayExercise()}</div>;
};

export default Bloc;
