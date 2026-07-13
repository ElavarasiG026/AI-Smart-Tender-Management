# AI-Powered Smart Tender and Contract Management System

## 📋 Overview

A comprehensive web-based application that simplifies and automates the tender and contract management process for organizations. The platform enables:

- **Tender Management**: Create, publish, and manage tenders
- **Vendor Management**: Register vendors and verify eligibility
- **Document Verification**: AI-powered document analysis and validation
- **Contract Lifecycle Management**: Track contracts, generate reminders, and produce reports
- **Real-time Notifications**: Alerts for tender updates, submissions, and contract expiries

## 🏗️ Project Architecture

### Technology Stack

**Backend:**
- Node.js + Express.js (REST API)
- TypeScript for type safety
- PostgreSQL (Database)
- JWT Authentication
- Socket.io for real-time notifications

**Frontend:**
- React 18 + TypeScript
- Material-UI for UI components
- Redux for state management
- Axios for API calls

**AI/ML Service:**
- Python Flask
- Scikit-learn & TensorFlow for document analysis
- OpenCV for document processing

**DevOps:**
- Docker & Docker Compose
- Jenkins for CI/CD
- PostgreSQL in Docker

## 📁 Project Structure

```
AI-Smart-Tender-Management/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth & validation
│   │   ├── services/       # AI service integration
│   │   ├── utils/          # Helper functions
│   │   └── app.ts          # Express app
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   └── App.tsx
│   ├── package.json
│   └── Dockerfile
├── ai-service/            # Python AI microservice
│   ├── app.py
│   ├── models/
│   │   ├── document_analyzer.py
│   │   ├── vendor_eligibility.py
│   │   └── ml_models/
│   ├── utils/
│   ├── requirements.txt
│   └── Dockerfile
├── deployment/            # DevOps files
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── jenkins/
│       └── Jenkinsfile
├── .github/
│   └── copilot-instructions.md
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.9+
- PostgreSQL 13+
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd AI-Smart-Tender-Management
```

2. **Install dependencies**
```bash
npm install
cd backend && npm install
cd ../frontend && npm install
cd ../ai-service && pip install -r requirements.txt
```

3. **Environment Configuration**

Create `.env` files in respective directories:

**Backend (.env):**
```
DATABASE_URL=postgresql://user:password@localhost:5432/tender_db
JWT_SECRET=your_jwt_secret_key
AI_SERVICE_URL=http://localhost:5000
NODE_ENV=development
PORT=3000
```

**AI Service (.env):**
```
FLASK_ENV=development
FLASK_DEBUG=True
```

4. **Database Setup**
```bash
cd backend
npm run migrate
npm run seed
```

5. **Start Development Servers**
```bash
npm run dev
```

Or use Docker:
```bash
docker-compose up
```

## 🎯 Key Features

### For Organizations (Admins)

1. **Tender Management**
   - Create and publish tenders
   - Set evaluation criteria
   - Define document requirements
   - Track submission status

2. **Vendor Management**
   - Approve/reject vendors
   - View vendor profiles
   - Eligibility verification
   - Performance ratings

3. **Contract Management**
   - Digital contract signing
   - Automated reminders
   - Expiry tracking
   - Amendment history

4. **Analytics & Reports**
   - Tender performance metrics
   - Vendor statistics
   - Contract analytics
   - Document processing reports

### For Vendors

1. **Registration & Profile**
   - Self-registration
   - Profile management
   - Document uploads
   - Certification verification

2. **Tender Participation**
   - Search and filter tenders
   - View requirements
   - Submit bids
   - Track submission status

3. **Document Management**
   - Upload required documents
   - Automatic validation
   - Re-upload failed documents
   - Download approved documents

## 🤖 AI Features

### Document Verification
- Automatic document validation
- Missing document detection
- Duplicate file identification
- Document quality assessment
- OCR for text extraction

### Vendor Eligibility Analysis
- Automated eligibility scoring
- Criteria matching
- Risk assessment
- Recommendation engine

### Contract Analysis
- Contract term extraction
- Compliance checking
- Expiry alerts
- Amendment tracking

## 🔐 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- SQL injection prevention
- CORS configuration
- Rate limiting
- Input validation & sanitization

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

### Tenders
- `GET /api/tenders` - List all tenders
- `POST /api/tenders` - Create tender (Admin)
- `GET /api/tenders/:id` - Get tender details
- `PUT /api/tenders/:id` - Update tender (Admin)
- `DELETE /api/tenders/:id` - Delete tender (Admin)

### Vendors
- `GET /api/vendors` - List vendors
- `POST /api/vendors` - Register vendor
- `GET /api/vendors/:id` - Get vendor profile
- `PUT /api/vendors/:id` - Update vendor profile

### Submissions
- `POST /api/submissions` - Submit bid
- `GET /api/submissions/:tenderId` - Get tender submissions (Admin)
- `GET /api/vendors/:vendorId/submissions` - Get vendor submissions

### Documents
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/:id` - Download document
- `DELETE /api/documents/:id` - Delete document

### AI Analysis
- `POST /api/ai/analyze-documents` - Analyze vendor documents
- `POST /api/ai/evaluate-eligibility` - Evaluate vendor eligibility
- `POST /api/ai/analyze-contracts` - Analyze contracts

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests
npm run test:backend

# Run frontend tests
npm run test:frontend

# With coverage
npm run test:backend -- --coverage
```

## 🐳 Docker Deployment

```bash
# Build images
npm run docker:build

# Start containers
npm run docker:up

# Stop containers
npm run docker:down

# View logs
docker-compose logs -f
```

## 📈 Performance Optimization

- Database indexing on frequently queried fields
- Caching with Redis (optional)
- CDN for static assets
- API response pagination
- Lazy loading in frontend
- Code splitting in React

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/name`
4. Submit pull request

## 📝 License

MIT License - See LICENSE file for details

## 📧 Support

For support, email: support@ai-tender-management.com

## 🔄 Version History

- **v1.0.0** - Initial release
  - Core tender management features
  - Vendor management system
  - AI-powered document verification
  - Contract lifecycle management
  - Real-time notifications
