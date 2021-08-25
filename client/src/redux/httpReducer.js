const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

const initialState = {
  isFetching: false,
  errorMessage: '',
};

function httpReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export function setIsFetching(isFetching) {
  return {
    type: SET_IS_FETCHING,
    payload: isFetching,
  };
}

export function setErrorMessage(errorMessage) {
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
  };
}

export default httpReducer;
