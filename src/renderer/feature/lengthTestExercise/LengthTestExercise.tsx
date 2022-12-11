import { useEffect, useState } from 'react';
import Cross from 'renderer/components/cross/Cross';
import Stimuli from 'renderer/components/stimuli/Stimuli';
import useEventListener from '../eventListener/EventListener';
import useWindowDimensions from '../windowDimensions/WindowDimentions';
import './LengthTestExercise.scss';
import arrowLeft from '../../../../assets/arrow-left.png';
import arrowRight from '../../../../assets/arrow-right.png';
import { TestResponse } from './TestResponse';
import LeftRightAnswer from './leftRightAnswer/leftRightAnswer';

enum ExerciseStep {
  CROSS_STEP = 0,
  STIMULI_STEP = 1,
  USER_RESPONSE_STEP = 2,
  RESULT_TEST = 3,
}

interface PropsLengthTestExercise {
  stimuliLength: number;
  middleDivergence: number;
  sendResult: (testResponse: TestResponse) => void;
}

const LengthTestExercise = ({
  stimuliLength,
  middleDivergence,
  sendResult,
}: PropsLengthTestExercise) => {
  const ESCAPE_KEYS = ['ArrowRight', 'ArrowLeft'];
  const { width } = useWindowDimensions();
  const [step, setStep] = useState<number>(0);
  const [userAnswer, setUserAnwer] = useState<TestResponse>(TestResponse.NONE);
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
      if (step === ExerciseStep.USER_RESPONSE_STEP) {
        const userResponseKey =
          String(event.key) === 'ArrowRight'
            ? TestResponse.RIGHT
            : TestResponse.LEFT;
        setUserAnwer(userResponseKey);
      }
      setStep(ExerciseStep.RESULT_TEST);
    }

    if (step === ExerciseStep.RESULT_TEST) {
      sendResult(userAnswer);
      setUserAnwer(TestResponse.NONE);
    }
  };

  useEventListener('keydown', arrowKeysHandler);

  const isMiddleToRight = (): TestResponse => {
    return middleOfTheScreenX < middleOfTheScreenX + middleDivergence
      ? TestResponse.RIGHT
      : TestResponse.LEFT;
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
            <p>Quel côté était le plus long ? </p>
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
            <p>La réponse était </p>
            <LeftRightAnswer answer={isMiddleToRight()} />
          </div>
        );
      default:
        break;
    }
  };

  return <div className="lengthTextExercise">{displayCurrentStep()}</div>;
};

export default LengthTestExercise;
