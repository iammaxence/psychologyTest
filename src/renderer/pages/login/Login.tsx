import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputButton from 'renderer/components/input/button/Input-button';
import { login } from 'renderer/store/auth';
import './Login.scss';

const Login = () => {
  const [id, setId] = useState<number>(-1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setInputValue = (value: string) => {
    value ? setId(+value) : setId(-1);
  };

  const submit = () => {
    console.log('Submit id: ', id);
    dispatch(login(id));
    navigate('/home');
  };

  return (
    <div className="login">
      <h1> Login </h1>
      <InputButton
        setInputValue={setInputValue}
        buttonAction={submit}
        disabled={id === -1}
      />
    </div>
  );
};

export default Login;
