# Quick Start - Run Locally

## Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL 12+
- Git

## Step 1: Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/quess_corp.git
cd quess_corp
```

## Step 2: Setup Backend

### Create Virtual Environment
```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Setup Database
```bash
# Update .env with your PostgreSQL credentials
# Example: postgresql://user:password@localhost:5432/hrms_lite
cp .env.example .env
nano .env  # Edit with your database credentials
```

### Run Backend
```bash
uvicorn main:app --reload
```

Backend will run at: `http://localhost:8000`

API Documentation available at: `http://localhost:8000/docs`

## Step 3: Setup Frontend (New Terminal)

```bash
cd frontend
npm install
```

### Create Environment File
```bash
echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
```

### Run Frontend
```bash
npm start
```

Frontend will open at: `http://localhost:3000`

## Step 4: Test the Application

### 1. Add an Employee
- Go to Employees page
- Click "Add Employee"
- Fill in details:
  - Employee ID: EMP001
  - Full Name: John Doe
  - Email: john@example.com
  - Department: Engineering

### 2. View Employee
- Click "View" on the employee
- See employee details

### 3. Mark Attendance
- On employee detail page
- Click "Mark Attendance"
- Select date and status
- Click "Mark Attendance"

### 4. Dashboard
- Go to Dashboard
- See total employees and attendance records

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 8000 (backend)
# On Linux/Mac:
lsof -ti:8000 | xargs kill -9

# On Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Database Connection Error
```
Error: could not connect to server

Solution:
1. Ensure PostgreSQL is running
2. Check username/password in .env
3. Create database if it doesn't exist:
   createdb hrms_lite
```

### Module Not Found
```bash
# Reinstall dependencies
pip install -r requirements.txt
npm install
```

### CORS Errors
- Ensure backend is running
- Check REACT_APP_API_URL in frontend .env

## Development Tips

### Backend Debugging
```bash
# Check database tables
psql -U username -d hrms_lite -c "\dt"

# View API documentation
http://localhost:8000/docs
```

### Frontend Debugging
- Open browser DevTools (F12)
- Check Network tab for API calls
- Check Console for errors

---

**Need Help?** Check README.md for more information.
