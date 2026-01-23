#!/bin/bash

# Start script for HRMS Lite

echo "Starting HRMS Lite Application..."
echo ""

# Check if backend is already running
if ! nc -z localhost 8000 2>/dev/null; then
    echo "Starting Backend..."
    cd backend
    
    # Activate virtual environment if it exists
    if [ -d "venv" ]; then
        source venv/bin/activate 2>/dev/null || . venv/Scripts/activate
    fi
    
    uvicorn main:app --reload &
    BACKEND_PID=$!
    cd ..
    
    echo "Backend started with PID: $BACKEND_PID"
    sleep 3
else
    echo "Backend already running on port 8000"
fi

echo ""

# Check if frontend is already running
if ! nc -z localhost 3000 2>/dev/null; then
    echo "Starting Frontend..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    cd ..
    
    echo "Frontend started with PID: $FRONTEND_PID"
else
    echo "Frontend already running on port 3000"
fi

echo ""
echo "=========================================="
echo "HRMS Lite is running!"
echo "=========================================="
echo ""
echo "Frontend:  http://localhost:3000"
echo "Backend:   http://localhost:8000"
echo "API Docs:  http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop"
