import { useEffect, useState } from 'react';
import Cross from 'renderer/components/cross/Cross';
import Stimuli from 'renderer/components/stimuli/Stimuli';
import useEventListener from '../eventListener/EventListener';
import randomIntFromInterval from '../random/Random';
import useWindowDimensions from '../windowDimensions/WindowDimentions';
import './LengthTestExercise.scss';
import arrowLeft from '../../../../assets/arrow-left.png';
import arrowRight from '../../../../assets/arrow-right.png';

interface PropsLengthTestExercise {
  // sendResult: (isUserResponseRight: boolean) => void;
  stimuliLength: number;
  middleDivergence: number;
}

const LengthTestExercise = ({
  stimuliLength,
  middleDivergence,
}: PropsLengthTestExercise) => {
  const ESCAPE_KEYS = ['ArrowRight', 'ArrowLeft'];
  const { width } = useWindowDimensions();
  const [step, setStep] = useState<number>(0);
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
    if (step > 3) {
      console.log('END OF TEST');
    }
  }, [step]);

  const isMiddleToRight = () => {
    return middleOfTheScreenX < middleOfTheScreenX + middleDivergence;
  };

  const displayAnswer = () => {
    if (isMiddleToRight()) {
      return (
        <img
          className="lengthTextExercise--image"
          src={arrowRight}
          alt="arrow-right"
          width={100}
          height={80}
        />
      );
    } else {
      return (
        <img
          className="lengthTextExercise--image"
          src={arrowLeft}
          alt="arrow-left"
          width={100}
          height={80}
        />
      );
    }
  };

  const arrowKeysHandler = (event: KeyboardEvent) => {
    event.preventDefault();
    if (ESCAPE_KEYS.includes(String(event.key)) && step > 0 && step < 3) {
      setStep(step + 1);
      console.log('step: ', step);
    }
  };

  useEventListener('keydown', arrowKeysHandler);

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
            {displayAnswer()}
          </div>
        );
      default:
        break;
    }
  };

  return <div className="lengthTextExercise">{displayCurrentStep()}</div>;
};

export default LengthTestExercise;
