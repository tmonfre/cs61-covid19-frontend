import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/auth.scss';

import { signIn } from '../../state/actions';

const SignIn = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSuccessCallback = () => {
    props.history.push('/');
  };

  const onFailureCallback = (error) => {
    toast.error(error);
  };

  return (
    <Fade>
      <div id="sign-in-container">
        <ToastContainer />
        <h3>Sign In</h3>
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
