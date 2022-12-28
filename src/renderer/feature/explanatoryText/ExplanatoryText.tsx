import space from '../../../../assets/space.png';
import './ExplanatoryText.scss';

interface PropsExplanatoryText {
  title: string;
  description: string;
  bloc?: string;
}
const ExplanatoryText = ({ title, description, bloc }: PropsExplanatoryText) => {
  const displayTitle = () => {
    if (title !== '') {
      return <h1 className="explanatoryText--title">{title}</h1>;
    }
  };

  return (
    <div className="explanatoryText">
      <div className="explanatoryText--head">
        {displayTitle()}
        <p className="explanatoryText--description">{description}</p>
        <p className='explanatoryText--description'>{bloc !== undefined  && bloc}</p>
      </div>
      <div className="explanatoryText--bloc">
        <img
          className="explanatoryText--image"
          src={space}
          alt="space"
          width={60}
          height={60}
        />
        <p> pour continuer </p>
      </div>
    </div>
  );
};

export default ExplanatoryText;
