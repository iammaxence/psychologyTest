import { useEffect, useState } from 'react';
import Cross from 'renderer/components/cross/Cross';
import Stimuli from 'renderer/components/stimuli/Stimuli';
import useEventListener from '../eventListener/EventListener';
import useWindowDimensions from '../windowDimensions/WindowDimentions';
import './LengthTestExercise.scss';
import arrowLeft from '../../../../assets/arrow-left.png';
import arrowRight from '../../../../assets/arrow-right.png';
import { TestResponse } from './TestResponse';
import LeftRightAnswer from './leftRightAnswer/LeftRightAnswer';

enum ExerciseStep {
  CROSS_STEP = 0,
  STIMULI_STEP = 1,
  USER_RESPONSE_STEP = 2,
  RESULT_TEST = 3,
}

interface PropsLengthTestExercise {
  stimuliLength: number;
  middleDivergence: number;
  question: string;
  sendResult: (testResponse: TestResponse) => void;
}

const LengthTestExercise = ({
  stimuliLength,
  middleDivergence,
  question,
  sendResult,
}: PropsLengthTestExercise) => {
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

  const displayCurrentStep = () => {
    switch (step) {
      case ExerciseStep.CROSS_STEP:
        return <Cross size={10} />;
      case ExerciseStep.STIMULI_STEP:
        return (
          <Stimuli
            id={1}
            size={stimuliLength}
            middleDivergence={middleDivergence}
          />
        );
      case ExerciseStep.USER_RESPONSE_STEP:
        return (
          <div className="lengthTextExercise--text">
            <p> {question} </p>
            <div className="lengthTextExercise--order-img">
              <img
                className="lengthTextExercise--image"
                src={arrowLeft}
                alt="arrow-left"
                width={100}
                height={80}
              />
              <p> ou </p>
              <img
                className="lengthTextExercise--image"
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
          <div className="lengthTextExercise--text">
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

  return <div className="lengthTextExercise">{displayCurrentStep()}</div>;
};

export default LengthTestExercise;
