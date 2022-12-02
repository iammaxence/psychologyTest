/* eslint-disable @typescript-eslint/ban-types */
import SimpleButton from 'renderer/components/button/simpleButton';
import InputText from '../text/InputText';
import './Input-button.scss';

interface PropsInputButton {
  setInputValue: Function;
  buttonAction: Function;
  disabled: boolean;
}

const InputButton = ({
  setInputValue,
  buttonAction,
  disabled,
}: PropsInputButton) => {
  return (
    <div className="inputButton">
      <InputText setInput={setInputValue} />
      <SimpleButton
        title="Confirmer"
        action={buttonAction}
        disabled={disabled}
      />
    </div>
  );
};

export default InputButton;
