/* eslint-disable react/no-access-state-in-setstate */
import React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import { updateUser, createUser, deleteUser } from '../../state/actions';

class UserTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      create: false,
      editing: false,
    };

    this.rowRefs = [];
  }

    saveUserObjects = () => {
      this.rowRefs.forEach((ref, i) => {
        const oldUser = this.props.allUsers[i];
        const updatedUser = ref.current.getUpdatedUser();
        delete oldUser.SaltedPassword;

        if (!isEqual(updatedUser, this.props.allUsers[i])) {
          this.props.updateUser(updatedUser);
        }
      });
    };

    saveNewUser = () => {
      const newUser = this.rowRefs[this.rowRefs.length - 1].current.getUpdatedUser();
      this.props.createUser({ ...newUser, Password: 'password' }, false);
    };

    render() {
      if (this.props.allUsers.length === 0) {
        return null;
      }

      this.rowRefs = this.props.allUsers.map(() => React.createRef());

      return (
        <div id="all-users-area">
          <div id="icon-button-container">
            {!this.state.create ? (
              <div id="icon-area"
                role="button"
                tabIndex={0}
                onClick={() => { this.setState({ create: true }); this.rowRefs.push(React.createRef()); }}
              >
                <AddBoxIcon />
                <p>Create</p>
              </div>
            ) : (
              <div id="icon-area" role="button" tabIndex={0} onClick={() => { this.setState({ create: false }); this.saveNewUser(); }}>
                <SaveIcon />
                <p>Save</p>
              </div>
            )}
            <div id="icon-area"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (this.state.editing) this.saveUserObjects();
                else {
                  this.rowRefs.forEach((ref) => {
                    ref.current.updateStateForEdit();
                  });
                }

                this.setState({ editing: !this.state.editing });
              }}
            >
              {this.state.editing ? <SaveIcon /> : <EditIcon />}
              <p>{this.state.editing ? 'Save' : 'Edit'}</p>
            </div>
          </div>

          <table>
            <tr>
              {this.state.editing ? <th>Delete</th> : null}
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Account Created</th>
              <th>Admin User</th>
            </tr>
            {this.props.allUsers.map((user, i) => {
              return (
                <UserRow user={user}
                  isEditing={this.state.editing}
                  ref={this.rowRefs[i]}
                  deleteUser={this.props.deleteUser}
                  stopEditing={() => { this.setState({ editing: false, create: false }); }}
                />
              );
            })}
            {this.state.create ? (
              <UserRow user={{
                UserName: '',
                FirstName: '',
                LastName: '',
                AccountCreated: new Date(Date.now()).toISOString(),
                AdminUser: false,
              }}
                isEditing
                create
                ref={this.rowRefs[this.rowRefs.length - 1]}
              />
            ) : null}
            {this.state.create ? <p>New user password is: &quot;password&quot;</p> : null}
          </table>
        </div>
      );
    }
}

class UserRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.user.UserName,
      firstName: props.user.FirstName,
      lastName: props.user.LastName,
      accountCreated: props.user.AccountCreated,
      adminUser: props.user.AdminUser,
    };
  }

    getUpdatedUser = () => {
      return {
        UserName: this.state.username,
        FirstName: this.state.firstName,
        LastName: this.state.lastName,
        AccountCreated: this.state.accountCreated,
        AdminUser: this.state.adminUser,
      };
    }

    _deleteUser = () => {
      if (this.props.deleteUser) {
        this.props.deleteUser(this.props.user.UserName);
        this.props.stopEditing();
      }
    };

    updateStateForEdit = () => {
      this.setState({
        username: this.props.user.UserName,
        firstName: this.props.user.FirstName,
        lastName: this.props.user.LastName,
        accountCreated: this.props.user.AccountCreated,
        adminUser: this.props.user.AdminUser,
      });
    }

    render() {
      if (this.props.isEditing) {
        return (
          <tr>
            {!this.props.create ? <td><DeleteIcon onClick={this._deleteUser} /></td> : null}
            <td><input value={this.state.username} onChange={e => this.setState({ username: e.target.value })} /></td>
            <td><input value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })} /></td>
            <td><input value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} /></td>
            <td><input value={this.state.accountCreated} onChange={e => this.setState({ accountCreated: e.target.value })} /></td>
            <td><input value={this.state.adminUser} onChange={e => this.setState({ adminUser: e.target.value })} /></td>
          </tr>
        );
      } else {
        return (
          <tr>
            <td>{this.props.user.UserName}</td>
            <td>{this.props.user.FirstName}</td>
            <td>{this.props.user.LastName}</td>
            <td>{this.props.user.AccountCreated}</td>
            <td>{Boolean(this.props.user.AdminUser).toString()}</td>
          </tr>
        );
      }
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    allUsers: state.user.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user));
    },
    createUser: (fields, signInAfterCreate, success, failure) => {
      dispatch(createUser(fields, signInAfterCreate, success, failure));
    },
    deleteUser: (username) => {
      dispatch(deleteUser(username));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserTable);
