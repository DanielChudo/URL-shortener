import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthPage, CreatePage, DetailsPage, LinksPage } from './pages';
import { Loader, NavBar } from './components';
import { refresh } from './redux/authReducer';
import './App.css';

function App() {
  const [ready, setReady] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(refresh(setReady));
    } else {
      setReady(true);
    }
  }, [dispatch]);

  if (!ready) {
    return <Loader />;
  }

  return (
    <>
      {isAuth && <NavBar />}
      <div id="content">
        {isAuth ? (
          <Switch>
            <Route exact path="/create">
              <CreatePage />
            </Route>
            <Route exact path="/links">
              <LinksPage />
            </Route>
            <Route path="/details/:code">
              <DetailsPage />
            </Route>
            <Redirect to="/create" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <AuthPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
