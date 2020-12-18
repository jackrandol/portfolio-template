import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <NavLink
        exact
        activeClassName='navLink--active'
        className='navLink'
        to={'/'}
      >
        Home
      </NavLink>
      <NavLink
        exact
        activeClassName='navLink--active'
        className='navLink'
        to={'/projects'}
      >
        Projects
      </NavLink>
      <NavLink
        exact
        activeClassName='navLink--active'
        className='navLink'
        to={'/about'}
      >
        About
      </NavLink>
      <NavLink
        exact
        activeClassName='navLink--active'
        className='navLink'
        to={'/login'}
      >
        login
      </NavLink>
      <NavLink
        exact
        activeClassName='navLink--active'
        className='navLink'
        to={'/register'}
      >
        Register
      </NavLink>
    </div>
  );
};

export default Navbar;
