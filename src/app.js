import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOCAL_STORAGE_TOKEN_KEY, ROUTES, LOCAL_STORAGE_USERNAME_KEY } from './constants';

import { getUser, getStates, getCounties } from './state/actions';

import Home from './components/home';
import SignIn from './components/auth/sign-in';
import SignUp from './components/auth/sign-up';

import NavBar from './components/navbar';

const FallBack = () => {
  return <div>URL not found</div>;
};

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);

    // load data if token exists
    if (token && token.length > 0 && username && username.length > 0) {
      this.props.getUser(token, username);
    }

    this.props.getStates();
    this.props.getCounties();
  }

  render() {
    console.log(this.props.state);
    return (
      <Router>
        <div id="content">
          <NavBar />
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.STATE} component={Home} />
            <Route path={ROUTES.LOGIN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (token, username) => {
      dispatch(getUser(token, username));
    },
    getStates: () => {
      dispatch(getStates());
    },
    getCounties: () => {
      dispatch(getCounties());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
