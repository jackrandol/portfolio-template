import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './Navbar.css';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className='navBarAuth'>
      <NavLink
        exact
        activeClassName='navLink--active'
        className='navLink'
        to={'/register'}
      >
        Register New Admin
      </NavLink>
      <NavLink
        exact
        activeClassName='navLink--active'
        className='navLink'
        to={'/dashboard'}
      >
        dashboard
      </NavLink>
      <button className='navLink' onClick={logout}>
        logout
      </button>
    </div>
  );

  const guestLinks = (
    <div className='navBarAuth'>
      <NavLink
        exact
        activeClassName='navLink--active'
        className='navLink'
        to={'/login'}
      >
        login
      </NavLink>
    </div>
  );
  return (
    <div className='navBar'>
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
