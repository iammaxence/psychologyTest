import { useCallback, useEffect, useState } from 'react';
import ExplanatoryText from 'renderer/feature/explanatoryText/ExplanatoryText';
import { Scenario, makeScenario } from 'renderer/data/Scenario';
import StimuliExercise from '../exercise/stimuliExercise/StimuliExercise';

const TrainingTest = () => {
  const [step, setStep] = useState(0);
  const [currentStepPage, setCurrentStepPage] = useState<Scenario | null>(null);

  const scenarioTestList: Scenario[] = makeScenario();

  useEffect(() => {
    //Data storage => use this :  https://github.com/sindresorhus/electron-store
    setCurrentStepPage(scenarioTestList[0]);
  }, []);

  useEffect(() => {
    if (step < scenarioTestList.length) {
      setCurrentStepPage(scenarioTestList[step]);
    } else {
      console.log('Result');
    }
  }, [step]);

  const next = useCallback(() => setStep((step) => step + 1), [step]);

  const displayTestScenario = () => {
    if (!currentStepPage) return null;

    if (currentStepPage.type === 'TEXT') {
      return (
        <ExplanatoryText
          title={currentStepPage.title}
          description={currentStepPage.description}
          bloc={currentStepPage?.bloc}
          next={next}
        />
      );
    }

    return (
      <StimuliExercise
        length={currentStepPage.length}
        middleDivergence={currentStepPage.middleDivergence}
        question={currentStepPage.question}
        reverseDiagonal={currentStepPage.reverseDiagonal}
        sendResult={next}
      />
    );
  };
  return displayTestScenario();
};

export default TrainingTest;
