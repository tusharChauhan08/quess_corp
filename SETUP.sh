#!/bin/bash

# HRMS Lite - Deployment Guide

echo "===================================="
echo "HRMS Lite - Quick Start Guide"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}1. Setting up Backend...${NC}"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3.8+"
    exit 1
fi

# Navigate to backend
cd backend || exit

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo -e "${GREEN}✓ .env created. Please update it with your database credentials.${NC}"
fi

echo ""
echo -e "${GREEN}✓ Backend setup complete!${NC}"
echo ""

# Navigate to frontend
cd ../frontend || exit

echo -e "${BLUE}2. Setting up Frontend...${NC}"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js v14+"
    exit 1
fi

# Install dependencies
echo "Installing Node dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "REACT_APP_API_URL=http://localhost:8000/api" > .env
    echo -e "${GREEN}✓ Frontend .env created${NC}"
fi

echo ""
echo -e "${GREEN}✓ Frontend setup complete!${NC}"
echo ""

echo "===================================="
echo -e "${GREEN}Setup Complete!${NC}"
echo "===================================="
echo ""
echo "To start the application:"
echo ""
echo "1. Backend (in backend directory):"
echo "   - source venv/bin/activate  # Linux/Mac"
echo "   - venv\\Scripts\\activate     # Windows"
echo "   - uvicorn main:app --reload"
echo ""
echo "2. Frontend (in frontend directory, in new terminal):"
echo "   - npm start"
echo ""
echo "Application will be available at http://localhost:3000"
echo ""
