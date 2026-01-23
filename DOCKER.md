# Docker configuration for HRMS Lite

## Frontend Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

## Backend Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Docker Compose

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: hrms_user
      POSTGRES_PASSWORD: hrms_password
      POSTGRES_DB: hrms_lite
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://hrms_user:hrms_password@db:5432/hrms_lite
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: http://localhost:8000/api
    depends_on:
      - backend

volumes:
  postgres_data:
```

## Run with Docker Compose

```bash
docker-compose up
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 8000
- Frontend on port 3000
```

## Notes

- Docker configuration provided but not required
- Useful for containerized deployment
- Ensure Docker and Docker Compose are installed
