import { useCallback, useEffect, useRef, useState } from 'react';
import LengthTestExercise from 'renderer/feature/lengthTestExercise/LengthTestExercise';
import { TestResponse } from 'renderer/feature/lengthTestExercise/TestResponse';
import randomIntFromInterval from 'renderer/feature/random/Random';
import { ScenarioExcercise } from 'renderer/feature/scenario/Scenario';

interface PropsBloc {
  exerciseList: ScenarioExcercise[];
  getResult: (responseList: Map<number, TestResponse>) => void;
}
const Bloc = ({ exerciseList, getResult }: PropsBloc) => {
  const [step, setStep] = useState(0);
  const [userResponseMap, setUserResponseMap] = useState<
    Map<number, TestResponse>
  >(new Map());
  const [currentExercise, setCurrentExercise] = useState<
    ScenarioExcercise | undefined
  >();

  const restExcerciseList = useRef<ScenarioExcercise[]>([]);

  useEffect(() => {
    console.log('--- BLOC COMPONENT ---');
    console.log(exerciseList.length);
    console.log(restExcerciseList.current.length);
    console.log('--------------------');
    initRestExerciceList();
  }, [exerciseList]);

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
      console.log('----BLOC DONE----');
      getResult(userResponseMap);
    } else {
      setStep((step) => step + 1);
      const randomIndex = selectRandomExercise();
      removeExercise(randomIndex);
    }
  }

  function getResultHandler(testResponse: TestResponse) {
    setUserResponseMap((map) => new Map(map.set(step, testResponse)));
    nextExercise();
  }

  const getExerciceResult = useCallback(
    (testResponse: TestResponse) => getResultHandler(testResponse),
    [currentExercise]
  );

  function displayExercise() {
    if (currentExercise) {
      return (
        <LengthTestExercise
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
