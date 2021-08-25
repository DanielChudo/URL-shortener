import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './authReducer';
import linkReducer from './linkReducer';
import httpReducer from './httpReducer';

const reducers = combineReducers({
  auth: authReducer,
  link: linkReducer,
  http: httpReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
