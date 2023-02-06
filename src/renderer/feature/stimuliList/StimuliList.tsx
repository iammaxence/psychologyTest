import Stimuli from 'renderer/components/stimuli/Stimuli';
import randomIntFromInterval from '../utils/random/Random';

const STIMULI_NUMBER = 6;

const StimuliList = () => {
  const renderMultipleStimuli = () => {
    return [...Array(STIMULI_NUMBER)].map((e, i) => {
      const size: number = randomIntFromInterval(20, 200);
      return <Stimuli key={i + e} id={i} size={size} middleDivergence={0} />;
    });
  };
  return <div className="home">{renderMultipleStimuli()}</div>;
};

export default StimuliList;
