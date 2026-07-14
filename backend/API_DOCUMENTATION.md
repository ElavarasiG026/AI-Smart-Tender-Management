# Backend API Documentation

## Getting Started

### Installation
```bash
cd backend
npm install
npm run dev
```

### Environment Variables
```
DATABASE_URL=postgresql://user:password@localhost:5432/tender_db
JWT_SECRET=your_secret_key
AI_SERVICE_URL=http://localhost:5000
NODE_ENV=development
PORT=3000
```

## Authentication Endpoints

### POST /api/auth/register
Register a new user

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "vendor|admin|evaluator",
  "organizationName": "Company Name"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": { "id": "uuid", "email": "user@example.com" },
  "token": "jwt_token"
}
```

### POST /api/auth/login
Authenticate user

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": { "id": "uuid", "email": "user@example.com" },
  "token": "jwt_token"
}
```

## Tender Endpoints

### GET /api/tenders
Get all tenders

### POST /api/tenders
Create new tender (Admin only)

### GET /api/tenders/:id
Get tender details

### PUT /api/tenders/:id
Update tender (Admin only)

### DELETE /api/tenders/:id
Delete tender (Admin only)

### PUT /api/tenders/:id/publish
Publish tender (Admin only)

## Vendor Endpoints

### GET /api/vendors
Get all vendors

### POST /api/vendors/register
Register as vendor

### GET /api/vendors/:id
Get vendor profile

### PUT /api/vendors/:id
Update vendor profile

### PUT /api/vendors/:id/approve
Approve vendor (Admin only)

### PUT /api/vendors/:id/reject
Reject vendor (Admin only)

## Submission Endpoints

### GET /api/submissions/tender/:tenderId
Get submissions by tender

### GET /api/submissions/vendor/:vendorId
Get vendor submissions

### POST /api/submissions
Submit bid

### PUT /api/submissions/:id/status
Update submission status (Admin/Evaluator only)

## Document Endpoints

### POST /api/documents/upload
Upload document

**Request:** multipart/form-data
- file: File object
- vendorId: UUID
- submissionId: UUID
- tenderId: UUID
- documentType: string

### GET /api/documents/:id
Download document

### GET /api/documents/vendor/:vendorId
Get vendor documents

### DELETE /api/documents/:id
Delete document

## Contract Endpoints

### GET /api/contracts
Get all contracts

### POST /api/contracts
Create contract (Admin only)

### GET /api/contracts/:id
Get contract details

### PUT /api/contracts/:id/status
Update contract status

### GET /api/contracts/vendor/:vendorId
Get vendor contracts

## AI Endpoints

### POST /api/ai/analyze-documents
Analyze vendor documents

**Request:**
```json
{
  "documentIds": ["doc1", "doc2"],
  "vendorId": "vendor-uuid"
}
```

### POST /api/ai/evaluate-eligibility
Evaluate vendor eligibility

**Request:**
```json
{
  "vendorId": "vendor-uuid",
  "tenderId": "tender-uuid"
}
```

### POST /api/ai/analyze-contracts
Analyze contract

**Request:**
```json
{
  "contractId": "contract-uuid"
}
```

### GET /api/ai/recommendations/:tenderId
Get AI recommendations for tender

## Error Handling

All errors return standard format:
```json
{
  "error": "Error message",
  "status": 400
}
```

### Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Database Schema

### Users
- id (UUID)
- email (String, unique)
- password (String, hashed)
- firstName (String)
- lastName (String)
- role (admin|vendor|evaluator)
- organizationName (String)
- profileImage (String, optional)
- isActive (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)

### Tenders
- id (UUID)
- title (String)
- description (Text)
- requirements (Text)
- requiredDocuments (JSON)
- status (draft|published|closed|cancelled)
- publishedDate (DateTime)
- deadline (DateTime)
- budgetMin (Decimal)
- budgetMax (Decimal)
- evaluationCriteria (JSON)
- createdBy (UUID, FK to Users)
- createdAt (DateTime)
- updatedAt (DateTime)

### Vendors
- id (UUID)
- companyName (String)
- registrationNumber (String)
- email (String, unique)
- phone (String)
- address (Text)
- city (String)
- country (String)
- status (pending|approved|rejected|suspended)
- rating (Decimal)
- completedProjects (Integer)
- certifications (JSON)
- description (Text)
- user (UUID, FK to Users)
- createdAt (DateTime)
- updatedAt (DateTime)

### Submissions
- id (UUID)
- tenderId (UUID, FK to Tenders)
- vendorId (UUID, FK to Vendors)
- status (pending|submitted|evaluating|accepted|rejected|disqualified)
- quotedPrice (Decimal)
- proposalSummary (Text)
- evaluationScore (JSON)
- evaluationComments (Text)
- aiAnalysis (JSON)
- submittedAt (DateTime)
- updatedAt (DateTime)

### Documents
- id (UUID)
- fileName (String)
- fileType (String)
- fileUrl (Text)
- uploadedBy (UUID)
- verificationStatus (pending|verified|rejected|duplicate)
- aiAnalysis (JSON)
- rejectionReason (Text)
- vendorId (UUID, FK to Vendors)
- submissionId (UUID, FK to Submissions)
- tenderId (UUID, FK to Tenders)
- uploadedAt (DateTime)
- updatedAt (DateTime)

### Contracts
- id (UUID)
- contractNumber (String)
- title (String)
- description (Text)
- contractDocument (Text)
- status (draft|pending|signed|active|completed|terminated)
- startDate (DateTime)
- endDate (DateTime)
- contractValue (Decimal)
- terms (Text)
- milestones (JSON)
- vendorSignature (Text)
- organizationSignature (Text)
- signedDate (DateTime)
- tender (UUID, FK to Tenders)
- vendor (UUID, FK to Vendors)
- createdAt (DateTime)
- updatedAt (DateTime)

## Testing

```bash
npm test
npm test:watch
```

Test files should be named `*.test.ts` or `*.spec.ts`
