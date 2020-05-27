import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/auth.scss';

import { signIn } from '../../state/actions';
import { ROUTES } from '../../constants';

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSuccessCallback = () => {
    props.history.push('/');
  };

  const onFailureCallback = (error) => {
    if (error.message) {
      toast.error(error.message);
    } else if (error.msg) {
      toast.error(error.msg);
    } else if (error.error && error.error.message) {
      toast.error(error.error.message);
    } else if (error.error && error.error.msg) {
      toast.error(error.error.message);
    } else {
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <Fade>
      <div id="sign-in-container">
        <ToastContainer />
        <h3>Sign In</h3>
        <p id="signup-link">Don&apos;t have an account? Click <NavLink to={ROUTES.SIGN_UP}>here</NavLink> to sign up.</p>
        <div>
          <p>Username:</p>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <p>Password:</p>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
          <div className="button" onClick={() => props.signIn(username, password, onSuccessCallback, onFailureCallback)} role="button" tabIndex={0}>
            Sign In
          </div>
        </div>
      </div>
    </Fade>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (username, password, success, failure) => {
      dispatch(signIn(username, password, success, failure));
    },
  };
};


export default withRouter(connect(
  null,
  mapDispatchToProps,
)(SignIn));
