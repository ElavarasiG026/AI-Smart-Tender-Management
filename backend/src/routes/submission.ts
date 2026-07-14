import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { Submission } from '../entities/Submission';
import { authenticate } from '../middleware/auth';

const router = Router();
const submissionRepository = AppDataSource.getRepository(Submission);

// Get submissions by tender
router.get('/tender/:tenderId', async (req: Request, res: Response) => {
  try {
    const submissions = await submissionRepository.find({
      where: { tenderId: req.params.tenderId },
      relations: ['vendor', 'tender'],
      order: { submittedAt: 'DESC' },
    });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Get vendor submissions
router.get('/vendor/:vendorId', authenticate, async (req: any, res: Response) => {
  try {
    const submissions = await submissionRepository.find({
      where: { vendorId: req.params.vendorId },
      relations: ['tender', 'vendor'],
      order: { submittedAt: 'DESC' },
    });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Submit bid
router.post('/', authenticate, async (req: any, res: Response) => {
  try {
    const { tenderId, vendorId, quotedPrice, proposalSummary } = req.body;

    const submission = submissionRepository.create({
      tenderId,
      vendorId,
      quotedPrice,
      proposalSummary,
      status: 'submitted',
      submittedAt: new Date(),
    });

    await submissionRepository.save(submission);

    // Emit socket event
    if (req.io) {
      req.io.to(`tender-${tenderId}`).emit('submission-received', { submission, message: 'New submission received' });
    }

    res.status(201).json({ message: 'Submission created', submission });
  } catch (error) {
    res.status(500).json({ error: 'Submission failed' });
  }
});

// Update submission status
router.put('/:id/status', authenticate, async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'evaluator' && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { status, evaluationScore, evaluationComments } = req.body;
    await submissionRepository.update(
      { id: req.params.id },
      { status, evaluationScore, evaluationComments }
    );

    const submission = await submissionRepository.findOne({
      where: { id: req.params.id },
      relations: ['tender', 'vendor'],
    });

    res.json({ message: 'Submission updated', submission });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

export default router;
