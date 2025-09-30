import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Layout from '../../components/Layout';

const InvoiceView = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get(`/invoices/${id}`)
            .then((r) => setInvoice(r.data))
            .catch(() => {});
    }, [id]);

    // View PDF in browser
    const viewPdf = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/invoices/${id}/pdf`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(
                new Blob([response.data], { type: 'application/pdf' })
            );
            window.open(url, '_blank');
        } catch (error) {
            alert('Failed to open PDF');
        } finally {
            setLoading(false);
        }
    };

    // Download PDF securely
    const downloadPdf = async () => {
        try {
            const response = await api.get(`/invoices/${id}/pdf`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch {
            alert('Failed to download PDF');
        }
    };

    if (!invoice)
        return (
            <Layout>
                <div className="text-center py-20 text-gray-500 text-lg">
                    Loading Invoice...
                </div>
            </Layout>
        );

    return (
        <Layout>
            <div className="bg-white shadow-xl rounded-xl p-6 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">
                            Invoice {invoice.invoiceNumber}
                        </h3>
                        <div className="text-gray-500 mt-1">
                            {new Date(invoice.date).toLocaleString()}
                        </div>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <button
                            onClick={viewPdf}
                            disabled={loading}
                            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition-transform duration-200">
                            {loading && (
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                            )}
                            {loading ? 'Processing...' : 'View PDF'}
                        </button>
                        <button
                            onClick={downloadPdf}
                            className="py-2 px-4 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-200 font-semibold">
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="mb-6 space-y-1 text-gray-700">
                    <div>
                        <span className="font-semibold">Customer:</span>{' '}
                        {invoice.customerName}
                    </div>
                    <div>
                        <span className="font-semibold">Address:</span>{' '}
                        {invoice.customerAddress}
                    </div>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                            <th className="py-2 px-3 rounded-tl-lg">Product</th>
                            <th className="py-2 px-3">Qty</th>
                            <th className="py-2 px-3">Unit</th>
                            <th className="py-2 px-3">GST%</th>
                            <th className="py-2 px-3 text-right rounded-tr-lg">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((it) => (
                            <tr
                                key={it._id}
                                className="border-b hover:bg-gray-50 transition-colors">
                                <td className="py-2 px-3">{it.name}</td>
                                <td className="py-2 px-3">{it.qty}</td>
                                <td className="py-2 px-3">
                                    ₹{it.unitPrice.toFixed(2)}
                                </td>
                                <td className="py-2 px-3">{it.gstPercent}%</td>
                                <td className="py-2 px-3 text-right">
                                    ₹{it.totalInclGst.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-6 text-right space-y-1 text-gray-700">
                    <div>Subtotal: ₹{invoice.subTotal.toFixed(2)}</div>
                    <div>Total GST: ₹{invoice.totalGst.toFixed(2)}</div>
                    <div className="text-2xl font-bold text-gray-900">
                        Grand Total: ₹{invoice.total.toFixed(2)}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default InvoiceView;
