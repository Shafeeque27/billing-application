import express from 'express';
import {
    createInvoice,
    getInvoices,
    getInvoiceById,
    downloadInvoicePDF,
} from '../controllers/invoiceController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET all invoices / CREATE new invoice
router
    .route('/')
    .get(authMiddleware, getInvoices)
    .post(authMiddleware, createInvoice);

// GET single invoice by ID
router.route('/:id').get(authMiddleware, getInvoiceById);

// GET invoice as PDF
router.get('/:id/pdf', authMiddleware, downloadInvoicePDF);

export default router;
