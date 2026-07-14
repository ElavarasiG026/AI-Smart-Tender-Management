import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { Contract } from '../entities/Contract';
import { authenticate } from '../middleware/auth';

const router = Router();
const contractRepository = AppDataSource.getRepository(Contract);

// Get all contracts
router.get('/', async (req: Request, res: Response) => {
  try {
    const contracts = await contractRepository.find({
      relations: ['tender', 'vendor'],
      order: { createdAt: 'DESC' },
    });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contracts' });
  }
});

// Get contract by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const contract = await contractRepository.findOne({
      where: { id: req.params.id },
      relations: ['tender', 'vendor'],
    });
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contract' });
  }
});

// Create contract
router.post('/', authenticate, async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { contractNumber, title, description, contractDocument, startDate, endDate, contractValue, terms, milestones, tenderId, vendorId } = req.body;

    const contract = contractRepository.create({
      contractNumber,
      title,
      description,
      contractDocument,
      startDate,
      endDate,
      contractValue,
      terms,
      milestones,
      status: 'draft',
      tender: { id: tenderId },
      vendor: { id: vendorId },
    });

    await contractRepository.save(contract);
    res.status(201).json({ message: 'Contract created', contract });
  } catch (error) {
    res.status(500).json({ error: 'Creation failed' });
  }
});

// Update contract status
router.put('/:id/status', authenticate, async (req: any, res: Response) => {
  try {
    const { status } = req.body;
    await contractRepository.update({ id: req.params.id }, { status });

    const contract = await contractRepository.findOne({
      where: { id: req.params.id },
      relations: ['tender', 'vendor'],
    });

    res.json({ message: 'Contract updated', contract });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Get contracts by vendor
router.get('/vendor/:vendorId', async (req: Request, res: Response) => {
  try {
    const contracts = await contractRepository.find({
      where: { vendor: { id: req.params.vendorId } },
      relations: ['tender', 'vendor'],
      order: { createdAt: 'DESC' },
    });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contracts' });
  }
});

export default router;
