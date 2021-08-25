import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './index.css';
import App from './App';
import { logout } from './redux/authReducer';
import instance, { authAPI } from './api/api';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

const { dispatch } = store;
instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await authAPI.refresh();
        localStorage.setItem('token', response.data.accessToken);
        return instance.request(originalRequest);
      } catch (e) {
        dispatch(logout());
      }
    }

    throw error;
  }
);
