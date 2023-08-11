import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({});
  const [editedEmployee, setEditedEmployee] = useState({});
  const [deletedEmployeeId, setDeletedEmployeeId] = useState('');
  
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/getemp');
      setEmployees(response.data.emp);
    } catch (error) {
      console.error(error);
    }
  };

  const createEmployee = async () => {
    try {
      const response = await axios.post('/api/create', newEmployee);
      console.log(response.data.newData); // Newly created employee data
      setNewEmployee({});
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async () => {
    try {
      const response = await axios.delete(`/api/deleteemp/${deletedEmployeeId}`);
      console.log(response.data.deletedata); // Deleted employee data
      setDeletedEmployeeId('');
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  const editEmployee = async () => {
    try {
      const response = await axios.put(`/api/edit/${editedEmployee._id}`, editedEmployee);
      console.log(response.data.newData); // Edited employee data
      setEditedEmployee({});
      fetchEmployees();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee Management</h1>
      <h2>Create Employee</h2>
      <input
        type="text"
        placeholder="Employee Name"
        value={newEmployee.name || ''}
        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
      />
      <button onClick={createEmployee}>Create</button>

      <h2>Edit Employee</h2>
      <input
        type="text"
        placeholder="Employee Name"
        value={editedEmployee.name || ''}
        onChange={(e) => setEditedEmployee({ ...editedEmployee, name: e.target.value })}
      />
      <button onClick={editEmployee}>Edit</button>

      <h2>Delete Employee</h2>
      <input
        type="text"
        placeholder="Employee ID"
        value={deletedEmployeeId}
        onChange={(e) => setDeletedEmployeeId(e.target.value)}
      />
      <button onClick={deleteEmployee}>Delete</button>

      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeComponent;
