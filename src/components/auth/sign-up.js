import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../styles/auth.scss';

import { createUser } from '../../state/actions';

const SignUp = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSuccessCallback = () => {
    props.history.push('/');
  };

  const onFailureCallback = (error) => {
    toast.error(JSON.stringify(error));
  };

  const signUp = () => {
    if (password !== confirmPassword) {
      toast.error('Passwords must match');
    } else {
      const fields = {
        UserName: username,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
      };

      props.createUser(fields, true, onSuccessCallback, onFailureCallback);
    }
  };

  return (
    <div id="sign-in-container">
      <ToastContainer />
      <h3>Sign Up</h3>
      <div>
        <p>Username:</p>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <p>Password:</p>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <p>Confirm Password:</p>
        <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" />
        <p>First Name:</p>
        <input value={firstName} onChange={e => setFirstName(e.target.value)} />
        <p>Last Name:</p>
        <input value={lastName} onChange={e => setLastName(e.target.value)} />
        <div className="button" onClick={signUp} role="button" tabIndex={0}>
          Sign Up
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (fields, signInAfterCreate, success, failure) => {
      dispatch(createUser(fields, signInAfterCreate, success, failure));
    },
  };
};


export default withRouter(connect(
  null,
  mapDispatchToProps,
)(SignUp));
