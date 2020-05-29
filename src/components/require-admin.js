import React from 'react';
import { connect } from 'react-redux';
import { ROUTES, LOCAL_STORAGE_TOKEN_KEY } from '../constants';

export default function (ComposedComponent) {
  class RequireAuth extends React.Component {
    componentDidMount() {
      // if not logged in, send home
      if ((localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) === null)
          || (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY).length === 0)) {
        this.props.history.push(ROUTES.HOME);
      }
    }

    componentWillUpdate(nextProps) {
      // if not logged in or not an admin, send home
      if ((Object.keys(nextProps.user).length > 0 && !nextProps.user.AdminUser)
        || (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) === null)
        || (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY).length === 0)) {
        nextProps.history.push(ROUTES.HOME);
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user.user,
    };
  };

  return connect(mapStateToProps, null)(RequireAuth);
}
