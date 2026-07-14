# AI Service Documentation

## Overview
The AI Service is a Flask-based microservice that provides intelligent document verification, vendor eligibility evaluation, and contract analysis capabilities.

## Features

### Document Analysis
- Automatic document validation
- Missing field detection
- Duplicate document identification
- Document quality assessment
- OCR-powered text extraction

### Vendor Eligibility
- Automated scoring based on criteria
- Financial health evaluation
- Experience assessment
- Certification verification
- Compliance checking
- Risk factor identification

### Contract Analysis
- Contract term extraction
- Compliance checking
- Risk assessment
- Key date identification
- Deliverable extraction
- Milestone tracking

## Installation

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running the Service

### Development
```bash
python app.py
```

### Production
```bash
gunicorn app:app --workers 4 --bind 0.0.0.0:5000
```

### Docker
```bash
docker build -t tender-ai-service .
docker run -p 5000:5000 tender-ai-service
```

## Environment Variables
```
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_PORT=5000
```

## API Endpoints

### Health Check
**GET** `/api/health`

### Document Verification
**POST** `/api/verify-document`

Request:
```json
{
  "documentId": "doc-uuid",
  "filePath": "uploads/file.pdf",
  "documentType": "invoice|certificate|license|financial"
}
```

Response:
```json
{
  "documentId": "doc-uuid",
  "status": "verified|rejected",
  "confidence": 0.92,
  "missingFields": [],
  "duplicateDetected": false,
  "quality": 0.9,
  "analysis": {}
}
```

### Analyze Documents
**POST** `/api/analyze-documents`

Request:
```json
{
  "documentIds": ["doc1", "doc2"],
  "vendorId": "vendor-uuid"
}
```

### Evaluate Eligibility
**POST** `/api/evaluate-eligibility`

Request:
```json
{
  "vendorId": "vendor-uuid",
  "tenderId": "tender-uuid"
}
```

Response:
```json
{
  "vendorId": "vendor-uuid",
  "tenderId": "tender-uuid",
  "eligible": true,
  "score": 0.85,
  "criteria": {
    "financial_health": 0.85,
    "experience": 0.90,
    "certifications": 0.80,
    "compliance": 1.0,
    "reputation": 0.88
  },
  "recommendations": [],
  "riskFactors": []
}
```

### Analyze Contracts
**POST** `/api/analyze-contracts`

Request:
```json
{
  "contractId": "contract-uuid"
}
```

Response:
```json
{
  "contractId": "contract-uuid",
  "terms": {},
  "compliance": {},
  "riskAssessment": {},
  "keyDates": [],
  "deliverables": []
}
```

### Get Recommendations
**GET** `/api/recommendations/<tender_id>`

Response:
```json
{
  "tenderId": "tender-uuid",
  "recommendations": {},
  "topCandidates": [],
  "riskWarnings": []
}
```

## Models

### DocumentAnalyzer
Analyzes documents for completeness, authenticity, and quality.

```python
from models.document_analyzer import DocumentAnalyzer

analyzer = DocumentAnalyzer()
result = analyzer.analyze_document(file_path, document_type)
```

### VendorEligibility
Evaluates vendor eligibility based on criteria.

```python
from models.vendor_eligibility import VendorEligibility

evaluator = VendorEligibility()
result = evaluator.evaluate_vendor(vendor_id, tender_id)
```

### ContractAnalyzer
Analyzes contracts for terms, compliance, and risks.

```python
from models.contract_analyzer import ContractAnalyzer

analyzer = ContractAnalyzer()
result = analyzer.analyze_contract(contract_id)
```

## Technologies

- **Framework**: Flask 2.3.3
- **ML/AI**: TensorFlow, Scikit-learn
- **Image Processing**: OpenCV
- **Data Processing**: NumPy, Pandas
- **Document Processing**: PyPDF, Pillow

## Testing

```bash
python -m pytest tests/
```

## Performance Optimization

- Cache model predictions
- Batch process documents
- Use async operations
- Implement rate limiting

## Error Handling

All errors return standard format:
```json
{
  "error": "Error message",
  "status": 500
}
```

## Logging

Logs are written to console and can be configured for file output.

```python
import logging

logger = logging.getLogger(__name__)
logger.info("Processing document...")
logger.error("Error occurred", exc_info=True)
```

## Security

- Input validation on all endpoints
- Rate limiting to prevent abuse
- Secure file upload handling
- Error message sanitization

## Scalability

- Stateless design for horizontal scaling
- Database connection pooling
- Cache layer for frequent requests
- Asynchronous processing for heavy operations

## Deployment

### Local Development
```bash
python app.py
```

### Docker Development
```bash
docker-compose up ai-service
```

### Production
Use Gunicorn or uWSGI with Nginx reverse proxy.

See [DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md) for details.
