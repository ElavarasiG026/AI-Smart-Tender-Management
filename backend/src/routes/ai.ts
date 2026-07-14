import { Router, Request, Response } from 'express';
import axios from 'axios';
import { authenticate } from '../middleware/auth';

const router = Router();

// Analyze documents
router.post('/analyze-documents', authenticate, async (req: any, res: Response) => {
  try {
    const { documentIds, vendorId } = req.body;

    const response = await axios.post(`${process.env.AI_SERVICE_URL}/api/analyze-documents`, {
      documentIds,
      vendorId,
    });

    res.json({
      message: 'Documents analyzed',
      analysis: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

// Evaluate vendor eligibility
router.post('/evaluate-eligibility', authenticate, async (req: any, res: Response) => {
  try {
    const { vendorId, tenderId } = req.body;

    const response = await axios.post(`${process.env.AI_SERVICE_URL}/api/evaluate-eligibility`, {
      vendorId,
      tenderId,
    });

    res.json({
      message: 'Eligibility evaluated',
      evaluation: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Evaluation failed' });
  }
});

// Analyze contracts
router.post('/analyze-contracts', authenticate, async (req: any, res: Response) => {
  try {
    const { contractId } = req.body;

    const response = await axios.post(`${process.env.AI_SERVICE_URL}/api/analyze-contracts`, {
      contractId,
    });

    res.json({
      message: 'Contract analyzed',
      analysis: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

// Get AI recommendations
router.get('/recommendations/:tenderId', authenticate, async (req: any, res: Response) => {
  try {
    const response = await axios.get(`${process.env.AI_SERVICE_URL}/api/recommendations/${req.params.tenderId}`);

    res.json({
      message: 'Recommendations retrieved',
      recommendations: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

export default router;
