# Pre-Deployment Checklist

## Before Going Live

### Backend Checklist

- [ ] **Database**
  - [ ] PostgreSQL instance created
  - [ ] Database name: `hrms_lite`
  - [ ] User credentials secured
  - [ ] Connection string verified

- [ ] **Code Review**
  - [ ] No hardcoded secrets
  - [ ] Environment variables configured
  - [ ] Error handling in place
  - [ ] API validation complete

- [ ] **Requirements**
  - [ ] All dependencies in `requirements.txt`
  - [ ] No unused imports
  - [ ] Version compatibility verified

- [ ] **Testing**
  - [ ] API endpoints tested locally
  - [ ] Database operations tested
  - [ ] Error responses verified
  - [ ] CORS configuration tested

- [ ] **Deployment**
  - [ ] Render account ready
  - [ ] GitHub repository accessible
  - [ ] Build command working
  - [ ] Start command verified

### Frontend Checklist

- [ ] **Code Quality**
  - [ ] No console errors
  - [ ] No missing dependencies
  - [ ] No hardcoded API URLs
  - [ ] Components tested

- [ ] **Build**
  - [ ] `npm run build` succeeds
  - [ ] Build output is optimized
  - [ ] No build warnings

- [ ] **Configuration**
  - [ ] `.env` variables set correctly
  - [ ] API URL points to backend
  - [ ] No sensitive data in code

- [ ] **Testing**
  - [ ] All pages load
  - [ ] Forms validate
  - [ ] API calls work
  - [ ] Error states display
  - [ ] Loading states display

- [ ] **Deployment**
  - [ ] Vercel account ready
  - [ ] GitHub repository accessible
  - [ ] Environment variables configured

### General Checklist

- [ ] **GitHub Repository**
  - [ ] Code committed
  - [ ] Meaningful commit messages
  - [ ] README.md complete
  - [ ] .gitignore configured
  - [ ] All files tracked

- [ ] **Documentation**
  - [ ] README updated with deployment URLs
  - [ ] QUICKSTART.md instructions verified
  - [ ] DEPLOYMENT.md instructions clear
  - [ ] API documentation ready

- [ ] **Security**
  - [ ] No secrets in repository
  - [ ] .env files are .gitignore'd
  - [ ] CORS properly configured
  - [ ] Input validation in place

- [ ] **Monitoring**
  - [ ] Error logging enabled
  - [ ] Performance metrics ready
  - [ ] Database backups configured
  - [ ] Alerts set up

## Deployment Steps

### 1. GitHub Repository
```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit: HRMS Lite"

# Create repository on GitHub
# Then:
git remote add origin https://github.com/YOUR_USERNAME/quess_corp.git
git branch -M main
git push -u origin main
```

### 2. Deploy Backend to Render

1. Go to https://render.com
2. Create PostgreSQL database:
   - Note the Internal Database URL
   - Save external connection details for backup

3. Create Web Service:
   - Select GitHub repository
   - Set root directory to `/backend`
   - Environment Variables:
     ```
     DATABASE_URL=<internal-database-url>
     PYTHONUNBUFFERED=1
     ```
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port 8000`

4. Deploy and note the URL (e.g., `https://quess-corp-api.onrender.com`)

### 3. Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Import project from GitHub
3. Select root directory: `/frontend`
4. Environment Variables:
   ```
   REACT_APP_API_URL=https://quess-corp-api.onrender.com/api
   ```
5. Deploy and note the URL (e.g., `https://quess-corp.vercel.app`)

### 4. Verify Deployment

```bash
# Check backend health
curl https://quess-corp-api.onrender.com/api/health

# Check frontend (open in browser)
https://quess-corp.vercel.app
```

## Post-Deployment

### Immediate (Within 1 hour)
- [ ] Frontend loads without errors
- [ ] API responds to requests
- [ ] Database operations work
- [ ] Employee management works
- [ ] Attendance tracking works

### Short-term (Within 24 hours)
- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Verify backups are created
- [ ] Test all user flows
- [ ] Load test with multiple employees

### Ongoing
- [ ] Daily log checks
- [ ] Weekly performance review
- [ ] Monthly security audit
- [ ] Database optimization
- [ ] Dependency updates

## Rollback Procedures

### If Frontend Breaks
```
Vercel allows instant rollback:
1. Go to Deployments tab
2. Select previous stable version
3. Click Redeploy
```

### If Backend Fails
```
Render allows instant rollback:
1. Go to Events tab
2. Select previous stable deployment
3. Click Redeploy
```

## Performance Optimization

### Frontend Optimizations
- Run: `npm run build`
- Check bundle size: `npm analyze`
- Enable gzip compression in Vercel

### Backend Optimizations
- Enable connection pooling
- Add database indexes
- Implement caching layer
- Monitor slow queries

## Monitoring & Alerts

### Set up Monitoring for:
- [ ] API response times
- [ ] Database query times
- [ ] Error rates
- [ ] CPU/Memory usage
- [ ] Disk space usage

### Create Alerts for:
- [ ] Service down
- [ ] Error rate > 5%
- [ ] Response time > 2s
- [ ] Database connection failed
- [ ] Disk space > 80%

## Troubleshooting Guide

### Issue: 502 Bad Gateway

**Possible Causes:**
- Backend not running
- Database connection failed
- Environment variables not set

**Solutions:**
1. Check Render backend logs
2. Verify DATABASE_URL
3. Check database is accessible
4. Restart service

### Issue: CORS Errors

**Possible Causes:**
- Frontend URL not in allowed origins
- Backend CORS not configured

**Solutions:**
1. Add frontend URL to CORS allowed_origins
2. Verify REACT_APP_API_URL
3. Check browser console for exact error

### Issue: Database Connection Failed

**Possible Causes:**
- Invalid connection string
- Database not running
- Firewall blocking connection

**Solutions:**
1. Test connection locally first
2. Verify DATABASE_URL format
3. Check PostgreSQL is running
4. Whitelist IP addresses

## Success Criteria

- [x] Code is clean and well-structured
- [x] All features working
- [x] Professional UI implemented
- [x] Proper error handling
- [x] Database validation
- [x] API documentation
- [x] Deployment successful
- [x] Live URLs accessible
- [x] GitHub repository public
- [x] README complete

---

**Last Review Date**: January 23, 2025
**Next Review Date**: [Add date 1 week from deployment]
**Reviewed By**: Your Name
