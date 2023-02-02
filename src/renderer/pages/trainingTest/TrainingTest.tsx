import { useCallback, useEffect, useState } from 'react';
import ExplanatoryText from 'renderer/feature/explanatoryText/ExplanatoryText';
import LengthTestExercise from 'renderer/feature/lengthTestExercise/LengthTestExercise';
import { TestResponse } from 'renderer/feature/lengthTestExercise/testResponse/TestResponse';
import { Scenario, makeScenario } from 'renderer/feature/scenario/Scenario';

interface PropsTrainingTest {
  sendResult(testResponse: TestResponse): void;
}

const TrainingTest = ({ sendResult }: PropsTrainingTest) => {
  const [step, setStep] = useState(0);
  const [currentStepPage, setCurrentStepPage] = useState<Scenario | null>(null);

  const scenarioTestList: Scenario[] = makeScenario();

  useEffect(() => {
    //Data storage => use this :  https://github.com/sindresorhus/electron-store
    setCurrentStepPage(scenarioTestList[0]);
  }, []);

  useEffect(() => {
    console.log('Step change');
    if (step < scenarioTestList.length) {
      setCurrentStepPage(scenarioTestList[step]);
    } else {
      console.log('Result');
    }
  }, [step]);

  const next = useCallback(() => setStep((step) => step + 1), [step]);

  function exerciceResponse(testResponse: TestResponse) {
    console.log('TestResponse : ', testResponse);
    next();
  }

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
      <LengthTestExercise
        stimuliLength={currentStepPage.length}
        middleDivergence={currentStepPage.middleDivergence}
        question={currentStepPage.question}
        sendResult={exerciceResponse}
      />
    );
  };
  return displayTestScenario();
};

export default TrainingTest;
