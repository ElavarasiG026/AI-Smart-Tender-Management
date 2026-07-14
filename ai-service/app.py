from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from models.document_analyzer import DocumentAnalyzer
from models.vendor_eligibility import VendorEligibility
from models.contract_analyzer import ContractAnalyzer

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize models
doc_analyzer = DocumentAnalyzer()
vendor_eligibility = VendorEligibility()
contract_analyzer = ContractAnalyzer()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'service': 'AI Service'})

@app.route('/api/verify-document', methods=['POST'])
def verify_document():
    """Verify document completeness and authenticity"""
    try:
        data = request.json
        document_id = data.get('documentId')
        file_path = data.get('filePath')
        document_type = data.get('documentType')
        
        result = doc_analyzer.analyze_document(file_path, document_type)
        
        return jsonify({
            'documentId': document_id,
            'status': 'verified' if result['is_valid'] else 'rejected',
            'confidence': result['confidence'],
            'missingFields': result.get('missing_fields', []),
            'duplicateDetected': result.get('duplicate', False),
            'quality': result.get('quality_score', 0),
            'analysis': result
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze-documents', methods=['POST'])
def analyze_documents():
    """Analyze multiple documents for vendor"""
    try:
        data = request.json
        document_ids = data.get('documentIds', [])
        vendor_id = data.get('vendorId')
        
        results = []
        for doc_id in document_ids:
            result = doc_analyzer.analyze_document_by_id(doc_id)
            results.append(result)
        
        return jsonify({
            'vendorId': vendor_id,
            'documentsAnalyzed': len(results),
            'analysis': results,
            'completeness': sum([r.get('confidence', 0) for r in results]) / len(results) if results else 0
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/evaluate-eligibility', methods=['POST'])
def evaluate_eligibility():
    """Evaluate vendor eligibility based on criteria"""
    try:
        data = request.json
        vendor_id = data.get('vendorId')
        tender_id = data.get('tenderId')
        
        evaluation = vendor_eligibility.evaluate_vendor(vendor_id, tender_id)
        
        return jsonify({
            'vendorId': vendor_id,
            'tenderId': tender_id,
            'eligible': evaluation['eligible'],
            'score': evaluation['score'],
            'criteria': evaluation['criteria'],
            'recommendations': evaluation.get('recommendations', []),
            'riskFactors': evaluation.get('risk_factors', [])
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze-contracts', methods=['POST'])
def analyze_contracts():
    """Analyze contract for terms and compliance"""
    try:
        data = request.json
        contract_id = data.get('contractId')
        
        analysis = contract_analyzer.analyze_contract(contract_id)
        
        return jsonify({
            'contractId': contract_id,
            'terms': analysis.get('terms', []),
            'compliance': analysis.get('compliance', {}),
            'riskAssessment': analysis.get('risk_assessment', {}),
            'keyDates': analysis.get('key_dates', []),
            'deliverables': analysis.get('deliverables', [])
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recommendations/<tender_id>', methods=['GET'])
def get_recommendations(tender_id):
    """Get AI recommendations for tender"""
    try:
        recommendations = vendor_eligibility.get_tender_recommendations(tender_id)
        
        return jsonify({
            'tenderId': tender_id,
            'recommendations': recommendations,
            'topCandidates': recommendations.get('top_candidates', []),
            'riskWarnings': recommendations.get('risk_warnings', [])
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('FLASK_PORT', 5000)), debug=os.getenv('FLASK_DEBUG', False))
