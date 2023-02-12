import { useEffect, useRef, useState } from 'react';
import Cross from 'renderer/components/cross/Cross';
import Stimuli from 'renderer/components/stimuli/Stimuli';
import './StimuliExercise.scss';
import useWindowDimensions from 'renderer/feature/utils/windowDimensions/WindowDimentions';
import useEventListener from 'renderer/feature/utils/eventListener/EventListener';
import Question from './question/Question';
import Response from './response/Response';
import { Sound } from 'renderer/interfaces/Sound';
import SoundExercise from 'renderer/feature/sound/SoundExercise';
import {
  MiddlePosition,
  UserStatistics,
} from 'renderer/interfaces/UserStatistics';

enum ExerciseStep {
  CROSS_STEP = 0,
  STIMULI_STEP = 1,
  USER_RESPONSE_STEP = 2,
  RESULT_TEST = 3,
}

interface PropsStimuliExercise {
  length: number;
  middleDivergence: number;
  question: string;
  sound?: Sound;
  reverseDiagonal?: boolean;
  sendResult: (userStatistics: UserStatistics) => void;
}

const StimuliExercise = ({
  length,
  middleDivergence,
  question,
  sound,
  reverseDiagonal = false,
  sendResult,
}: PropsStimuliExercise) => {
  const ESCAPE_KEYS = ['ArrowRight', 'ArrowLeft'];
  const ESCAPE_KEY_RESULT = ['ArrowRight'];

  const { width } = useWindowDimensions();
  const [step, setStep] = useState<number>(0);
  const userAnswer = useRef<UserStatistics>();
  const [middleOfTheScreenX, setMiddleOfTheScreenX] = useState<number>(0);

  useEffect(() => {
    const timer = initStepInCorrectOrder();

    return () => clearTimeout(timer);
  }, [length, middleDivergence, sound]);

  useEffect(() => {
    setMiddleOfTheScreenX(width / 2);
  }, [width]);

  function initStepInCorrectOrder() {
    setStep(ExerciseStep.CROSS_STEP);

    let timer = setTimeout(() => {
      setStep(ExerciseStep.STIMULI_STEP);
    }, 1000);

    timer = setTimeout(() => {
      setStep(ExerciseStep.USER_RESPONSE_STEP);
    }, 2000);

    return timer;
  }

  const arrowKeysHandler = (event: KeyboardEvent) => {
    event.preventDefault();

    if (
      ESCAPE_KEYS.includes(String(event.key)) &&
      step === ExerciseStep.USER_RESPONSE_STEP
    ) {
      userAnswer.current = {
        response: String(event.key) === 'ArrowRight' ? 'RIGHT' : 'LEFT',
        lengthStimuli: length,
        middlePosition: middlePosition(),
        sound,
      };
      setStep(ExerciseStep.RESULT_TEST);
    }

    if (
      ESCAPE_KEY_RESULT.includes(String(event.key)) &&
      step === ExerciseStep.RESULT_TEST &&
      userAnswer.current
    ) {
      sendResult(userAnswer.current);
    }
  };

  useEventListener('keydown', arrowKeysHandler);

  const middlePosition = (): MiddlePosition => {
    if (middleOfTheScreenX === middleOfTheScreenX + middleDivergence) {
      return 'MIDDLE';
    }
    return middleOfTheScreenX < middleOfTheScreenX + middleDivergence
      ? 'RIGHT'
      : 'LEFT';
  };

  const displayStimuli = () => {
    // TODO Waiting for more sound
    if (sound && sound.name === 'dog') {
      return (
        <div>
          <SoundExercise sound={sound} />
          <Stimuli
            id={1}
            size={length}
            middleDivergence={middleDivergence}
            reverseDiagonal={reverseDiagonal}
          />
        </div>
      );
    } else {
      return (
        <Stimuli
          id={1}
          size={length}
          middleDivergence={middleDivergence}
          reverseDiagonal={reverseDiagonal}
        />
      );
    }
  };

  const displayCurrentStep = () => {
    switch (step) {
      case ExerciseStep.CROSS_STEP:
        return <Cross size={10} />;
      case ExerciseStep.STIMULI_STEP:
        return displayStimuli();
      case ExerciseStep.USER_RESPONSE_STEP:
        return <Question question={question} />;
      case ExerciseStep.RESULT_TEST:
        return <Response answer={middlePosition()} />;
      default:
        break;
    }
  };

  return <div className="stimuliExercise">{displayCurrentStep()}</div>;
};

export default StimuliExercise;
