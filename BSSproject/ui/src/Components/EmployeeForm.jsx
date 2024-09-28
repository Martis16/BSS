import React, { useState } from 'react';

const EmployeeForm = ({modalTitle, employee, handleInputChange, handleSubmit, setShowModal}) => {

  const [errors, setErrors] = useState({});

  const handleFormSubmit = () => {
      handleSubmit();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-row bd-highlight mb-3">
              <div className="p-2 w-50 bd-highlight">
                {[
                  { field: 'FirstName', maxLength: 10 },
                  { field: 'LastName', maxLength: 20 },
                  { field: 'Title', maxLength: 30 },
                  { field: 'TitleOfCourtesy', maxLength: 25 },
                  { field: 'BirthDate', type: 'date' },
                  { field: 'HireDate', type: 'date' },
                  { field: 'Address', maxLength: 60 },
                  { field: 'City', maxLength: 15 },
                  { field: 'Region', maxLength: 15 },
                  { field: 'PostalCode', maxLength: 10 },
                  { field: 'Country', maxLength: 15 },
                  { field: 'HomePhone', maxLength: 24 },
                  { field: 'Extension', maxLength: 4 },
                ].map(({ field, type = 'text', maxLength }) => (
                  <div className="input-group mb-3" key={field}>
                    <span className="input-group-text">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <input
                      type={type}
                      className="form-control"
                      name={field}
                      value={employee[field] || ''}
                      onChange={handleInputChange}
                      maxLength={maxLength}
                    />
                    {errors[field] && (
                      <div className="text-danger">{errors[field]}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-2 w-50 bd-highlight">
                <div className="input-group mb-3">
                  <span className="input-group-text">Notes</span>
                  <textarea
                    className="form-control"
                    name="Notes"
                    value={employee.Notes || ''}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Reports To</span>
                  <input
                    type="number"
                    className="form-control"
                    name="ReportsTo"
                    value={employee.ReportsTo || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFormSubmit}
            >
              {employee.EmployeeID === 0 ? 'Create' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
