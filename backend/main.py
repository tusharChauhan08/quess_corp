from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime, date
from typing import List

from database import engine, get_db, Base
from models import Employee, Attendance, AttendanceStatus
from schemas import (
    EmployeeCreate,
    EmployeeUpdate,
    EmployeeResponse,
    EmployeeWithAttendance,
    AttendanceCreate,
    AttendanceResponse,
    AttendanceStatusEnum,
)

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS Lite API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (can be restricted in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============== Employee Endpoints ==============


@app.post("/api/employees", response_model=EmployeeResponse, status_code=status.HTTP_201_CREATED)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    """Create a new employee"""
    # Check if employee_id already exists
    existing_emp_id = db.query(Employee).filter(
        Employee.employee_id == employee.employee_id
    ).first()
    if existing_emp_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee ID already exists"
        )

    # Check if email already exists
    existing_email = db.query(Employee).filter(
        Employee.email == employee.email
    ).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    db_employee = Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


@app.get("/api/employees", response_model=List[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    """Get all employees"""
    employees = db.query(Employee).order_by(Employee.created_at.desc()).all()
    return employees


@app.get("/api/employees/{employee_id}", response_model=EmployeeWithAttendance)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    """Get a specific employee with attendance records"""
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    return employee


@app.put("/api/employees/{employee_id}", response_model=EmployeeResponse)
def update_employee(
    employee_id: int,
    employee_update: EmployeeUpdate,
    db: Session = Depends(get_db)
):
    """Update an employee"""
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    # Check if new email is unique
    if employee_update.email and employee_update.email != employee.email:
        existing_email = db.query(Employee).filter(
            Employee.email == employee_update.email
        ).first()
        if existing_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists"
            )

    update_data = employee_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(employee, field, value)

    db.commit()
    db.refresh(employee)
    return employee


@app.delete("/api/employees/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    """Delete an employee"""
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    db.delete(employee)
    db.commit()
    return None


# ============== Attendance Endpoints ==============


@app.post("/api/employees/{employee_id}/attendance", response_model=AttendanceResponse, status_code=status.HTTP_201_CREATED)
def mark_attendance(
    employee_id: int,
    attendance: AttendanceCreate,
    db: Session = Depends(get_db)
):
    """Mark attendance for an employee"""
    # Verify employee exists
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    # Check if attendance already exists for this date
    existing_attendance = db.query(Attendance).filter(
        and_(
            Attendance.employee_id == employee_id,
            Attendance.date == attendance.date
        )
    ).first()

    if existing_attendance:
        # Update existing attendance
        existing_attendance.status = AttendanceStatus(attendance.status)
        existing_attendance.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(existing_attendance)
        return existing_attendance

    # Create new attendance record
    db_attendance = Attendance(
        employee_id=employee_id,
        date=attendance.date,
        status=AttendanceStatus(attendance.status)
    )
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance


@app.get("/api/employees/{employee_id}/attendance", response_model=List[AttendanceResponse])
def get_employee_attendance(
    employee_id: int,
    start_date: datetime = None,
    end_date: datetime = None,
    db: Session = Depends(get_db)
):
    """Get attendance records for an employee"""
    # Verify employee exists
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    query = db.query(Attendance).filter(Attendance.employee_id == employee_id)

    if start_date:
        query = query.filter(Attendance.date >= start_date.date())
    if end_date:
        query = query.filter(Attendance.date <= end_date.date())

    attendance_records = query.order_by(Attendance.date.desc()).all()
    return attendance_records


@app.get("/api/employees/{employee_id}/attendance/summary")
def get_attendance_summary(employee_id: int, db: Session = Depends(get_db)):
    """Get attendance summary for an employee"""
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )

    all_records = db.query(Attendance).filter(Attendance.employee_id == employee_id).all()
    present_days = sum(1 for record in all_records if record.status == AttendanceStatus.PRESENT)
    absent_days = sum(1 for record in all_records if record.status == AttendanceStatus.ABSENT)

    return {
        "employee_id": employee_id,
        "total_records": len(all_records),
        "present_days": present_days,
        "absent_days": absent_days
    }


# ============== Dashboard Endpoints ==============


@app.get("/api/dashboard/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    """Get dashboard summary"""
    total_employees = db.query(Employee).count()
    total_attendance_records = db.query(Attendance).count()

    return {
        "total_employees": total_employees,
        "total_attendance_records": total_attendance_records,
    }


# ============== Health Check ==============


@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "HRMS Lite API is running"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
