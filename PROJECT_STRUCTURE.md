# HRMS Lite - Project Structure & Documentation

## Project Overview

HRMS Lite is a lightweight Human Resource Management System built with React, FastAPI, and PostgreSQL. The application enables admins to manage employee records and track daily attendance.

**Key Features:**
- Employee Management (Add, View, Delete, Update)
- Attendance Tracking (Mark Present/Absent)
- Attendance Dashboard with Statistics
- Professional, Responsive UI
- RESTful API with comprehensive validation
- Production-ready code

**Tech Stack:**
- Frontend: React 18 + Axios
- Backend: FastAPI + SQLAlchemy
- Database: PostgreSQL
- Deployment: Vercel (Frontend) + Render (Backend)

---

## Directory Structure

```
quess_corp/
│
├── backend/                          # FastAPI Backend
│   ├── main.py                       # Main FastAPI application
│   ├── models.py                     # SQLAlchemy ORM models
│   ├── schemas.py                    # Pydantic validation schemas
│   ├── database.py                   # Database configuration
│   ├── requirements.txt               # Python dependencies
│   ├── .env.example                  # Environment template
│   ├── Procfile                      # Heroku/Render deployment config
│   └── render.yaml                   # Render deployment config
│
├── frontend/                         # React Frontend
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── Navbar.js            # Navigation component
│   │   │   ├── Modal.js             # Modal dialog component
│   │   │   ├── EmployeeForm.js      # Employee form component
│   │   │   └── AttendanceForm.js    # Attendance form component
│   │   │
│   │   ├── pages/                    # Page components
│   │   │   ├── Dashboard.js         # Dashboard page
│   │   │   ├── EmployeeList.js      # Employee list page
│   │   │   └── EmployeeDetail.js    # Employee detail page
│   │   │
│   │   ├── api/
│   │   │   └── client.js            # API client using Axios
│   │   │
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # Global styles
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Base styles
│   │
│   ├── public/
│   │   └── index.html               # HTML template
│   │
│   ├── package.json                 # Node.js dependencies
│   ├── vercel.json                  # Vercel deployment config
│   └── .env                         # Environment variables
│
├── README.md                         # Main project documentation
├── QUICKSTART.md                     # Quick start guide
├── DEPLOYMENT.md                     # Deployment instructions
├── SETUP.sh                          # Setup automation script
├── DOCKER.md                         # Docker configuration
├── start.sh                          # Start script
├── .gitignore                        # Git ignore rules
└── (This file)                       # Project structure documentation

```

---

## Backend Architecture

### Models (`models.py`)
Defines SQLAlchemy ORM models:

**Employee Model**
- id: Integer (Primary Key)
- employee_id: String (Unique)
- full_name: String
- email: String (Unique)
- department: String
- created_at: DateTime
- updated_at: DateTime
- Relationships: One-to-Many with Attendance

**Attendance Model**
- id: Integer (Primary Key)
- employee_id: Integer (Foreign Key)
- date: Date
- status: Enum (Present/Absent)
- created_at: DateTime
- updated_at: DateTime
- Relationships: Many-to-One with Employee

### Schemas (`schemas.py`)
Pydantic models for request/response validation:

- `EmployeeCreate`: Input validation for creating employees
- `EmployeeResponse`: Output format for employee data
- `EmployeeWithAttendance`: Employee with attendance records
- `AttendanceCreate`: Input validation for attendance
- `AttendanceResponse`: Output format for attendance data

### API Endpoints

**Employee Management**
- `POST /api/employees` - Create employee
- `GET /api/employees` - List all employees
- `GET /api/employees/{id}` - Get employee details
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

**Attendance Management**
- `POST /api/employees/{id}/attendance` - Mark attendance
- `GET /api/employees/{id}/attendance` - Get attendance records
- `GET /api/employees/{id}/attendance/summary` - Get summary stats

**Utilities**
- `GET /api/dashboard/summary` - Dashboard statistics
- `GET /api/health` - Health check

### Validation Features

1. **Employee ID**: Must be unique, non-empty
2. **Email**: Must be valid email format, unique
3. **Required Fields**: Full name, department are mandatory
4. **Attendance**: Only one record per employee per date
5. **Date Format**: ISO 8601 (YYYY-MM-DD)

---

## Frontend Architecture

### Components Hierarchy

```
App
├── Navbar
├── Dashboard (Page)
│   └── Stats Grid
├── EmployeeList (Page)
│   ├── Employee Table
│   ├── Modal
│   │   └── EmployeeForm
│   └── Delete Actions
└── EmployeeDetail (Page)
    ├── Employee Card
    ├── Summary Card
    │   └── AttendanceForm (Modal)
    └── Attendance Table
```

### Component Descriptions

**Navbar.js**
- Navigation bar with links to pages
- Active page indicator
- Branding

**Modal.js**
- Reusable modal dialog component
- Click-outside to close
- Customizable title and content

**EmployeeForm.js**
- Form for creating/editing employees
- Client-side validation
- Error display
- Submit handling

**AttendanceForm.js**
- Form for marking attendance
- Date picker
- Status dropdown (Present/Absent)
- Submit handling

**Dashboard.js**
- Overview page
- Display statistics
- Quick summary

**EmployeeList.js**
- Table view of all employees
- Add employee functionality
- Delete employee functionality
- View employee details

**EmployeeDetail.js**
- Employee information card
- Attendance summary statistics
- Attendance records table
- Mark attendance button

### API Client (`api/client.js`)

Axios-based API client with organized methods:

```javascript
employeeAPI: {
  getAll(), getById(id), create(data), update(id, data), delete(id)
}

attendanceAPI: {
  markAttendance(id, data), getByEmployee(id), getSummary(id)
}

dashboardAPI: {
  getSummary()
}
```

### Styling Approach

- CSS-in-file (`App.css`)
- BEM naming convention
- Mobile-responsive design
- Professional color scheme
- Consistent spacing and typography

---

## Database Schema

### Employees Table
```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    department VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Attendance Table
```sql
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(employee_id, date)
);
```

---

## API Response Examples

### Get All Employees
```json
{
  "data": [
    {
      "id": 1,
      "employee_id": "EMP001",
      "full_name": "John Doe",
      "email": "john@example.com",
      "department": "Engineering",
      "created_at": "2024-01-20T10:30:00"
    }
  ]
}
```

### Get Employee with Attendance
```json
{
  "id": 1,
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john@example.com",
  "department": "Engineering",
  "attendance_records": [
    {
      "id": 1,
      "employee_id": 1,
      "date": "2024-01-20",
      "status": "Present",
      "created_at": "2024-01-20T10:35:00"
    }
  ]
}
```

### Attendance Summary
```json
{
  "employee_id": 1,
  "total_records": 10,
  "present_days": 8,
  "absent_days": 2
}
```

### Dashboard Summary
```json
{
  "total_employees": 25,
  "total_attendance_records": 150
}
```

---

## Error Handling

### HTTP Status Codes Used

- `200 OK` - Successful GET/PUT request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Error Response Format

```json
{
  "detail": "Error message describing the issue"
}
```

---

## Configuration Files

### Backend Configuration

**.env**
```
DATABASE_URL=postgresql://user:password@localhost:5432/hrms_lite
```

**requirements.txt**
- FastAPI: Web framework
- Uvicorn: ASGI server
- SQLAlchemy: ORM
- psycopg2-binary: PostgreSQL adapter
- Pydantic: Data validation
- python-dotenv: Environment management

### Frontend Configuration

**.env**
```
REACT_APP_API_URL=http://localhost:8000/api
```

**package.json dependencies**
- React: UI framework
- React Router: Navigation
- Axios: HTTP client
- date-fns: Date utilities

---

## Deployment Configuration

### Backend (Render)
- `Procfile`: Process definition
- `render.yaml`: Render-specific configuration
- Environment variables: DATABASE_URL, PYTHONUNBUFFERED

### Frontend (Vercel)
- `vercel.json`: Vercel configuration
- Environment variables: REACT_APP_API_URL
- Automatic deployment on git push

---

## Security Considerations

### Current Implementation
- CORS enabled for all origins
- Basic validation of inputs
- SQL injection protection (SQLAlchemy ORM)
- XSS protection through React

### Production Recommendations
- Restrict CORS to specific origins
- Implement authentication
- Use HTTPS
- Add rate limiting
- Implement proper logging
- Regular security audits

---

## Performance Considerations

### Backend
- Database indexing on frequently queried fields
- Connection pooling
- Efficient query patterns

### Frontend
- React component lazy loading
- Memoization of expensive computations
- Optimized re-renders

---

## Development Workflow

### Local Development

1. **Start Backend**
   ```bash
   cd backend
   source venv/bin/activate
   uvicorn main:app --reload
   ```

2. **Start Frontend** (new terminal)
   ```bash
   cd frontend
   npm start
   ```

3. **Access Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Testing Flow

1. Create test employee
2. Verify employee appears in list
3. Navigate to employee detail
4. Mark attendance
5. Verify attendance appears in records
6. Check dashboard stats update

---

## File Size & Performance

- Backend: ~5KB core files
- Frontend: ~50KB bundled
- Database: Minimal (~100KB with test data)

---

## Future Enhancements

1. **Authentication & Authorization**
   - JWT-based auth
   - Role-based access control
   - Multiple admin support

2. **Features**
   - Leave management
   - Salary/Payroll
   - Performance reviews
   - Reporting engine

3. **UX Improvements**
   - Dark mode
   - Export to CSV/PDF
   - Bulk operations
   - Advanced filtering

4. **Infrastructure**
   - Caching layer (Redis)
   - Message queue (Celery)
   - Microservices architecture
   - Database replication

---

## Support & Resources

- **Documentation**: README.md, QUICKSTART.md, DEPLOYMENT.md
- **API Documentation**: http://localhost:8000/docs (Swagger UI)
- **GitHub**: https://github.com/YOUR_USERNAME/quess_corp
- **Issues**: GitHub Issues tracker

---

**Last Updated**: January 23, 2025
**Version**: 1.0.0
**Status**: Production Ready
