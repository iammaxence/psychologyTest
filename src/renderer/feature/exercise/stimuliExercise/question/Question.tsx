import arrowLeft from '../../../../../../assets/arrow-left.png';
import arrowRight from '../../../../../../assets/arrow-right.png';

interface PropsQuestion {
  question: string;
}

const Question = ({ question }: PropsQuestion) => {
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
};

export default Question;
