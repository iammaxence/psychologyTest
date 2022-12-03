import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import Cross from 'renderer/components/cross/Cross';
import Stimuli from 'renderer/components/stimuli/Stimuli';
import useEventListener from 'renderer/feature/eventListener/EventListener';
import LengthTestExercise from 'renderer/feature/lengthTestExercise/LengthTestExercise';
import randomIntFromInterval from 'renderer/feature/random/Random';
import { getUserSelector } from 'renderer/store/auth';
import './Home.scss';

const NUMBER_OF_STEP = 10;
const ESCAPE_KEYS = ['ArrowRight', 'ArrowLeft'];

const Home = () => {
  const [step, setStep] = useState(1);
  const [middleDivergence, setMiddleDivergence] = useState(0);
  const user = useSelector(getUserSelector);

  useEffect(() => {
    console.log('Home user : ' + user);
  }, []);

  useEffect(() => {
    if (step === NUMBER_OF_STEP) {
      localStorage.setItem('step', '1');
      console.log('END OF TEST');
    }
    setMiddleDivergence(randomIntFromInterval(-100, 100));
  }, [step]);

  //Data storage => use this instead :  https://github.com/sindresorhus/electron-store
  localStorage.setItem('step', step.toString());

  const incrementStep = () => {
    const nextStep: number = +localStorage.getItem('step')! + 1;
    localStorage.setItem('step', nextStep.toString());
    setStep(nextStep);
  };

  const arrowKeysHandler = (event: KeyboardEvent) => {
    event.preventDefault();
    if (ESCAPE_KEYS.includes(String(event.key)) && step < 10) {
      incrementStep();
    }
  };

  useEventListener('keydown', arrowKeysHandler);

  return (
    <div className="home">
      {/* <h1>
        Stimulus : {step} / {NUMBER_OF_STEP}
      </h1> */}
      {/* <Stimuli id={1} size={600} middleDivergence={middleDivergence} /> */}
      <LengthTestExercise />
    </div>
  );
};

export default Home;
