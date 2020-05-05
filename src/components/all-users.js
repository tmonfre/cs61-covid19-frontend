import React from 'react';

export default (props) => {
  if (props.allUsers.length === 0) {
    return null;
  }

  return (
    <div id="all-users-area">
      <h3>All Users:</h3>
      <table>
        <tr>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Salary</th>
          <th>Hire Date</th>
          <th>Admin User</th>
          <th>Salted Password</th>
        </tr>
        {props.allUsers.map((user) => {
          return (
            <tr onClick={() => { props.handleRowClick(user); }}>
              <td>{user.UserName}</td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Salary}</td>
              <td>{user.HireDate}</td>
              <td>{Boolean(user.AdminUser).toString()}</td>
              <td>{user.SaltedPassword}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
