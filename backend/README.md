# Backend README

## Overview

The backend is a Node.js/Express REST API that powers the AI-Smart-Tender-Management system. It provides endpoints for tender management, vendor registration, document handling, and integrates with the AI microservice.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Environment Setup

Create a `.env` file:
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=tender_db
JWT_SECRET=your_secret_key_change_in_production
AI_SERVICE_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
```

### Database Setup

```bash
npm run migrate
npm run seed
```

### Running Development Server

```bash
npm run dev
```

Server will start at `http://localhost:3000`

## Project Structure

```
src/
├── app.ts                  # Main Express app
├── database/
│   ├── config.ts          # Database configuration
│   ├── migrations/        # Database migrations
│   └── seed.ts            # Database seeding
├── entities/              # TypeORM entities
│   ├── User.ts
│   ├── Tender.ts
│   ├── Vendor.ts
│   ├── Submission.ts
│   ├── Document.ts
│   ├── Contract.ts
│   └── Notification.ts
├── routes/                # API routes
│   ├── auth.ts
│   ├── tender.ts
│   ├── vendor.ts
│   ├── submission.ts
│   ├── document.ts
│   ├── contract.ts
│   └── ai.ts
├── middleware/            # Express middleware
│   ├── auth.ts
│   ├── errorHandler.ts
│   └── requestLogger.ts
├── services/              # Business logic
├── utils/                 # Helper functions
└── types/                 # TypeScript types
```

## API Documentation

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

### Key Endpoints

**Authentication:**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile

**Tenders:**
- `GET /api/tenders` - List all tenders
- `POST /api/tenders` - Create tender
- `GET /api/tenders/:id` - Get tender details
- `PUT /api/tenders/:id` - Update tender
- `DELETE /api/tenders/:id` - Delete tender

**Vendors:**
- `GET /api/vendors` - List vendors
- `POST /api/vendors/register` - Register vendor
- `GET /api/vendors/:id` - Get vendor profile
- `PUT /api/vendors/:id` - Update vendor

**Submissions:**
- `GET /api/submissions/tender/:tenderId` - Get tender submissions
- `POST /api/submissions` - Submit bid
- `PUT /api/submissions/:id/status` - Update submission status

**Documents:**
- `POST /api/documents/upload` - Upload document
- `GET /api/documents/vendor/:vendorId` - Get vendor documents
- `DELETE /api/documents/:id` - Delete document

**Contracts:**
- `GET /api/contracts` - List contracts
- `POST /api/contracts` - Create contract
- `GET /api/contracts/:id` - Get contract details

**AI:**
- `POST /api/ai/analyze-documents` - Analyze documents
- `POST /api/ai/evaluate-eligibility` - Evaluate vendor eligibility
- `POST /api/ai/analyze-contracts` - Analyze contracts

## Technologies

- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **TypeORM**: Object-relational mapping
- **PostgreSQL**: Database
- **JWT**: Authentication
- **Socket.io**: Real-time communication
- **Multer**: File uploads
- **Axios**: HTTP client
- **Redis**: Caching (optional)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. Register/Login to get a token
2. Include token in Authorization header: `Authorization: Bearer <token>`
3. Token expires in 24 hours
4. Refresh token to extend session

Protected routes require valid token.

## Error Handling

All errors follow standard format:
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Database

### Connection

Configured with TypeORM using PostgreSQL:

```typescript
import { AppDataSource } from './database/config';

await AppDataSource.initialize();
const userRepository = AppDataSource.getRepository(User);
```

### Entities

- **User**: System users (admin, vendor, evaluator)
- **Tender**: Tender postings
- **Vendor**: Vendor information
- **Submission**: Vendor bids
- **Document**: Uploaded documents
- **Contract**: Contract records
- **Notification**: User notifications

### Migrations

Create migration:
```bash
npm run typeorm migration:create
```

Run migrations:
```bash
npm run migrate
```

## Testing

```bash
npm test              # Run all tests
npm test:watch       # Watch mode
npm run test:coverage # Coverage report
```

## Development

### Code Quality

```bash
npm run lint       # Run ESLint
npm run format     # Format with Prettier
```

### Building

```bash
npm run build      # Compile TypeScript
npm start          # Run compiled version
```

## Deployment

### Docker

```bash
docker build -t tender-backend .
docker run -p 3000:3000 tender-backend
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Update `JWT_SECRET` with secure value
- [ ] Configure PostgreSQL connection
- [ ] Set up Redis for caching
- [ ] Configure AI Service URL
- [ ] Enable HTTPS
- [ ] Set up logging
- [ ] Configure backups
- [ ] Set up monitoring/alerts

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| NODE_ENV | Environment (development/production) | Yes |
| PORT | Server port | No (default: 3000) |
| DB_HOST | Database host | Yes |
| DB_PORT | Database port | No (default: 5432) |
| DB_USER | Database user | Yes |
| DB_PASSWORD | Database password | Yes |
| DB_NAME | Database name | Yes |
| JWT_SECRET | JWT signing secret | Yes |
| AI_SERVICE_URL | AI microservice URL | No |
| CLIENT_URL | Frontend URL for CORS | No |

## Performance Tips

1. Use database indexes on frequently queried fields
2. Implement caching with Redis
3. Use pagination for large datasets
4. Optimize queries with eager loading
5. Use connection pooling
6. Implement rate limiting
7. Compress responses with gzip

## Security

- Input validation on all routes
- SQL injection prevention via TypeORM
- CORS configuration
- Rate limiting
- Password hashing with bcrypt
- JWT authentication
- Helmet.js for HTTP headers
- File upload validation

## Monitoring

Log important events:
```typescript
console.log('Tender created:', tender.id);
console.error('Database error:', error);
```

Use centralized logging service in production.

## Scaling

- Horizontal scaling with load balancer
- Database read replicas
- Redis for caching
- Message queue for async jobs
- API rate limiting
- CDN for static files

## Resources

- [Express.js Docs](https://expressjs.com/)
- [TypeORM Docs](https://typeorm.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## Support

For issues or questions, contact: support@tender-management.com

## License

MIT
