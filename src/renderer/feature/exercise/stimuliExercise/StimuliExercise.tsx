import { useEffect, useState } from 'react';
import Cross from 'renderer/components/cross/Cross';
import Stimuli from 'renderer/components/stimuli/Stimuli';
import './StimuliExercise.scss';
import arrowLeft from '../../../../../assets/arrow-left.png';
import arrowRight from '../../../../../assets/arrow-right.png';
import { TestResponse } from './testResponse/TestResponse';
import useWindowDimensions from 'renderer/feature/windowDimensions/WindowDimentions';
import useEventListener from 'renderer/feature/eventListener/EventListener';
import LeftRightAnswer from './leftRightAnswer/LeftRightAnswer';
import { Orientation } from '../Orientation';
import SoundExercise from '../soundExercise/SoundExcercise';

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
  const [userAnswer, setUserAnwer] = useState<TestResponse>();
  const [middleOfTheScreenX, setMiddleOfTheScreenX] = useState<number>(0);

  useEffect(() => {
    setStep(ExerciseStep.CROSS_STEP);

    let timer = setTimeout(() => {
      setStep(ExerciseStep.STIMULI_STEP);
    }, 1000);
    timer = setTimeout(() => {
      setStep(ExerciseStep.USER_RESPONSE_STEP);
    }, 2000);

    return () => clearTimeout(timer);
  }, [stimuliLength, middleDivergence]);

  useEffect(() => {
    setMiddleOfTheScreenX(width / 2);
  }, [width]);

  const arrowKeysHandler = (event: KeyboardEvent) => {
    event.preventDefault();

    if (
      ESCAPE_KEYS.includes(String(event.key)) &&
      step === ExerciseStep.USER_RESPONSE_STEP
    ) {
      const userResponseKey =
        String(event.key) === 'ArrowRight' ? 'RIGHT' : 'LEFT';
      setUserAnwer({
        response: userResponseKey,
        lengthStimuli: stimuliLength.toString(),
        positionStimuli: stimuliPosition(),
      });
      setStep(ExerciseStep.RESULT_TEST);
    }

    if (
      ESCAPE_KEY_RESULT.includes(String(event.key)) &&
      step === ExerciseStep.RESULT_TEST
    ) {
      sendResult(userAnswer!);
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
          <SoundExercise
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
        return (
          <div className="stimuliExercise--text">
            <p> {question} </p>
            <div className="stimuliExercise--order-img">
              <img
                className="stimuliExercise--image"
                src={arrowLeft}
                alt="arrow-left"
                width={100}
                height={80}
              />
              <p> ou </p>
              <img
                className="stimuliExercise--image"
                src={arrowRight}
                alt="arrow-right"
                width={100}
                height={80}
              />
            </div>
          </div>
        );
      case ExerciseStep.RESULT_TEST:
        return (
          <div className="stimuliExercise--text">
            <span>La réponse est </span>
            <LeftRightAnswer answer={stimuliPosition()} />
            <div className="explanatoryText--bloc">
              <img
                className="explanatoryText--image"
                src={arrowRight}
                alt="arrow-right"
                width={60}
                height={60}
              />
              <p> pour continuer </p>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  return <div className="stimuliExercise">{displayCurrentStep()}</div>;
};

export default StimuliExercise;
