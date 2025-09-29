// controllers/invoiceController.js
import Invoice from '../models/Invoice.js';
import Product from '../models/product.js';
import PDFDocument from 'pdfkit';

// Generate a unique invoice number
const generateInvoiceNumber = async () => {
    const count = await Invoice.countDocuments();
    return `INV-${String(count + 1).padStart(5, '0')}`;
};

// @desc    Create a new invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
    try {
        const { customerName, customerAddress, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items provided' });
        }

        let subTotal = 0;
        let totalGst = 0;
        const processedItems = [];

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res
                    .status(404)
                    .json({
                        message: `Product with ID ${item.product} not found`,
                    });
            }

            const qty = Number(item.qty || 0);
            const unitPrice = Number(product.price);
            const gstPercent = Number(product.gst || 0);

            const totalExclGst = +(unitPrice * qty).toFixed(2);
            const gstAmount = +((totalExclGst * gstPercent) / 100).toFixed(2);
            const totalInclGst = +(totalExclGst + gstAmount).toFixed(2);

            subTotal += totalExclGst;
            totalGst += gstAmount;

            processedItems.push({
                product: product._id,
                name: product.name,
                qty,
                unitPrice,
                gstPercent,
                totalExclGst,
                gstAmount,
                totalInclGst,
            });
        }

        const total = +(subTotal + totalGst).toFixed(2);
        const invoiceNumber = await generateInvoiceNumber();

        const newInvoice = new Invoice({
            invoiceNumber,
            customerName,
            customerAddress,
            items: processedItems,
            subTotal,
            totalGst,
            total,
        });

        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ date: -1 });
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get single invoice by ID
// @route   GET /api/invoices/:id
// @access  Private
const getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Download invoice as PDF
// @route   GET /api/invoices/:id/pdf
// @access  Private
const downloadInvoicePDF = async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader(
            'Content-Disposition',
            `attachment; filename=invoice_${invoice.invoiceNumber}.pdf`
        );
        res.setHeader('Content-Type', 'application/pdf');

        doc.pipe(res);

        // Header
        doc.fontSize(20).text(`Invoice #${invoice.invoiceNumber}`, {
            align: 'center',
        });
        doc.moveDown();
        doc.fontSize(12).text(`Date: ${invoice.date.toDateString()}`);
        doc.text(`Customer: ${invoice.customerName}`);
        doc.text(`Address: ${invoice.customerAddress}`);
        doc.moveDown();

        // Table Header
        doc.fontSize(12).text(
            'Product           Qty    Unit Price    GST%    Total (Incl GST)'
        );
        doc.moveDown();

        // Table Rows
        invoice.items.forEach((item) => {
            doc.text(
                `${item.name}           ${item.qty}    ${item.unitPrice.toFixed(
                    2
                )}    ${item.gstPercent}%    ${item.totalInclGst.toFixed(2)}`
            );
        });

        doc.moveDown();
        doc.text(`Subtotal: ${invoice.subTotal.toFixed(2)}`, {
            align: 'right',
        });
        doc.text(`Total GST: ${invoice.totalGst.toFixed(2)}`, {
            align: 'right',
        });
        doc.text(`Grand Total: ${invoice.total.toFixed(2)}`, {
            align: 'right',
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export { createInvoice, getInvoices, getInvoiceById, downloadInvoicePDF };
