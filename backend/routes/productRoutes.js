// Description: Routes for product-related operations

import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Routes for product operations
router
    .route('/')
    .get(authMiddleware, getProducts)
    .post(authMiddleware, createProduct);

router
    .route('/:id')
    .get(authMiddleware, getProductById)
    .put(authMiddleware, updateProduct)
    .delete(authMiddleware, deleteProduct);

export default router;
