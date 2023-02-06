import arrowRight from '../../../../assets/arrow-right.png';
import useEventListener from '../utils/eventListener/EventListener';
import './ExplanatoryText.scss';

interface PropsExplanatoryText {
  title: string;
  description: string;
  bloc?: string;
  next: () => void;
}
const ExplanatoryText = ({
  title,
  description,
  bloc,
  next,
}: PropsExplanatoryText) => {
  const ESCAPE_KEYS = ['ArrowRight'];

  const arrowKeysHandler = (event: KeyboardEvent) => {
    event.preventDefault();

    if (ESCAPE_KEYS.includes(String(event.key))) {
      next();
    }
  };

  useEventListener('keydown', arrowKeysHandler);

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
        <p className="explanatoryText--description">
          {bloc !== undefined && bloc}
        </p>
      </div>
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
