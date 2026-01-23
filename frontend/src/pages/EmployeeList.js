import React, { useState, useEffect } from 'react';
import { employeeAPI } from '../api/client';
import Modal from '../components/Modal';
import EmployeeForm from '../components/EmployeeForm';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeeAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (data) => {
    try {
      await employeeAPI.create(data);
      setSuccess('Employee added successfully');
      setShowModal(false);
      setTimeout(() => setSuccess(null), 3000);
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add employee');
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeAPI.delete(id);
        setSuccess('Employee deleted successfully');
        setTimeout(() => setSuccess(null), 3000);
        fetchEmployees();
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to delete employee');
      }
    }
  };

  return (
    <div>
      <div className="employee-list">
        <div className="list-header">
          <h2>Employees</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Employee
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {loading ? (
          <div className="loading">Loading employees...</div>
        ) : employees.length === 0 ? (
          <div className="empty-state">
            <h3>No Employees Yet</h3>
            <p>Add your first employee to get started</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Add Employee
            </button>
          </div>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.employee_id}</td>
                  <td>{emp.full_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>
                    <div className="table-actions">
                      <a href={`/employees/${emp.id}`} className="btn btn-secondary btn-sm">
                        View
                      </a>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteEmployee(emp.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <Modal title="Add New Employee" onClose={() => setShowModal(false)}>
          <EmployeeForm
            onSubmit={handleAddEmployee}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default EmployeeList;
