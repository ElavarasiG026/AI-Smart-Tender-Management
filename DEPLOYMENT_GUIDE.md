# AI-Smart-Tender-Management

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.9+ (for AI service)
- PostgreSQL 13+ (for local development)

### Run with Docker Compose

```bash
# Clone the repository
git clone <repository-url>
cd AI-Smart-Tender-Management

# Build and start services
docker-compose -f deployment/docker-compose.yml up --build

# Access the application
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api
- AI Service: http://localhost:5000
- Database: localhost:5432
```

### Environment Variables

Create `.env` file in root:
```
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=tender_db
JWT_SECRET=your_secret_key_change_in_production
```

### API Health Check

```bash
curl http://localhost:3000/api/health
curl http://localhost:5000/api/health
```

### Stop Services

```bash
docker-compose -f deployment/docker-compose.yml down
```

## Development Setup

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### AI Service Setup
```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## Jenkins Deployment

1. Create a new Jenkins pipeline job
2. Configure repository: `https://github.com/yourusername/AI-Smart-Tender-Management.git`
3. Pipeline script: `deployment/Jenkinsfile`
4. Trigger pipeline to build and deploy

## Database Migration

```bash
cd backend
npm run migrate
npm run seed
```

## Testing

```bash
# Run all tests
npm run test

# Backend tests
npm run test:backend

# Frontend tests
npm run test:frontend
```

## Documentation

- [Backend API Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)
- [AI Service Documentation](ai-service/README.md)
- [Deployment Guide](deployment/README.md)

## License

MIT
