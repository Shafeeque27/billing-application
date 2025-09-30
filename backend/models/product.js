// Product model definition using Mongoose. Includes fields for name, SKU, price, GST, stock, and description.

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        gst: { type: Number, default: 0 }, // GST percentage
        stock: { type: Number, default: 0, min: 0 }, // Available stock quantity
        description: { type: String },
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const Product = mongoose.model('Product', productSchema);
export default Product;
