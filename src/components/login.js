import React, { useState } from 'react';

export default (props) => {
  if (props.authed) {
    if (props.currentUser) {
      return (
        <div id="current-user-area"
          role="button"
          tabIndex={0}
          onClick={() => { props.handleRowClick(props.currentUser); }}
        >
          <h3>Current User:</h3>
          <div id="user-data-area">
            <p>{`Username: ${props.currentUser.UserName}`}</p>
            <p>{`First Name: ${props.currentUser.FirstName}`}</p>
            <p>{`Last Name: ${props.currentUser.LastName}`}</p>
            <p>{`Salary: ${props.currentUser.Salary}`}</p>
            <p>{`Hire Date: ${props.currentUser.HireDate}`}</p>
            {props.currentUser.AdminUser ? <p>Admin User</p> : null}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id="email-area">
      <div>
        <div>
          <p>Username:</p>
          <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); }} />
          <br />
        </div>

        <div>
          <p>Password:</p>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); }} />
          <br />
        </div>
      </div>

      <button type="submit"
        id="sign-in-button"
        onClick={() => {
          props.signIn(username, password);
        }}
      >Sign In
      </button>
    </div>
  );
};
