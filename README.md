# HRMS Lite - Human Resource Management System

A lightweight, full-stack Human Resource Management System built with React, FastAPI, and PostgreSQL.

## 🚀 Features

- **Employee Management**
  - Add new employees with unique Employee IDs
  - View all employees in a professional table layout
  - Delete employees
  - Update employee information

- **Attendance Management**
  - Mark daily attendance (Present/Absent)
  - View attendance records per employee
  - Attendance summary with statistics
  - Filter attendance by date range

- **Dashboard**
  - Quick overview of total employees and attendance records
  - Professional UI with clean design
  - Responsive layout

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling (no external CSS framework)

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **PostgreSQL** - Relational database

## 📋 Prerequisites

- Node.js (v14+)
- Python (v3.8+)
- PostgreSQL (v12+)
- Git

## 🏃 Getting Started Locally

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/quess_corp.git
cd quess_corp/backend
```

2. Create a virtual environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your PostgreSQL connection string
# Example: postgresql://user:password@localhost:5432/hrms_lite
```

5. Create database tables
```bash
python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"
```

6. Run the server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```bash
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
```

4. Start the development server
```bash
npm start
```

Frontend will be available at `http://localhost:3000`

## 📦 Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `PYTHONUNBUFFERED`: 1
5. Build command: `pip install -r requirements.txt`
6. Start command: `uvicorn main:app --host 0.0.0.0 --port 8000`

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Import project from Vercel dashboard
3. Set environment variables:
   - `REACT_APP_API_URL`: Your deployed backend API URL
4. Deploy!

## 🔌 API Endpoints

### Employees
- `GET /api/employees` - List all employees
- `GET /api/employees/{id}` - Get employee details
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### Attendance
- `POST /api/employees/{id}/attendance` - Mark attendance
- `GET /api/employees/{id}/attendance` - Get attendance records
- `GET /api/employees/{id}/attendance/summary` - Get attendance summary

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard statistics
- `GET /api/health` - Health check

## 📝 Project Structure

```
quess_corp/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── models.py         # SQLAlchemy models
│   ├── schemas.py        # Pydantic schemas
│   ├── database.py       # Database configuration
│   ├── requirements.txt   # Python dependencies
│   ├── .env.example       # Environment variables template
│   └── Procfile           # Deployment configuration
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API client
│   │   ├── App.js         # Main app component
│   │   └── App.css        # Global styles
│   ├── public/            # Static files
│   ├── package.json       # Node dependencies
│   └── vercel.json        # Vercel deployment config
└── .gitignore
```

## ✅ Testing

### Backend API Testing
```bash
# Using curl
curl http://localhost:8000/api/employees

# Using Python requests
python -c "import requests; print(requests.get('http://localhost:8000/api/employees').json())"
```

### Frontend Testing
- Open `http://localhost:3000` in browser
- Navigate through Dashboard and Employees pages
- Test adding, viewing, and deleting employees
- Test marking attendance

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL in .env file
- Check PostgreSQL credentials

### CORS Errors
- Backend CORS is configured to allow all origins (*)
- Adjust `allow_origins` in `main.py` for production

### API Connection Issues
- Verify `REACT_APP_API_URL` in frontend .env
- Check backend is running and accessible
- Review browser console for detailed errors

## 📋 Limitations & Assumptions

1. **No Authentication**: System assumes single admin user
2. **No Email Validation**: Email uniqueness is enforced but not validated via confirmation
3. **Single Admin**: No multi-user or role-based access control
4. **Date Format**: Uses ISO 8601 date format (YYYY-MM-DD)
5. **Timezone**: All dates stored in UTC
6. **File Uploads**: Not supported
7. **Bulk Operations**: Individual employee operations only

## 🎁 Bonus Features Implemented

- ✅ Attendance filtering by date range
- ✅ Display total present/absent days per employee
- ✅ Dashboard with employee and attendance counts
- ✅ Attendance summary statistics
- ✅ Professional, responsive UI design
- ✅ Error handling and validation
- ✅ Loading and empty states

## 🔒 Security Notes

For production deployment:
1. Remove `allow_origins=["*"]` from CORS configuration
2. Add proper authentication/authorization
3. Use environment variables for sensitive data
4. Enable HTTPS
5. Add rate limiting
6. Implement proper error logging

## 📄 License

This project is provided as-is for educational purposes.

## 🤝 Support

For issues or questions, please refer to the GitHub repository or contact the development team.

---

**Demo Application**: [Deploy URL will be updated after deployment]

**GitHub Repository**: [https://github.com/YOUR_USERNAME/quess_corp](https://github.com/YOUR_USERNAME/quess_corp)

**Live Backend API**: [Backend Deploy URL will be updated]

**Live Frontend**: [Frontend Deploy URL will be updated]
