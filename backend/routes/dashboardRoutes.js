import express from 'express';
import Product from '../models/product.js';
import Invoice from '../models/Invoice.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const productsCount = await Product.countDocuments();
        const invoices = await Invoice.find();

        const invoicesCount = invoices.length;
        const revenue = invoices.reduce((sum, inv) => sum + inv.total, 0);

        return res.json({ productsCount, invoicesCount, revenue });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Failed to load dashboard data' });
    }
});

export default router;
