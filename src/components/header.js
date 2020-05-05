import React from 'react';

export default (props) => {
  let welcomeMessage = 'Login to Proceed';

  if (props.authed && props.currentUser && props.currentUser.UserName) {
    welcomeMessage = `Welcome ${props.currentUser.UserName}!`;
  } else if (props.authed) {
    welcomeMessage = 'Welcome!';
  }

  return (
    <header>
      <h3>{welcomeMessage}</h3>

      {props.authed ? (
        <div id="sign-out-button" onClick={props.signOut} role="button" tabIndex={0}>
          <p>Sign Out</p>
        </div>
      ) : null}
    </header>
  );
};
