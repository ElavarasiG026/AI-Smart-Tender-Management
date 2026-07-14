from typing import Dict, List
import numpy as np

class VendorEligibility:
    """AI-powered vendor eligibility evaluation"""
    
    def __init__(self):
        self.evaluation_weights = {
            'financial_health': 0.25,
            'experience': 0.25,
            'certifications': 0.20,
            'compliance': 0.20,
            'reputation': 0.10
        }
        
    def evaluate_vendor(self, vendor_id: str, tender_id: str) -> Dict:
        """Evaluate vendor eligibility based on tender criteria"""
        try:
            # Simulate vendor data retrieval
            vendor_data = self._fetch_vendor_data(vendor_id)
            tender_criteria = self._fetch_tender_criteria(tender_id)
            
            scores = {
                'financial_health': self._evaluate_financial_health(vendor_data),
                'experience': self._evaluate_experience(vendor_data, tender_criteria),
                'certifications': self._evaluate_certifications(vendor_data, tender_criteria),
                'compliance': self._evaluate_compliance(vendor_data),
                'reputation': self._evaluate_reputation(vendor_data)
            }
            
            overall_score = sum(scores[k] * self.evaluation_weights[k] for k in scores)
            
            eligible = overall_score >= 0.65
            
            result = {
                'eligible': eligible,
                'score': round(overall_score, 2),
                'criteria': scores,
                'recommendations': self._generate_recommendations(scores),
                'risk_factors': self._identify_risk_factors(scores)
            }
            
            return result
        except Exception as e:
            return {'eligible': False, 'error': str(e)}
    
    def get_tender_recommendations(self, tender_id: str) -> Dict:
        """Get AI recommendations for top eligible vendors"""
        top_candidates = [
            {'vendorId': 'v1', 'score': 0.92, 'reason': 'High financial health and experience'},
            {'vendorId': 'v2', 'score': 0.85, 'reason': 'Good certifications and reputation'},
            {'vendorId': 'v3', 'score': 0.78, 'reason': 'Adequate experience but needs compliance review'}
        ]
        
        return {
            'top_candidates': top_candidates,
            'risk_warnings': [
                'Vendor v4 has compliance issues',
                'Vendor v5 has inadequate experience'
            ]
        }
    
    def _fetch_vendor_data(self, vendor_id: str) -> Dict:
        """Fetch vendor data"""
        return {
            'vendorId': vendor_id,
            'financialScore': 0.85,
            'yearsInBusiness': 8,
            'completedProjects': 45,
            'certifications': ['ISO 9001', 'ISO 27001'],
            'complianceStatus': 'compliant',
            'rating': 4.5
        }
    
    def _fetch_tender_criteria(self, tender_id: str) -> Dict:
        """Fetch tender evaluation criteria"""
        return {
            'tenderId': tender_id,
            'minYearsExperience': 3,
            'requiredCertifications': ['ISO 9001'],
            'minFinancialScore': 0.6,
            'complianceRequired': True
        }
    
    def _evaluate_financial_health(self, vendor_data: Dict) -> float:
        """Evaluate vendor financial health"""
        return vendor_data.get('financialScore', 0.5)
    
    def _evaluate_experience(self, vendor_data: Dict, criteria: Dict) -> float:
        """Evaluate vendor experience"""
        years = vendor_data.get('yearsInBusiness', 0)
        required = criteria.get('minYearsExperience', 0)
        return min(years / max(required, 1) * 0.9, 1.0)
    
    def _evaluate_certifications(self, vendor_data: Dict, criteria: Dict) -> float:
        """Evaluate vendor certifications"""
        vendor_certs = set(vendor_data.get('certifications', []))
        required_certs = set(criteria.get('requiredCertifications', []))
        
        if not required_certs:
            return 0.8
        
        match_count = len(vendor_certs & required_certs)
        return (match_count / len(required_certs)) * 0.95
    
    def _evaluate_compliance(self, vendor_data: Dict) -> float:
        """Evaluate vendor compliance"""
        return 1.0 if vendor_data.get('complianceStatus') == 'compliant' else 0.5
    
    def _evaluate_reputation(self, vendor_data: Dict) -> float:
        """Evaluate vendor reputation"""
        rating = vendor_data.get('rating', 0)
        return min(rating / 5.0, 1.0)
    
    def _generate_recommendations(self, scores: Dict) -> List[str]:
        """Generate recommendations based on scores"""
        recommendations = []
        
        for criterion, score in scores.items():
            if score < 0.6:
                recommendations.append(f"Review {criterion} before engagement")
            elif score < 0.75:
                recommendations.append(f"Monitor {criterion} during contract")
        
        return recommendations
    
    def _identify_risk_factors(self, scores: Dict) -> List[str]:
        """Identify risk factors"""
        risk_factors = []
        
        for criterion, score in scores.items():
            if score < 0.5:
                risk_factors.append(f"High risk: Low {criterion} score ({score})")
        
        return risk_factors
