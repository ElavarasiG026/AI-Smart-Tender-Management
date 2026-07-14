import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/config';
import { Document } from '../entities/Document';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = Router();
const documentRepository = AppDataSource.getRepository(Document);

// Configure multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// Upload document
router.post('/upload', authenticate, upload.single('file'), async (req: any, res: Response) => {
  try {
    const { vendorId, submissionId, tenderId, documentType } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const document = documentRepository.create({
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileUrl: `uploads/${req.file.filename}`,
      uploadedBy: req.user.id,
      vendorId,
      submissionId,
      tenderId,
      verificationStatus: 'pending',
    });

    await documentRepository.save(document);

    // Send to AI service for verification
    try {
      const axios = require('axios');
      const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/api/verify-document`, {
        documentId: document.id,
        filePath: document.fileUrl,
        documentType,
      });

      document.aiAnalysis = aiResponse.data;
      document.verificationStatus = aiResponse.data.status || 'verified';
      await documentRepository.save(document);
    } catch (aiError) {
      console.error('AI verification failed:', aiError);
    }

    res.status(201).json({ message: 'Document uploaded', document });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get document
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const document = await documentRepository.findOne({ where: { id: req.params.id } });
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.download(document.fileUrl);
  } catch (error) {
    res.status(500).json({ error: 'Download failed' });
  }
});

// Get vendor documents
router.get('/vendor/:vendorId', async (req: Request, res: Response) => {
  try {
    const documents = await documentRepository.find({
      where: { vendorId: req.params.vendorId },
      order: { uploadedAt: 'DESC' },
    });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// Delete document
router.delete('/:id', authenticate, async (req: any, res: Response) => {
  try {
    await documentRepository.delete({ id: req.params.id });
    res.json({ message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

export default router;
