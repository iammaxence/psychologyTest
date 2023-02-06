import { useEffect, useRef, useState } from 'react';
import Cross from 'renderer/components/cross/Cross';
import Stimuli from 'renderer/components/stimuli/Stimuli';
import './StimuliExercise.scss';
import { TestResponse } from '../../../types/TestResponse';
import useWindowDimensions from 'renderer/feature/utils/windowDimensions/WindowDimentions';
import useEventListener from 'renderer/feature/utils/eventListener/EventListener';
import { Orientation } from '../../../types/Orientation';
import Sound from '../../sound/Sound';
import Question from './question/Question';
import Response from './response/Response';

enum ExerciseStep {
  CROSS_STEP = 0,
  STIMULI_STEP = 1,
  USER_RESPONSE_STEP = 2,
  RESULT_TEST = 3,
}

interface PropsStimuliExercise {
  stimuliLength: number;
  middleDivergence: number;
  sound?: string;
  soundOrientation?: Orientation;
  question: string;
  sendResult: (testResponse: TestResponse) => void;
}

const StimuliExercise = ({
  stimuliLength,
  middleDivergence,
  sound,
  soundOrientation,
  question,
  sendResult,
}: PropsStimuliExercise) => {
  const ESCAPE_KEYS = ['ArrowRight', 'ArrowLeft'];
  const ESCAPE_KEY_RESULT = ['ArrowRight'];

  const { width } = useWindowDimensions();
  const [step, setStep] = useState<number>(0);
  const userAnswer = useRef<TestResponse>();
  const [middleOfTheScreenX, setMiddleOfTheScreenX] = useState<number>(0);

  useEffect(() => {
    const timer = initStepInCorrectOrder();

    return () => clearTimeout(timer);
  }, [stimuliLength, middleDivergence]);

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
        lengthStimuli: stimuliLength.toString(),
        positionStimuli: stimuliPosition(),
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

  const stimuliPosition = (): string => {
    return middleOfTheScreenX < middleOfTheScreenX + middleDivergence
      ? 'RIGHT'
      : 'LEFT';
  };

  const displayStimuli = () => {
    if (sound && soundOrientation) {
      return (
        <div>
          <Sound
            sound={sound}
            soundOrientation={soundOrientation}
            next={() => ''}
          />
          <Stimuli
            id={1}
            size={stimuliLength}
            middleDivergence={middleDivergence}
          />
        </div>
      );
    } else {
      return (
        <Stimuli
          id={1}
          size={stimuliLength}
          middleDivergence={middleDivergence}
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
        return <Response answer={stimuliPosition()} />;
      default:
        break;
    }
  };

  return <div className="stimuliExercise">{displayCurrentStep()}</div>;
};

export default StimuliExercise;
