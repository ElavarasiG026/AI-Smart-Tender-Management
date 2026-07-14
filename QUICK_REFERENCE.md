# Quick Reference Guide

## 🚀 Start Project in 3 Steps

### Step 1: Setup
```bash
cd AI-Smart-Tender-Management

# Windows
setup.bat

# Mac/Linux
bash setup.sh
```

### Step 2: Configure
```bash
# Edit environment files
backend/.env        # Database & JWT config
frontend/.env       # API URL config
ai-service/.env     # Flask config
```

### Step 3: Run
```bash
# Option A: Docker (Recommended)
docker-compose -f deployment/docker-compose.yml up --build

# Option B: Local Development
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm start

# Terminal 3
cd ai-service && python app.py
```

---

## 🌐 Access Points

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:3001 | 3001 |
| Backend API | http://localhost:3000/api | 3000 |
| AI Service | http://localhost:5000/api | 5000 |
| Database | localhost:5432 | 5432 |
| Redis | localhost:6379 | 6379 |

---

## 📚 Essential Commands

### Backend
```bash
cd backend
npm run dev              # Start dev server
npm run build            # Build for production
npm test                 # Run tests
npm run lint             # Run linter
npm run format           # Format code
npm run migrate          # Run migrations
npm run seed             # Seed database
```

### Frontend
```bash
cd frontend
npm start                # Start dev server
npm run build            # Build for production
npm test                 # Run tests
npm run eject            # Eject from CRA
```

### AI Service
```bash
cd ai-service
python app.py            # Start dev server
python -m pytest         # Run tests
pip install -r requirements.txt  # Install dependencies
```

### Docker
```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and start
docker-compose up --build
```

---

## 🔐 Authentication

### Test User Credentials
```
Email: admin@example.com
Password: admin123
Role: admin
```

```
Email: vendor@example.com
Password: vendor123
Role: vendor
```

### Get Auth Token
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Use Token in Requests
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/tenders
```

---

## 📝 API Endpoints Quick Reference

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
PUT    /api/auth/profile
```

### Tenders
```
GET    /api/tenders
POST   /api/tenders
GET    /api/tenders/:id
PUT    /api/tenders/:id
DELETE /api/tenders/:id
PUT    /api/tenders/:id/publish
```

### Vendors
```
GET    /api/vendors
POST   /api/vendors/register
GET    /api/vendors/:id
PUT    /api/vendors/:id
PUT    /api/vendors/:id/approve
PUT    /api/vendors/:id/reject
```

### Submissions
```
POST   /api/submissions
GET    /api/submissions/tender/:tenderId
GET    /api/submissions/vendor/:vendorId
PUT    /api/submissions/:id/status
```

### Documents
```
POST   /api/documents/upload
GET    /api/documents/:id
GET    /api/documents/vendor/:vendorId
DELETE /api/documents/:id
```

### Contracts
```
GET    /api/contracts
POST   /api/contracts
GET    /api/contracts/:id
PUT    /api/contracts/:id/status
GET    /api/contracts/vendor/:vendorId
```

### AI Services
```
POST   /api/ai/analyze-documents
POST   /api/ai/evaluate-eligibility
POST   /api/ai/analyze-contracts
GET    /api/ai/recommendations/:tenderId
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm run build
npm run dev
```

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Database connection error
```bash
# Check PostgreSQL is running
# Verify .env has correct credentials
# Check DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
# Ensure PostgreSQL service is started
```

### Docker issues
```bash
# Clean up containers
docker-compose down -v

# Rebuild everything
docker-compose up --build

# Check logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs ai-service
docker-compose logs postgres
```

### Port already in use
```bash
# Find process using port
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill process
kill -9 <PID>  # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| README.md | Project overview |
| IMPLEMENTATION_COMPLETE.md | What's included |
| PROJECT_FILES.md | Complete file structure |
| DEPLOYMENT_GUIDE.md | Deployment instructions |
| backend/README.md | Backend documentation |
| backend/API_DOCUMENTATION.md | API reference |
| frontend/README.md | Frontend documentation |
| ai-service/README.md | AI service documentation |
| .github/copilot-instructions.md | Development guidelines |

---

## 🔄 Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Backend: `backend/src/`
   - Frontend: `frontend/src/`
   - AI: `ai-service/`

3. **Run Tests**
   ```bash
   npm run test
   ```

4. **Format Code**
   ```bash
   npm run format
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

6. **Push to Repository**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Go to GitHub
   - Create PR from feature branch to main

---

## 🚢 Deployment Checklist

- [ ] Update environment variables for production
- [ ] Build Docker images: `docker-compose build`
- [ ] Start services: `docker-compose up -d`
- [ ] Verify health: `curl http://localhost:3000/api/health`
- [ ] Run database migrations: `npm run migrate`
- [ ] Test API endpoints
- [ ] Test frontend functionality
- [ ] Configure backup strategy
- [ ] Set up monitoring/logging
- [ ] Configure SSL/HTTPS
- [ ] Set up CDN for static files
- [ ] Configure email service
- [ ] Set up payment processing (if needed)

---

## 📊 Project Structure

```
AI-Smart-Tender-Management/
├── backend/              # Express.js API
├── frontend/             # React app
├── ai-service/           # Flask ML service
├── deployment/           # Docker & CI/CD
├── .github/              # GitHub config
└── docs/                 # Documentation
```

---

## 🎯 Next Steps

1. **Customize Configuration**
   - Update theme colors
   - Configure email service
   - Set up payment gateway

2. **Add Features**
   - More AI models
   - Email notifications
   - PDF report generation
   - Advanced analytics

3. **Optimize Performance**
   - Add caching
   - Optimize queries
   - Implement pagination
   - Use CDN

4. **Enhance Security**
   - Add 2FA
   - Rate limiting
   - API key authentication
   - Audit logging

5. **Deploy to Production**
   - Set up CI/CD pipeline
   - Configure domain
   - Set up SSL
   - Configure backups

---

## 💡 Tips & Best Practices

1. **Keep dependencies updated**
   ```bash
   npm update
   npm audit fix
   ```

2. **Use environment variables**
   - Never commit `.env`
   - Use `.env.example` for templates

3. **Write tests**
   - Test critical paths
   - Aim for 80%+ coverage

4. **Document changes**
   - Update README.md
   - Add code comments
   - Keep API docs current

5. **Monitor performance**
   - Check response times
   - Monitor database queries
   - Track error rates

6. **Security first**
   - Validate all inputs
   - Use HTTPS
   - Keep dependencies patched
   - Use strong passwords

---

## 🆘 Getting Help

- Check documentation in `docs/` folder
- Review API documentation
- Check GitHub issues
- Review code comments
- Contact: support@tender-management.com

---

## 📞 Support Channels

| Channel | Response Time |
|---------|---------------|
| Email | 24 hours |
| GitHub Issues | 48 hours |
| Slack | Real-time |
| Documentation | Always available |

---

## ✅ Quick Health Check

```bash
# Frontend
curl http://localhost:3001

# Backend
curl http://localhost:3000/api/health

# AI Service
curl http://localhost:5000/api/health

# Database
psql -h localhost -U postgres -d tender_db -c "SELECT NOW();"
```

Expected responses:
- Frontend: HTML page
- Backend: `{"status":"OK","timestamp":"..."}`
- AI Service: `{"status":"OK","service":"AI Service"}`
- Database: Current timestamp

---

**Happy Coding! 🚀**

For detailed information, refer to the documentation files in the project root.
