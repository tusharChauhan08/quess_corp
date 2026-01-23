import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee API calls
export const employeeAPI = {
  getAll: () => api.get('/employees'),
  getById: (id) => api.get(`/employees/${id}`),
  create: (data) => api.post('/employees', data),
  update: (id, data) => api.put(`/employees/${id}`, data),
  delete: (id) => api.delete(`/employees/${id}`),
};

// Attendance API calls
export const attendanceAPI = {
  markAttendance: (employeeId, data) => api.post(`/employees/${employeeId}/attendance`, data),
  getByEmployee: (employeeId, startDate, endDate) =>
    api.get(`/employees/${employeeId}/attendance`, {
      params: { start_date: startDate, end_date: endDate },
    }),
  getSummary: (employeeId) => api.get(`/employees/${employeeId}/attendance/summary`),
};

// Dashboard API calls
export const dashboardAPI = {
  getSummary: () => api.get('/dashboard/summary'),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
