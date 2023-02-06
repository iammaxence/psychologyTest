import LeftRightAnswer from '../leftRightAnswer/LeftRightAnswer';
import arrowRight from '../../../../../../assets/arrow-right.png';

interface PropsResponse {
  answer: string;
}

const Response = ({ answer }: PropsResponse) => {
  return (
    <div className="stimuliExercise--text">
      <span>La réponse est </span>
      <LeftRightAnswer answer={answer} />
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
};
export default Response;
