import arrowRight from '../../../../assets/arrow-right.png';
import './ExplanatoryText.scss';

interface PropsExplanatoryText {
  title: string;
  description: string;
}
const ExplanatoryText = ({ title, description }: PropsExplanatoryText) => {
  const displayTitle = () => {
    if (title !== '') {
      return <h1 className="explanatoryText--title">{title}</h1>;
    }
  };

  return (
    <div className="explanatoryText">
      {displayTitle()}
      <p className="explanatoryText--description">{description}</p>
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

export default ExplanatoryText;
