/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, registration } from '../../redux/authReducer';
import { Loader } from '../../components';
import './AuthPage.css';

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);
  const [jumping, setJumping] = useState(false);
  const isFetching = useSelector((state) => state.http.isFetching);
  const errorMessage = useSelector((state) => state.http.errorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Авторизация';
  }, []);

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  const registrationHandler = (event) => {
    event.preventDefault();
    dispatch(registration(email, password));
  };

  const changeButtonHandler = () => {
    setTimeout(() => setIsRegistered((prevState) => !prevState), 90);
    setJumping(true);
  };

  return (
    <div id="auth">
      <div className={`error ${!errorMessage ? 'invisible' : ''}`}>
        {errorMessage || 'заглушка'}
      </div>
      <div className={`container border ${isFetching ? 'isFetching' : ''}`}>
        <h1>Сократи ссылку ✂</h1>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            id="email"
            className="border"
            value={email}
            placeholder="Введите email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Пароль:</label>
          <input
            name="password"
            id="password"
            className="border"
            value={password}
            type="password"
            placeholder="Введите пароль"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="remark">
            Пароль должен содержать от 6 до 32 символов
          </span>
          <button
            type="submit"
            onClick={isRegistered ? loginHandler : registrationHandler}
            disabled={isFetching}
            className={jumping ? 'jumping' : undefined}
          >
            {isRegistered ? 'Войти' : 'Зарегистрироваться'}
          </button>
          <button
            type="button"
            id="auth__button_change-form"
            onClick={changeButtonHandler}
            className={jumping ? 'jumping' : undefined}
            onAnimationEnd={() => setJumping(false)}
          >
            {isRegistered ? 'Впервые у нас?' : 'Уже зарегистрированы?'}
          </button>
        </form>
        {isFetching && <Loader />}
      </div>
    </div>
  );
}

export default AuthPage;
