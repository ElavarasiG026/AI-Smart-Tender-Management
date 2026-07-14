import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { Vendor } from '../entities/Vendor';
import { authenticate } from '../middleware/auth';

const router = Router();
const vendorRepository = AppDataSource.getRepository(Vendor);

// Get all vendors
router.get('/', async (req: Request, res: Response) => {
  try {
    const vendors = await vendorRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors' });
  }
});

// Get vendor by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const vendor = await vendorRepository.findOne({
      where: { id: req.params.id },
      relations: ['user', 'documents', 'submissions'],
    });
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendor' });
  }
});

// Register vendor
router.post('/register', authenticate, async (req: any, res: Response) => {
  try {
    const { companyName, registrationNumber, phone, address, city, country, certifications, description } = req.body;

    const existingVendor = await vendorRepository.findOne({ where: { email: req.user.email } });
    if (existingVendor) {
      return res.status(409).json({ error: 'Vendor already registered' });
    }

    const vendor = vendorRepository.create({
      companyName,
      registrationNumber,
      email: req.user.email,
      phone,
      address,
      city,
      country,
      certifications,
      description,
      status: 'pending',
      user: { id: req.user.id },
    });

    await vendorRepository.save(vendor);
    res.status(201).json({ message: 'Vendor registered', vendor });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Update vendor profile
router.put('/:id', authenticate, async (req: any, res: Response) => {
  try {
    const { companyName, phone, address, city, country, description } = req.body;
    await vendorRepository.update(
      { id: req.params.id },
      { companyName, phone, address, city, country, description }
    );

    const vendor = await vendorRepository.findOne({ where: { id: req.params.id } });
    res.json({ message: 'Vendor updated', vendor });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Approve vendor
router.put('/:id/approve', authenticate, async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await vendorRepository.update({ id: req.params.id }, { status: 'approved' });
    const vendor = await vendorRepository.findOne({ where: { id: req.params.id } });
    res.json({ message: 'Vendor approved', vendor });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Reject vendor
router.put('/:id/reject', authenticate, async (req: any, res: Response) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await vendorRepository.update({ id: req.params.id }, { status: 'rejected' });
    const vendor = await vendorRepository.findOne({ where: { id: req.params.id } });
    res.json({ message: 'Vendor rejected', vendor });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

export default router;
