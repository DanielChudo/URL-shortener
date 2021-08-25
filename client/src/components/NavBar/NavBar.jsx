import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/authReducer';
import './NavBar.css';

function NavBar() {
  const dispatch = useDispatch();

  return (
    <div id="navbar">
      <NavLink to="/create">Сократить</NavLink>
      <NavLink to="/links">Ссылки</NavLink>
      <NavLink to="/" onClick={() => dispatch(logout())}>
        Выйти
      </NavLink>
    </div>
  );
}

export default NavBar;
