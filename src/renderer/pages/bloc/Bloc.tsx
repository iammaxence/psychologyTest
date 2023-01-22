import { useCallback, useEffect, useState } from 'react';
import LengthTestExercise from 'renderer/feature/lengthTestExercise/LengthTestExercise';
import { TestResponse } from 'renderer/feature/lengthTestExercise/TestResponse';
import randomIntFromInterval from 'renderer/feature/random/Random';
import { ScenarioExcercise } from 'renderer/feature/scenario/Scenario';

interface PropsBloc {
  index: number;
  exerciseList: ScenarioExcercise[];
  done: () => void;
}
const Bloc = ({ index, exerciseList, done }: PropsBloc) => {
  const [step, setStep] = useState(index);
  const [restExcerciseList, setRestExerciseList] = useState(exerciseList);
  const [currentExercise, setCurrentExercise] = useState<
    ScenarioExcercise | undefined
  >();
  const [userResponseMap, setUserResponseMap] = useState<
    Map<number, TestResponse>
  >(new Map());

  useEffect(() => {
    nextExercise();
  }, []);

  function selectRandomExercise(): number {
    const randomIndex = randomIntFromInterval(0, restExcerciseList.length - 1);
    setCurrentExercise(restExcerciseList[randomIndex]);
    return randomIndex;
  }

  function removeExercise(index: number) {
    setRestExerciseList(restExcerciseList.filter((_, i) => i !== index));
  }

  function nextExercise() {
    if (restExcerciseList.length == 0) {
      console.log('----DONE----');
      console.log(userResponseMap);
      done();
    } else {
      setStep((step) => step + 1);
      const randomIndex = selectRandomExercise();
      removeExercise(randomIndex);
    }
    console.log('restExcerciseList ; ', restExcerciseList);
    console.log('userResponseMap ; ', userResponseMap);
  }

  function getResultHandler(testResponse: TestResponse) {
    setUserResponseMap((map) => new Map(map.set(step, testResponse)));
    nextExercise();
  }

  const getResult = useCallback(
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
          sendResult={getResult}
        />
      );
    }
  }

  return <div>{displayExercise()}</div>;
};

export default Bloc;
