import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div>
      <button className='navLink' onClick={logout}>
        logout
      </button>
      <NavLink
        exact
        activeClassName='navLink--active'
        className='navLink'
        to={'/dashboard'}
      >
        dashboard
      </NavLink>
    </div>
  );

  const guestLinks = (
    <div>
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
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
