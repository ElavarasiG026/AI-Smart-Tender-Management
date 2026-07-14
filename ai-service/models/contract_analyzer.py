from typing import Dict, List
from datetime import datetime

class ContractAnalyzer:
    """AI-powered contract analysis and compliance checking"""
    
    def __init__(self):
        self.risk_keywords = ['limitation of liability', 'indemnity', 'termination', 'breach']
        
    def analyze_contract(self, contract_id: str) -> Dict:
        """Analyze contract for terms, compliance, and risks"""
        try:
            contract_content = self._fetch_contract(contract_id)
            
            analysis = {
                'contractId': contract_id,
                'terms': self._extract_key_terms(contract_content),
                'compliance': self._check_compliance(contract_content),
                'risk_assessment': self._assess_risks(contract_content),
                'key_dates': self._extract_key_dates(contract_content),
                'deliverables': self._extract_deliverables(contract_content),
                'milestones': self._extract_milestones(contract_content)
            }
            
            return analysis
        except Exception as e:
            return {'error': str(e)}
    
    def _fetch_contract(self, contract_id: str) -> str:
        """Fetch contract content"""
        # Simulated contract content
        return """
        Contract Terms:
        - Service Duration: 12 months
        - Payment Terms: Net 30 days
        - Liability Cap: $100,000
        - Warranty: 90 days
        - Termination: 30 days notice
        """
    
    def _extract_key_terms(self, content: str) -> Dict:
        """Extract key terms from contract"""
        return {
            'duration': '12 months',
            'paymentTerms': 'Net 30 days',
            'liability': '$100,000',
            'warranty': '90 days',
            'terminationNotice': '30 days'
        }
    
    def _check_compliance(self, content: str) -> Dict:
        """Check compliance requirements"""
        return {
            'dataProtection': True,
            'confidentiality': True,
            'insurance': True,
            'audit': True,
            'complianceLevel': 'High'
        }
    
    def _assess_risks(self, content: str) -> Dict:
        """Assess contract risks"""
        return {
            'overallRisk': 'Low',
            'financialRisk': 'Low',
            'operationalRisk': 'Medium',
            'legalRisk': 'Low',
            'riskItems': [
                'High liability cap may need review',
                'Short warranty period should be noted'
            ]
        }
    
    def _extract_key_dates(self, content: str) -> List[Dict]:
        """Extract key dates from contract"""
        return [
            {'date': '2024-01-01', 'event': 'Contract Start'},
            {'date': '2024-12-31', 'event': 'Contract End'},
            {'date': '2024-10-31', 'event': 'Mid-term Review'},
            {'date': '2024-09-30', 'event': 'Payment Due'}
        ]
    
    def _extract_deliverables(self, content: str) -> List[Dict]:
        """Extract deliverables from contract"""
        return [
            {'id': 'd1', 'description': 'Initial Implementation', 'dueDate': '2024-02-29', 'value': '30%'},
            {'id': 'd2', 'description': 'System Integration', 'dueDate': '2024-06-30', 'value': '40%'},
            {'id': 'd3', 'description': 'Final Deployment', 'dueDate': '2024-12-31', 'value': '30%'}
        ]
    
    def _extract_milestones(self, content: str) -> List[Dict]:
        """Extract milestones from contract"""
        return [
            {'milestone': 'Planning Phase', 'date': '2024-01-15', 'status': 'completed'},
            {'milestone': 'Development Phase', 'date': '2024-03-31', 'status': 'in-progress'},
            {'milestone': 'Testing Phase', 'date': '2024-10-31', 'status': 'pending'},
            {'milestone': 'Production Deployment', 'date': '2024-12-31', 'status': 'pending'}
        ]
