import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactModal from 'react-modal';

import * as apiRequests from './services/api-requests';
import apiLogin from './services/api-login';

import Header from './components/header';
import Login from './components/login';
import AllUsers from './components/all-users';
import PopupContent from './components/popup-content';

import './styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // try to grab token and username from local storage
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || '',
      authed: false,
      currentUser: {},
      allUsers: [],
      popupVisible: false,
      popupUser: {},
    };
  }

  componentDidMount() {
    // check to see if we have a token available
    if (this.state.token.length > 0) {
      this.getEmployeeData();
      this.getAllEmployeeData();
    }
  }

  // sign user in, store token and username, then grab data
  signIn = (username, password) => {
    // login with api
    apiLogin(username, password)
      .then((token) => {
        this.setState({
          token,
          username,
        }, () => {
          // store auth token
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);

          // request data
          this.getEmployeeData();
          this.getAllEmployeeData();
        });
      })
      .catch((error) => {
        // toast error
        if (error.error && error.error.error && error.error.error.message) {
          toast.error(error.error.error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (error.response) {
          toast.error(error.response, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(JSON.stringify(error), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  }

  // sign user out, clear state and local storage
  signOut = () => {
    this.setState({
      token: '',
      username: '',
      authed: false,
      currentUser: {},
      allUsers: [],
      popupVisible: false,
      popupUser: {},
    });

    localStorage.clear();
  }

  // get data on this employee
  getEmployeeData = () => {
    apiRequests.getEmployeeByUsername(this.state.token, this.state.username)
      .then((user) => {
        this.setState({
          currentUser: user,
          authed: true,
        });
      })
      .catch((error) => {
        // toast error
        if (error.error && error.error.message) {
          toast.error(error.error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (error.response) {
          toast.error(error.response, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(JSON.stringify(error), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  }

  // get all data on all employees
  getAllEmployeeData = () => {
    apiRequests.getAllEmployees(this.state.token, this.state.username)
      .then((response) => {
        this.setState({
          allUsers: response,
        });
      })
      .catch((error) => {
        // toast error
        if (error.error && error.error.message) {
          toast.error(error.error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (error.response) {
          toast.error(error.response, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(JSON.stringify(error), {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
  }

  // update specific user
  updateEmployee = (fields) => {
    this.setState({
      popupVisible: false,
      popupUser: {},
    });

    apiRequests.updateEmployee(this.state.token, fields.UserName, fields)
      .then(() => {
        toast.success('Successfully updated user', {
          position: toast.POSITION.TOP_RIGHT,
        });

        // refresh data
        this.getAllEmployeeData();
        this.getEmployeeData();
      })
      .catch((error) => {
        // toast error
        toast.error(JSON.stringify(error), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  // create employee in database
  createEmployee = (fields) => {
    this.setState({
      popupVisible: false,
      popupUser: {},
    });

    apiRequests.createEmployee(this.state.token, fields)
      .then(() => {
        toast.success('Successfully created user', {
          position: toast.POSITION.TOP_RIGHT,
        });

        // refresh data
        this.getAllEmployeeData();
        this.getEmployeeData();
      })
      .catch((error) => {
        // toast error
        toast.error(JSON.stringify(error), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  // delete an employee from the database
  deleteEmployee = (username) => {
    this.setState({
      popupVisible: false,
      popupUser: {},
    });

    apiRequests.deleteEmployee(this.state.token, username)
      .then(() => {
        toast.success('Successfully deleted user', {
          position: toast.POSITION.TOP_RIGHT,
        });

        // refresh data
        this.getAllEmployeeData();
        this.getEmployeeData();
      })
      .catch((error) => {
        // toast error
        toast.error(JSON.stringify(error), {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  // set modal data
  openModal = (employee) => {
    this.setState({
      popupVisible: true,
      popupUser: employee,
    });
  };

  // clear modal data
  closeModal = () => {
    this.setState({
      popupVisible: false,
      popupUser: {},
    });
  }

  render() {
    return (
      <div id="content">
        <h2>CS 61 Lab 3</h2>
        <ToastContainer />
        <Header authed={this.state.authed} currentUser={this.state.currentUser} signOut={this.signOut} />
        <Login authed={this.state.authed} currentUser={this.state.currentUser} signIn={this.signIn} handleRowClick={this.openModal} />
        <AllUsers allUsers={this.state.allUsers} handleRowClick={this.openModal} />
        {this.state.currentUser.AdminUser ? (
          <button type="submit"
            id="create-employee-button"
            onClick={() => {
              this.setState({
                popupVisible: true,
                popupUser: {},
              });
            }}
          >Create New Employee
          </button>
        ) : null}
        <ReactModal
          isOpen={this.state.popupVisible}
          onRequestClose={this.closeModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <PopupContent
            isAdmin={this.state.currentUser.AdminUser}
            employee={this.state.popupUser}
            updateEmployee={this.updateEmployee}
            createEmployee={this.createEmployee}
            deleteEmployee={this.deleteEmployee}
          />
        </ReactModal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
