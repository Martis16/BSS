import React from "react";

const EmployeeList = ({ employees, handleEditClick, handleDeleteClick }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>EmployeeID</th>
        <th>FirstName</th>
        <th>LastName</th>
        <th>Title</th>
        <th>HireDate</th>
        <th>Options</th>
      </tr>
    </thead>
    <tbody>
      {employees.map((emp) => (
        <tr key={emp.EmployeeID}>
          <td>{emp.EmployeeID}</td>
          <td>{emp.FirstName}</td>
          <td>{emp.LastName}</td>
          <td>{emp.Title}</td>
          <td>{emp.HireDate ? emp.HireDate.substr(0, 10) : ""}</td>
          <td>
            <button
              className="btn btn-primary mr-1"
              onClick={() => handleEditClick(emp)}
              style={{ marginRight: "15px" }}
            >
              Edit
            </button>

            <button
              className="btn btn-danger mr-1"
              onClick={() => handleDeleteClick(emp.EmployeeID)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EmployeeList;
