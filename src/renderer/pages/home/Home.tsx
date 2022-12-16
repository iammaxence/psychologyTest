import { useEffect, useState } from 'react';
import useEventListener from 'renderer/feature/eventListener/EventListener';
import ExplanatoryText from 'renderer/feature/explanatoryText/ExplanatoryText';
import LengthTestExercise from 'renderer/feature/lengthTestExercise/LengthTestExercise';
import { TestResponse } from 'renderer/feature/lengthTestExercise/TestResponse';
import './Home.scss';

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
  const ESCAPE_KEYS = ['Space'];
  const [step, setStep] = useState(0);
  const [currentStepPage, setCurrentStepPage] = useState<Scenario | null>(null);
  const [userResponseMap, setUserResponseMap] = useState<
    Map<number, TestResponse>
  >(new Map());
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
      middleDivergence: 20,
    },
    {
      type: 'EXERCISE',
      length: 700,
      middleDivergence: -20,
    },
    {
      type: 'TEXT',
      title: '',
      description:
        'Nous allons désormais faire le même exercice mais vous devrez indiquer quel côté de la droite est le plus court. \
        Toujours avec les fleches du clavier. Une croix apparaîtra encore sur l\'écran avant l\'apparition de la doite \
        qu\'il faudra fixer',
    },
    {
      type: 'TEXT',
      title: '',
      description:
        'Nous allons donc vous demander cette fois-ci d\'estimer: \
        Quel côté  de la droite est le plus court?',
    },
    {
      type: 'EXERCISE',
      length: 400,
      middleDivergence: -50,
    },
    {
      type: 'EXERCISE',
      length: 400,
      middleDivergence: 50,
    },
    {
      type: 'EXERCISE',
      length: 400,
      middleDivergence: -20,
    },
    {
      type: 'TEXT',
      title: "Fin de l'entrainement",
      description:
        "L'essai est terminé et le test va débuter. N'hésitez pas à poser des questions si besoin avant de débuter",
    },
  ];

  useEffect(() => {
    //Data storage => use this :  https://github.com/sindresorhus/electron-store
    setCurrentStepPage(scenarioTestList[0]);
  }, []);

  useEffect(() => {
    if (step < scenarioTestList.length) {
      setCurrentStepPage(scenarioTestList[step]);
    } else {
      console.log(userResponseMap);
    }
  }, [step]);

  const storeResult = (testResponse: TestResponse) => {
    if (testResponse !== TestResponse.NONE) {
      setUserResponseMap((map) => new Map(map.set(step, testResponse)));
      setStep((step) => step + 1);
    }
  };

  const hasUserAnsweredCurrentExercise = () => {
    console.log('userResponseMap.get(step) : ', userResponseMap.get(step));
    return (
      currentStepPage?.type === 'EXERCISE' &&
      userResponseMap.has(step) &&
      userResponseMap.get(step) !== TestResponse.NONE
    );
  };

  const arrowKeysHandler = (event: KeyboardEvent) => {
    event.preventDefault();

    if (
      ESCAPE_KEYS.includes(String(event.code)) &&
      step < scenarioTestList.length &&
      (currentStepPage?.type === 'TEXT' || hasUserAnsweredCurrentExercise())
    ) {
      setStep((step) => step + 1);
    }
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
        sendResult={storeResult}
      />
    );
  };

  return <div className="home">{displayScenario()}</div>;
};

export default Home;
