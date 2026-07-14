<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# AI-Smart-Tender-Management Project Guidelines

## Project Overview
This is a full-stack AI-powered Smart Tender and Contract Management System with:
- Node.js/Express backend
- React frontend
- Python Flask AI service
- PostgreSQL database
- Docker & Jenkins CI/CD

## Development Standards

### Backend (Node.js/TypeScript)
- Use TypeScript for type safety
- Follow Express.js best practices
- Use TypeORM for database operations
- Implement proper error handling
- Use JWT for authentication
- Validate all inputs

### Frontend (React/TypeScript)
- Use functional components with hooks
- Implement Redux for state management
- Use Material-UI for components
- Follow React best practices
- Implement proper error boundaries
- Handle loading and error states

### AI Service (Python)
- Use Flask for REST API
- Implement proper ML model validation
- Document all AI models
- Include error handling
- Use logging

## Code Structure
```
backend/src/
  ├── routes/       # API endpoints
  ├── controllers/  # Business logic
  ├── services/     # AI integration
  ├── entities/     # Database models
  ├── middleware/   # Auth, validation
  └── utils/        # Helper functions

frontend/src/
  ├── pages/        # Page components
  ├── components/   # Reusable components
  ├── services/     # API calls
  ├── store/        # Redux store
  └── slices/       # Redux slices

ai-service/
  ├── models/       # ML models
  ├── utils/        # Utilities
  └── routes/       # API endpoints
```

## Important Files
- Backend: `backend/src/app.ts` (main entry point)
- Frontend: `frontend/src/App.tsx` (main React app)
- AI Service: `ai-service/app.py` (Flask app)
- Docker: `deployment/docker-compose.yml` (container orchestration)

## Running Locally
```bash
# Start all services
npm run dev

# Or start individually:
npm run dev:backend    # Terminal 1
npm run dev:frontend   # Terminal 2
npm run dev:ai         # Terminal 3
```

## Testing
```bash
npm run test          # All tests
npm run test:backend  # Backend only
npm run test:frontend # Frontend only
```

## Deployment
```bash
# Using Docker
docker-compose -f deployment/docker-compose.yml up --build

# Using Jenkins
# Push to main branch to trigger pipeline
```

## Key Technologies
- **Backend**: Node.js, Express, TypeScript, TypeORM, JWT, Socket.io
- **Frontend**: React 18, TypeScript, Redux, Material-UI, Axios
- **AI/ML**: Python, Flask, TensorFlow, Scikit-learn, OpenCV
- **Database**: PostgreSQL
- **DevOps**: Docker, Docker Compose, Jenkins, GitHub Actions

## API Base URL
- Development: `http://localhost:3000/api`
- Production: `https://api.tender-management.com/api`

## Authentication
- Use Bearer tokens in Authorization header
- Token format: `Authorization: Bearer <token>`
- Token expires in 24 hours

## Common Tasks

### Adding new API endpoint
1. Create route in `routes/`
2. Create controller method
3. Add service if needed
4. Update documentation

### Adding new page
1. Create component in `pages/`
2. Add route in `App.tsx`
3. Create Redux slice if needed
4. Add navigation link

### Adding new AI model
1. Create model file in `ai-service/models/`
2. Implement in Flask app
3. Add endpoint for model
4. Document API

## Support
For issues or questions, refer to:
- Backend README: `backend/README.md`
- Frontend README: `frontend/README.md`
- AI Service README: `ai-service/README.md`
- Main README: `README.md`
