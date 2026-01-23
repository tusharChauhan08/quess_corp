# HRMS Lite - Deployment Instructions

## Overview
This document provides step-by-step instructions for deploying the HRMS Lite application to production.

## Prerequisites
- GitHub account
- Render account (for backend): https://render.com
- Vercel account (for frontend): https://vercel.com
- PostgreSQL database (Render provides free tier)

---

## Part 1: Create GitHub Repository

1. Create a new repository on GitHub: `quess_corp`
2. Clone to local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/quess_corp.git
   ```

3. Navigate to project directory and initialize git:
   ```bash
   cd quess_corp
   git add .
   git commit -m "Initial commit: HRMS Lite application"
   git push origin main
   ```

---

## Part 2: Deploy Backend to Render

1. **Create PostgreSQL Database on Render**
   - Go to https://render.com
   - Sign up / Login
   - Create New PostgreSQL Database
   - Note the Internal Database URL

2. **Deploy Backend Service**
   - Create New Web Service
   - Connect GitHub repository
   - Select `backend` as the root directory
   - Set Environment:
     ```
     DATABASE_URL=<your-database-internal-url>
     PYTHONUNBUFFERED=1
     ```
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - Deploy!

3. **Note the Backend URL**
   - Once deployed, you'll get a URL like: `https://quess-corp-api.onrender.com`
   - Save this for the frontend configuration

---

## Part 3: Deploy Frontend to Vercel

1. **Update Backend URL in Code (Optional)**
   - Update `frontend/src/api/client.js` if needed
   - Or set environment variable during deployment

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Import your `quess_corp` repository
   - Select `frontend` as the root directory
   - Set Environment Variables:
     ```
     REACT_APP_API_URL=https://quess-corp-api.onrender.com/api
     ```
   - Deploy!

3. **Get Frontend URL**
   - Vercel will provide a URL like: `https://quess-corp.vercel.app`

---

## Part 4: Verify Deployment

### Backend Health Check
```bash
curl https://quess-corp-api.onrender.com/api/health
# Expected response: {"status":"ok","message":"HRMS Lite API is running"}
```

### Frontend
Open https://quess-corp.vercel.app in browser and test:
- Navigate to Employees page
- Add a new employee
- View employee details
- Mark attendance

---

## Part 5: Production Configuration

### Security Updates

1. **Update CORS in Backend** (`backend/main.py`):
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://quess-corp.vercel.app"],  # Restrict to frontend URL
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific environment variable management
   - Rotate database credentials periodically

### Database Backups
- Set up automated backups on Render dashboard
- Monitor database usage

### Monitoring
- Enable error tracking on Render
- Monitor API performance
- Set up alerts for failures

---

## Troubleshooting

### Backend deployment fails
- Check Python version (3.8+)
- Verify all dependencies in `requirements.txt`
- Check DATABASE_URL environment variable

### Frontend can't connect to API
- Verify `REACT_APP_API_URL` in Vercel environment
- Check CORS settings on backend
- Verify backend is running

### Database connection errors
- Test database URL locally first
- Ensure PostgreSQL is accessible from Render
- Check firewall rules

---

## Deployment URLs (To be updated)

- **Live Frontend**: https://quess-corp.vercel.app
- **Live Backend API**: https://quess-corp-api.onrender.com/api
- **GitHub Repository**: https://github.com/YOUR_USERNAME/quess_corp

---

## Additional Resources

- Render Documentation: https://render.com/docs
- Vercel Documentation: https://vercel.com/docs
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment/
- React Deployment: https://create-react-app.dev/deployment/

---

## Support

For deployment issues, refer to:
1. Service provider documentation
2. Application logs
3. GitHub Issues
