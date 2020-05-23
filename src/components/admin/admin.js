import React from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../state/actions';
import UserTable from './user-table';

import '../../styles/admin.scss';

class Admin extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    return (
      <div id="admin">
        <h3>Admin Portal</h3>
        <UserTable />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Admin);
