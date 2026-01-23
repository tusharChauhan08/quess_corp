from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import date, datetime
from enum import Enum


class AttendanceStatusEnum(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"


class AttendanceCreate(BaseModel):
    date: date
    status: AttendanceStatusEnum


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    date: date
    status: AttendanceStatusEnum
    created_at: datetime

    class Config:
        from_attributes = True


class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., min_length=1, max_length=50)
    full_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    department: str = Field(..., min_length=1, max_length=50)


class EmployeeUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None


class EmployeeResponse(BaseModel):
    id: int
    employee_id: str
    full_name: str
    email: str
    department: str
    created_at: datetime

    class Config:
        from_attributes = True


class EmployeeWithAttendance(EmployeeResponse):
    attendance_records: List[AttendanceResponse] = []

    class Config:
        from_attributes = True
