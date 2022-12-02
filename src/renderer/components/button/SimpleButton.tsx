/* eslint-disable @typescript-eslint/ban-types */
import './SimpleButton.scss';

interface PropsSimpleButton {
  title: string;
  action: Function;
  disabled: boolean;
}

const SimpleButton = ({ title, action, disabled }: PropsSimpleButton) => {
  return (
    <button
      className="simpleButton"
      onClick={() => {
        action();
      }}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default SimpleButton;
