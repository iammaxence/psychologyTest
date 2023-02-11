import { useCallback, useEffect, useRef, useState } from 'react';
import randomIntFromInterval from 'renderer/feature/utils/random/Random';
import { ScenarioHybrid } from 'renderer/data/Scenario';
import { UserStatistics } from '../../interfaces/UserStatistics';
import StimuliExercise from '../exercise/stimuliExercise/StimuliExercise';

interface PropsBloc {
  exerciseList: ScenarioHybrid[];
  getResult: (userStatisticsList: UserStatistics[]) => void;
}
const Bloc = ({ exerciseList, getResult }: PropsBloc) => {
  const [currentExercise, setCurrentExercise] = useState<
    ScenarioHybrid | undefined
  >();

  const restExcerciseList = useRef<ScenarioHybrid[]>([]);
  const userStatisticsList = useRef<UserStatistics[]>([]);

  useEffect(() => {
    init();
  }, [exerciseList]);

  function init(): void {
    initRestExerciceList();
    userStatisticsList.current = [];
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
      getResult(userStatisticsList.current);
    } else {
      const randomIndex = selectRandomExercise();
      removeExercise(randomIndex);
    }
  }

  function getResultHandler(userStatistics: UserStatistics) {
    userStatisticsList.current.push(userStatistics);
    nextExercise();
  }

  const getExerciceResult = useCallback(
    (userStatistics: UserStatistics) => getResultHandler(userStatistics),
    [currentExercise]
  );

  function displayExercise() {
    if (currentExercise) {
      return (
        <div>
          <StimuliExercise
            length={currentExercise.length}
            middleDivergence={currentExercise.middleDivergence}
            question={currentExercise.question}
            sound={currentExercise.sound}
            sendResult={getExerciceResult}
          />
        </div>
      );
    }
  }

  return <div>{displayExercise()}</div>;
};

export default Bloc;
