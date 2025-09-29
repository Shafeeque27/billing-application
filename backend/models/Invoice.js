// Invoice model to store invoice details including items, totals, and GST information.

import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: { type: String },
    qty: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    gstPercent: { type: Number, required: true },
    totalExclGst: { type: Number, required: true }, // total excluding GST
    gstAmount: { type: Number, required: true },
    totalInclGst: { type: Number, required: true }, // total including GST
});

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    customerName: { type: String },
    customerAddress: { type: String },
    items: [itemSchema], // array of items
    subTotal: { type: Number, required: true }, // total excluding GST
    totalGst: { type: Number, required: true }, // total GST amount
    total: { type: Number, required: true }, // total including GST
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
export default Invoice;
