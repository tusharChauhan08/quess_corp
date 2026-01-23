import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../api/client';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    total_employees: 0,
    total_attendance_records: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardAPI.getSummary();
      setSummary(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to HRMS Lite - Your Human Resource Management System</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <div className="number">{summary.total_employees}</div>
        </div>
        <div className="stat-card">
          <h3>Total Attendance Records</h3>
          <div className="number">{summary.total_attendance_records}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Quick Stats</div>
        <p>
          You have <strong>{summary.total_employees}</strong> employees in the system and{' '}
          <strong>{summary.total_attendance_records}</strong> attendance records.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Navigate to the <strong>Employees</strong> section to manage employees and track attendance.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
