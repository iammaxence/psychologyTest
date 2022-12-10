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
    const timer = setTimeout(() => {
      setStep(1);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMiddleOfTheScreenX(width / 2);
  }, [width]);

  useEffect(() => {
    if (step > 2) {
      sendResult(userAnswer);
      console.log('END OF TEST and respond send : ', userAnswer);
    }
  }, [step]);

  const arrowKeysHandler = (event: KeyboardEvent) => {
    event.preventDefault();
    if (ESCAPE_KEYS.includes(String(event.key)) && step > 0 && step < 3) {
      if (step === 1) {
        setUserAnwer(
          String(event.key) === 'ArrowRight'
            ? TestResponse.RIGHT
            : TestResponse.LEFT
        );
      }
      setStep(step + 1);
    }
  };

  useEventListener('keydown', arrowKeysHandler);

  const isMiddleToRight = () => {
    return middleOfTheScreenX < middleOfTheScreenX + middleDivergence;
  };

  const displayCurrentStep = () => {
    switch (step) {
      case 0:
        return <Cross size={10} />;
      case 1:
        return (
          <Stimuli
            id={1}
            size={stimuliLength}
            middleDivergence={middleDivergence}
          />
        );
      case 2:
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
      case 3:
        return (
          <div className="lengthTextExercise--text">
            <p>La réponse était </p>
            <LeftRightAnswer
              answer={
                isMiddleToRight() ? TestResponse.RIGHT : TestResponse.LEFT
              }
            />
          </div>
        );
      default:
        break;
    }
  };

  return <div className="lengthTextExercise">{displayCurrentStep()}</div>;
};

export default LengthTestExercise;
