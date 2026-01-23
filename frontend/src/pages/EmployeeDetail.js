import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeAPI, attendanceAPI } from '../api/client';
import Modal from '../components/Modal';
import AttendanceForm from '../components/AttendanceForm';

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchEmployeeData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const empResponse = await employeeAPI.getById(id);
      setEmployee(empResponse.data);
      setAttendance(empResponse.data.attendance_records || []);

      const summaryResponse = await attendanceAPI.getSummary(id);
      setSummary(summaryResponse.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load employee data');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchEmployeeData();
  }, [id, fetchEmployeeData]);

  const handleMarkAttendance = async (data) => {
    try {
      await attendanceAPI.markAttendance(id, data);
      setSuccess('Attendance marked successfully');
      setShowModal(false);
      setTimeout(() => setSuccess(null), 3000);
      fetchEmployeeData();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to mark attendance');
    }
  };

  if (loading) {
    return <div className="loading">Loading employee details...</div>;
  }

  if (!employee) {
    return (
      <div className="empty-state">
        <h3>Employee Not Found</h3>
        <button className="btn btn-primary" onClick={() => navigate('/employees')}>
          Back to Employees
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="back-btn">
        <button className="link-button" onClick={() => navigate('/employees')}>
          ← Back to Employees
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="employee-detail">
        <div className="card">
          <div className="card-header">Employee Information</div>
          <div className="info-row">
            <span className="info-label">Employee ID:</span>
            <span className="info-value">{employee.employee_id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Full Name:</span>
            <span className="info-value">{employee.full_name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{employee.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Department:</span>
            <span className="info-value">{employee.department}</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Attendance Summary</div>
          {summary ? (
            <>
              <div className="info-row">
                <span className="info-label">Total Records:</span>
                <span className="info-value">{summary.total_records}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Present Days:</span>
                <span className="info-value" style={{ color: '#22543d' }}>
                  {summary.present_days}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Absent Days:</span>
                <span className="info-value" style={{ color: '#742a2a' }}>
                  {summary.absent_days}
                </span>
              </div>
            </>
          ) : (
            <p>No attendance data available</p>
          )}
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            + Mark Attendance
          </button>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">Attendance Records</div>
        {attendance.length === 0 ? (
          <p>No attendance records yet</p>
        ) : (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record.id}>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        record.status === 'Present'
                          ? 'badge-present'
                          : 'badge-absent'
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <Modal title="Mark Attendance" onClose={() => setShowModal(false)}>
          <AttendanceForm
            employeeId={id}
            onSubmit={handleMarkAttendance}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default EmployeeDetail;
