// Description: Controller for handling product-related operations (CRUD).

import Product from '../models/product.js';

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
    const { name, price, gst, stock, description } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: 'Name and Price are required' });
    }

    const product = new Product({
        name,
        price,
        gst: gst || 0,
        stock: stock || 0,
        description,
    });

    try {
        const createdProduct = await product.save();
        return res.status(201).json(createdProduct);
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Private
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        return res.json(products);
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(product);
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
    const { name, price, gst, stock, description } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not Found' });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.gst = gst || product.gst;
        product.stock = stock || product.stock;
        product.description = description || product.description;

        const updatedProduct = await product.save();
        return res.json(updatedProduct);
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not Found' });
        }

        await Product.deleteOne({ _id: req.params.id });
        return res.json({ message: 'Product Deleted' });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Server Error', error: error.message });
    }
};

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
