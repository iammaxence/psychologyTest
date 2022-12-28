import arrowLeft from '../../../../../assets/arrow-left.png';
import arrowRight from '../../../../../assets/arrow-right.png';
import { TestResponse } from '../TestResponse';

interface PropsLeftRightAnswer {
  answer: TestResponse;
}
const LeftRightAnswer = ({ answer }: PropsLeftRightAnswer) => {
  const displayAnswer = () => {
    if (answer === TestResponse.RIGHT) {
      return (
        <img
          className="leftRightAnswer--image"
          src={arrowRight}
          alt="arrow-right"
          width={100}
          height={80}
        />
      );
    } else {
      return (
        <img
          className="leftRightAnswer--image"
          src={arrowLeft}
          alt="arrow-left"
          width={100}
          height={80}
        />
      );
    }
  };
  return displayAnswer();
};

export default LeftRightAnswer;
