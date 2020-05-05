import React, { useState } from 'react';

export default (props) => {
  const create = Object.keys(props.employee).length === 0;

  if (create && !props.isAdmin) {
    return null;
  }

  const [username, setUsername] = useState(create ? '' : props.employee.UserName);
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(create ? '' : props.employee.FirstName);
  const [lastName, setLastName] = useState(create ? '' : props.employee.LastName);
  const [salary, setSalary] = useState(create ? '' : props.employee.Salary);
  const [hireDate, setHireDate] = useState(create ? '' : props.employee.HireDate);
  const [adminUser, setAdminUser] = useState(create ? '' : props.employee.AdminUser);

  return (
    <div id="update-user-area">
      <h3>{create ? 'Create New User' : `Update fields for ${props.employee.UserName}`}</h3>
      <div id="fields-container">
        <div className="field-area">
          <p>Username:</p>
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        {create ? (
          <div className="field-area">
            <p>Password:</p>
            <input value={password} type="password" onChange={e => setPassword(e.target.value)} />
          </div>
        ) : null}
        <div className="field-area">
          <p>First Name:</p>
          <input value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div className="field-area">
          <p>Last Name:</p>
          <input value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        {props.isAdmin ? (
          <div>
            <div className="field-area">
              <p>Salary:</p>
              <input value={salary} onChange={e => setSalary(e.target.value)} />
            </div>
            <div className="field-area">
              <p>Hire Date:</p>
              <input value={hireDate} onChange={e => setHireDate(e.target.value)} />
            </div>
            <div className="checkbox-area">
              <input
                name="adminUser"
                type="checkbox"
                checked={adminUser}
                onChange={() => { setAdminUser(!adminUser); }}
              />
              <span>Admin User</span>
            </div>
          </div>
        ) : null}
      </div>
      <div id="button-area">
        {create ? (
          <button type="submit"
            onClick={() => {
              props.createEmployee({
                UserName: username,
                Password: password,
                FirstName: firstName,
                LastName: lastName,
                Salary: salary,
                HireDate: hireDate,
                AdminUser: adminUser,
              });
            }}
          >Create Employee
          </button>
        ) : (
          <div>
            <button type="submit"
              onClick={() => {
                props.updateEmployee({
                  UserName: username,
                  FirstName: firstName,
                  LastName: lastName,
                  Salary: salary,
                  HireDate: hireDate,
                  AdminUser: adminUser,
                });
              }}
            >Update Employee
            </button>
            {props.isAdmin ? (
              <button type="submit"
                onClick={() => {
                  props.deleteEmployee(username);
                }}
              >Delete Employee
              </button>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
