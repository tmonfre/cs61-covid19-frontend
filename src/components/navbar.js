import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';
import { signOut } from '../state/actions';

const NavBar = (props) => {
  return (
    <header>
      <NavLink to={ROUTES.HOME}>
        <h2>COVID-19 Data Visualization</h2>
      </NavLink>

      <div id="auth-container">
        <h3>{Object.keys(props.user).length > 0 && props.user.FirstName ? `Welcome ${props.user.FirstName}!` : 'Welcome!'}</h3>

        {props.user.AdminUser ? (
          <NavLink to={ROUTES.ADMIN}>
            <div id="nav-header-button">
              <p>Admin Portal</p>
            </div>
          </NavLink>
        ) : null }

        {Object.keys(props.user).length > 0 ? (
          <div id="nav-header-button" onClick={props.signOut} role="button" tabIndex={0}>
            <p>Sign Out</p>
          </div>
        ) : (
          <NavLink to={ROUTES.LOGIN}>
            <div id="nav-header-button">
              <p>Sign In</p>
            </div>
          </NavLink>
        )}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(signOut());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar);
