import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { Tender } from '../entities/Tender';
import { authenticate } from '../middleware/auth';

const router = Router();
const tenderRepository = AppDataSource.getRepository(Tender);

// Get all tenders
router.get('/', async (req: Request, res: Response) => {
  try {
    const tenders = await tenderRepository.find({
      relations: ['createdBy'],
      order: { createdAt: 'DESC' },
    });
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tenders' });
  }
});

// Get tender by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const tender = await tenderRepository.findOne({
      where: { id: req.params.id },
      relations: ['createdBy', 'submissions'],
    });
    if (!tender) {
      return res.status(404).json({ error: 'Tender not found' });
    }
    res.json(tender);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tender' });
  }
});

// Create tender
router.post('/', authenticate, async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { title, description, requirements, requiredDocuments, deadline, budgetMin, budgetMax, evaluationCriteria } = req.body;

    const tender = tenderRepository.create({
      title,
      description,
      requirements,
      requiredDocuments,
      deadline,
      budgetMin,
      budgetMax,
      evaluationCriteria,
      status: 'draft',
      publishedDate: new Date(),
      createdBy: { id: req.user.id },
    });

    await tenderRepository.save(tender);
    res.status(201).json({ message: 'Tender created', tender });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tender' });
  }
});

// Update tender
router.put('/:id', authenticate, async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { title, description, requirements, deadline, status, budgetMin, budgetMax } = req.body;
    await tenderRepository.update(
      { id: req.params.id },
      { title, description, requirements, deadline, status, budgetMin, budgetMax }
    );

    const tender = await tenderRepository.findOne({ where: { id: req.params.id } });
    res.json({ message: 'Tender updated', tender });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tender' });
  }
});

// Delete tender
router.delete('/:id', authenticate, async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await tenderRepository.delete({ id: req.params.id });
    res.json({ message: 'Tender deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tender' });
  }
});

// Publish tender
router.put('/:id/publish', authenticate, async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await tenderRepository.update({ id: req.params.id }, { status: 'published', publishedDate: new Date() });
    const tender = await tenderRepository.findOne({ where: { id: req.params.id } });
    res.json({ message: 'Tender published', tender });
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish tender' });
  }
});

export default router;
