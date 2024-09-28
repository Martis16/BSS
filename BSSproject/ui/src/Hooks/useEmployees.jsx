import { useState, useEffect } from 'react';

const apiurl = import.meta.env.VITE_API_URL;

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const refreshList = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiurl);
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError('Error fetching employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employee) => {
    try {
      const response = await fetch(apiurl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      if (response.ok) {
        alert('Employee created successfully');
        refreshList();
      } else {
        alert(`Failed to create employee. Status: ${response.status}`);
        throw new Error('Failed to add employee');
      }
    } catch (err) {
        alert(`Failed to create employee. Status: ${response.status}`);
      setError(err.message);
    }
  };

  const updateEmployee = async (employee) => {
    try {
      const response = await fetch(`${apiurl}/${employee.EmployeeID}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      });
      if (response.ok) {
        alert('Employee updated successfully');
        refreshList();
      } else {
        alert(`Failed to update employee. Status: ${response.status}`);
        throw new Error('Failed to update employee');
      }
    } catch (err) {
        alert(`Failed to update employee. Status: ${response.status}`);
      setError(err.message);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${apiurl}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Employee deleted successfully');
        refreshList();
        
      } else {
        alert(`Failed to delete employee. Status: ${response.status}`);
        throw new Error('Failed to delete employee');
      }
    } catch (err) {
        alert(`Failed to delete employee. Status: ${response.status}`);
      setError(err.message);
    }
  };

  useEffect(() => {
    refreshList();
  }, []);

  return { employees, loading, error, addEmployee, updateEmployee, deleteEmployee };
};

export default useEmployees;
