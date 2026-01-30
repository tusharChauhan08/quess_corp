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
# HRMS Lite

Live Frontend: https://quess-corp-h55ko121r-tusharchauhan08s-projects.vercel.app/

Live Backend (API docs): https://quess-corp.onrender.com/docs

HRMS Lite is a compact human resources web app that helps small teams track employees and daily attendance. It combines a React single-page app with a FastAPI backend and a relational database.

## Quick start (local)

### Backend
1. Create and activate a Python virtualenv in `backend/`.
2. Install dependencies: `pip install -r backend/requirements.txt`.
3. Set `DATABASE_URL` in a `.env` file if you want Postgres; otherwise the app will use a local SQLite file.
4. Run: `python3 backend/main.py` or `uvicorn main:app --reload --host 0.0.0.0 --port 8000`.

### Frontend
1. `cd frontend` and run `npm install`.
2. Set `REACT_APP_API_URL` (or `VITE_API_BASE_URL`) to your backend URL if needed.
3. Run `npm start` for development or `npm run build` to create a production bundle.

## Deployment notes

- Frontend: Vercel is recommended for quick hosting of the static app. Point the project to the `frontend` folder and set the environment variable for the API URL.
- Backend: Railway (or Supabase/Render/Fly) works well. Provide a `DATABASE_URL` environment variable for a managed Postgres instance and set the start command to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
- Docker: A `Dockerfile` and an example `docker-compose.yml` can be used to run Postgres + backend + frontend locally for testing.

## API highlights

- `GET /api/employees` — list employees
- `POST /api/employees` — create employee
- `GET /api/employees/{id}` — employee details (includes attendance)
- `POST /api/employees/{id}/attendance` — mark attendance
- `GET /api/employees/{id}/attendance/summary` — attendance summary
- `GET /api/dashboard/summary` — simple site metrics

## Notes

- The project includes a lightweight SQLite fallback to simplify local testing. For production, use Postgres and set `DATABASE_URL`.
- The backend creates tables on startup (`Base.metadata.create_all(bind=engine)`) if the DB user has sufficient privileges.
- CORS is permissive by default; lock it down before production.

## Credits

Built and maintained by the project author. If you need help deploying or extending the app, open an issue or contact the maintainer.

---

This README contains the essential setup and deployment notes. Other markdown files in the repository were removed to keep the project tidy.
4. Start the development server
