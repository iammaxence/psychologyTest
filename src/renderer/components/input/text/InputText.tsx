/* eslint-disable @typescript-eslint/ban-types */
import './InputText.scss';

interface PropsInputText {
  setInput: Function;
}

const InputText = ({ setInput }: PropsInputText) => {
  return (
    <div className="inputText">
      <label>Entrez votre numéro d’identification : </label>
      <input
        type="number"
        required
        id="login-input"
        onChange={(event) => setInput(event.target.value)}
      />
    </div>
  );
};

export default InputText;
