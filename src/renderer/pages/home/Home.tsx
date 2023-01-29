import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ExplanatoryText from 'renderer/feature/explanatoryText/ExplanatoryText';
import LengthTestExercise from 'renderer/feature/lengthTestExercise/LengthTestExercise';
import { TestResponse } from 'renderer/feature/lengthTestExercise/TestResponse';
import Statistics from 'renderer/feature/statistics/Statistics';
import { getUserSelector } from 'renderer/store/auth';
import './Home.scss';
import { Scenario, makeScenario } from 'renderer/feature/scenario/Scenario';
import Menu from 'renderer/components/menu/Menu';
import BlocManager from '../bloc/BlocManager';

const Home = () => {
  const [step, setStep] = useState(0);
  const [currentStepPage, setCurrentStepPage] = useState<Scenario | null>(null);
  const [userResponseMap, setUserResponseMap] = useState<
    Map<number, TestResponse>
  >(new Map());
  const user = useSelector(getUserSelector);

  const scenarioTestList: Scenario[] = makeScenario();

  const [menuSelection, setMenuSelection] = useState(0);

  useEffect(() => {
    //Data storage => use this :  https://github.com/sindresorhus/electron-store
    setCurrentStepPage(scenarioTestList[0]);
  }, []);

  useEffect(() => {
    if (step < scenarioTestList.length) {
      setCurrentStepPage(scenarioTestList[step]);
    } else {
      exportResult();
    }
  }, [step]);

  function exportResult() {
    const columns = [
      'Réponse du participant',
      'Longueur du stimulus',
      'Placement du stimulus',
      'Sons',
      'Orientation du son',
    ];
    const rows: string[][] = [];
    for (const [, value] of userResponseMap) {
      rows.push([
        value.response,
        value.lengthStimuli,
        value.positionStimuli,
        'none',
        'none',
      ]);
    }
    Statistics.generateFile(user, columns, rows);
  }

  const goToMenuSelection = useCallback(
    (selection: number) => setMenuSelection(selection),
    []
  );

  function sendResult(testResponse: TestResponse) {
    setUserResponseMap((map) => new Map(map.set(step, testResponse)));
    next();
  }

  function next() {
    setStep((step) => step + 1);
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
        sendResult={sendResult}
      />
    );
  };

  const displayMenuSelection = () => {
    switch (menuSelection) {
      case 1:
        return displayTestScenario();
      case 2:
        return <BlocManager />;
      default:
        return <Menu setMenuSelection={goToMenuSelection} />;
    }
  };

  return <div className="home">{displayMenuSelection()}</div>;
};

export default Home;
