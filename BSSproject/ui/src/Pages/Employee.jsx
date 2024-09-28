import React, { useState } from 'react';
import EmployeeList from '../Components/EmployeeList';
import EmployeeForm from '../Components/EmployeeForm';
import useEmployees from '../Hooks/useEmployees';

const photourl = import.meta.env.VITE_PHOTOS_URL;

const Employee = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [modalTitle, setModalTitle] = useState('');
  const [showModal, setShowModal] = useState(false);

  const initialEmployeeState = {
    EmployeeID: 0,
    LastName: '',
    FirstName: '',
    Title: '',
    TitleOfCourtesy: '',
    BirthDate: '',
    HireDate: '',
    Address: '',
    City: '',
    Region: '',
    PostalCode: '',
    Country: '',
    HomePhone: '',
    Extension: '',
    PhotoPath: photourl,
    Notes: '',
    ReportsTo: null,
    Photo: null,
  };
  const [employee, setEmployee] = useState(initialEmployeeState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    setEmployee(initialEmployeeState);
    setModalTitle('Add Employee');
    setShowModal(true);
  };

  const handleEditClick = (emp) => {
    setEmployee({
      ...emp,
      BirthDate: emp.BirthDate ? emp.BirthDate.substr(0, 10) : '',
      HireDate: emp.HireDate ? emp.HireDate.substr(0, 10) : '',
    });
    setModalTitle('Edit Employee');
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (employee.EmployeeID === 0) {
        await addEmployee(employee);
      } else {
        await updateEmployee(employee);
        
      }
      setShowModal(false);
    } catch (error) {
        if (employee.EmployeeID === 0){
            alert(`Failed to create employee.`);
        }else{
           alert(`Failed to update employee.`); 
        }
    }
  };


  const handleDeleteClick = async (id) => {
    try{
        if (window.confirm('Are you sure?')) {
            await deleteEmployee(id);
        }
    }catch(error){
        alert(`Failed to delete employee.`);
    }
  };

  return (
    <div>
      <button className="btn btn-primary m-2 float-end" onClick={handleAddClick}>
        Add Employee
      </button>
      <EmployeeList
        employees={employees}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />
      {showModal && (
        <EmployeeForm
          modalTitle={modalTitle}
          employee={employee}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default Employee;
