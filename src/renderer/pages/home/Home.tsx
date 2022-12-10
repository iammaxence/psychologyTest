import { useEffect, useState } from 'react';
import useEventListener from 'renderer/feature/eventListener/EventListener';
import ExplanatoryText from 'renderer/feature/explanatoryText/ExplanatoryText';
import LengthTestExercise from 'renderer/feature/lengthTestExercise/LengthTestExercise';
import { TestResponse } from 'renderer/feature/lengthTestExercise/TestResponse';
import './Home.scss';

const ESCAPE_KEYS = ['Space'];

type Scenario = ScenarioText | ScenarioExcercise;

interface ScenarioText {
  type: 'TEXT';
  title: string;
  description: string;
}

interface ScenarioExcercise {
  type: 'EXERCISE';
  length: number;
  middleDivergence: number;
}

const Home = () => {
  const [step, setStep] = useState(0);
  const [currentStepPage, setCurrentStepPage] = useState<Scenario | null>(null);
  const [userResponse, setUserResponse] = useState<TestResponse>(
    TestResponse.NONE
  );
  // const user = useSelector(getUserSelector);

  // Add type Scenario
  const scenarioTestList: Scenario[] = [
    {
      type: 'TEXT',
      title: "Phase d'entrainement",
      description:
        "Le but du test est d'indiquer quel côté de la ligne qui vous sera présentée est la plus courte \
        ou la plus longue selon la consigne. Vous devez répondre à la question à l'aide des flèches du clavier",
    },
    {
      type: 'TEXT',
      title: '',
      description:
        "Avant que chaque ligne apparaisse une croix vous sera présentée au centre de l'écran. Nous vous demandons \
        de fixer cette croix en attendant l'apparation de la droite. La question posée ne variera pas pour chaque essai \
        mais par groupe",
    },
    {
      type: 'TEXT',
      title: '',
      description:
        "Nous allons commencer par vous demander d'estimer: Quel côté de la droite est le plus long ?",
    },
    {
      type: 'EXERCISE',
      length: 700,
      middleDivergence: 50,
    },
    {
      type: 'EXERCISE',
      length: 700,
      middleDivergence: 50,
    },
    {
      type: 'EXERCISE',
      length: 700,
      middleDivergence: 50,
    },
    {
      type: 'TEXT',
      title: "Fin de l'entrainement",
      description:
        "L'essai est terminé et le test va débuter. N'hésitez pas à poser des questions si besoin avant de débuter",
    },
  ];

  useEffect(() => {
    //Data storage => use this instead :  https://github.com/sindresorhus/electron-store
    localStorage.setItem('step', step.toString());
    setCurrentStepPage(scenarioTestList[0]);
  }, []);

  useEffect(() => {
    if (step < scenarioTestList.length) {
      localStorage.setItem('step', (step + 1).toString());
      setCurrentStepPage(scenarioTestList[step]);
    }
  }, [step]);

  const numberOfTextStep = () => {
    return scenarioTestList.reduce((countTextType, currentScenario) => {
      return currentScenario.type === 'TEXT'
        ? countTextType + 1
        : countTextType;
    }, 0);
  };

  const arrowKeysHandler = (event: KeyboardEvent) => {
    event.preventDefault();
    if (
      ESCAPE_KEYS.includes(String(event.code)) &&
      userResponse != TestResponse.NONE
    ) {
      incrementStep();
    }

    if (
      ESCAPE_KEYS.includes(String(event.code)) &&
      step < numberOfTextStep() &&
      currentStepPage?.type === 'TEXT'
    ) {
      incrementStep();
    }
  };

  const incrementStep = () => {
    const nextStep: number = +localStorage.getItem('step')! + 1;
    localStorage.setItem('step', nextStep.toString());
    setStep(nextStep);
  };

  useEventListener('keydown', arrowKeysHandler);

  const displayScenario = () => {
    if (!currentStepPage) return null;

    if (currentStepPage.type === 'TEXT') {
      return (
        <ExplanatoryText
          title={currentStepPage.title}
          description={currentStepPage.description}
        />
      );
    }

    return (
      <LengthTestExercise
        stimuliLength={currentStepPage.length}
        middleDivergence={currentStepPage.middleDivergence}
        sendResult={setUserResponse}
      />
    );
  };

  return <div className="home">{displayScenario()}</div>;
};

export default Home;
