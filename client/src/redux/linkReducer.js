import { linkAPI } from '../api/api';
import { setIsFetching, setErrorMessage } from './httpReducer';

const SET_LINKS = 'SET_LINKS';
const SET_LINK = 'SET_LINK';

const initialState = {
  links: null,
  link: null,
};

function linkReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LINKS:
      return { ...state, links: action.payload };
    case SET_LINK:
      return { ...state, link: action.payload };
    default:
      return state;
  }
}

export function setLinks(links) {
  return {
    type: SET_LINKS,
    payload: links,
  };
}

export function setLink(link) {
  return {
    type: SET_LINK,
    payload: link,
  };
}

export const generateShortLink =
  (originalLink, history) => async (dispatch) => {
    dispatch(setIsFetching(true));
    try {
      const response = await linkAPI.generateShortLink(originalLink);
      history.push(`details/${response.data.code}`);
      dispatch(setErrorMessage(''));
    } catch (e) {
      dispatch(setErrorMessage(e.response.data.message));
    } finally {
      dispatch(setIsFetching(false));
    }
  };

export const requestUserLinks = () => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await linkAPI.getUserLinks();
    dispatch(setLinks(response.data.links));
  } catch (e) {
    console.log(e.response);
  } finally {
    dispatch(setIsFetching(false));
  }
};

export const getLinkByCode = (code) => async (dispatch) => {
  dispatch(setIsFetching(true));
  try {
    const response = await linkAPI.getLinkByCode(code);
    dispatch(setLink(response.data.link));
  } catch (e) {
    console.log(e.response);
  } finally {
    dispatch(setIsFetching(false));
  }
};

export default linkReducer;
