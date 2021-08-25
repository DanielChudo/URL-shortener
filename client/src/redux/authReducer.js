import { authAPI } from '../api/api';
import { setIsFetching, setErrorMessage } from './httpReducer';

const SET_IS_AUTH = 'SET_IS_AUTH';

const initialState = {
  isAuth: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_AUTH:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
}

export function setIsAuth(isAuth) {
  return {
    type: SET_IS_AUTH,
    payload: isAuth,
  };
}

export const registration = (email, password) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await authAPI.registration(email, password);
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setIsAuth(true));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.response.data.message));
  } finally {
    dispatch(setIsFetching(false));
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await authAPI.login(email, password);
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setIsAuth(true));
    dispatch(setErrorMessage(''));
  } catch (e) {
    dispatch(setErrorMessage(e.response.data.message));
  } finally {
    dispatch(setIsFetching(false));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    await authAPI.logout();
    localStorage.removeItem('token');
    dispatch(setIsAuth(false));
    dispatch(setErrorMessage(''));
  } catch (e) {
    console.log(e.response);
  } finally {
    dispatch(setIsFetching(false));
  }
};

export const refresh = (setReady) => async (dispatch) => {
  try {
    const response = await authAPI.refresh();
    localStorage.setItem('token', response.data.accessToken);
    dispatch(setIsAuth(true));
    dispatch(setErrorMessage(''));
  } catch (e) {
    console.log(e.response);
  } finally {
    setReady(true);
  }
};

export default authReducer;
