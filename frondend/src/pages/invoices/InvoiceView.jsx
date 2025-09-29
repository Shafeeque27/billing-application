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

    // view PDF
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

    // Secure PDF download
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
        } catch (err) {
            alert('Failed to download PDF');
        }
    };

    if (!invoice)
        return (
            <Layout>
                <div className="card">Loading...</div>
            </Layout>
        );

    return (
        <Layout>
            <div className="card max-w-3xl">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold">
                            Invoice {invoice.invoiceNumber}
                        </h3>
                        <div className="text-muted">
                            {new Date(invoice.date).toLocaleString()}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={viewPdf}
                            className="py-2 px-3 rounded bg-black text-white"
                            disabled={loading}>
                            {loading && (
                                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                            )}
                            {loading ? 'Processing...' : 'View PDF'}
                        </button>
                        <button
                            onClick={downloadPdf}
                            className="py-2 px-3 rounded bg-black text-white">
                            Download PDF
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <div>
                        Customer: <strong>{invoice.customerName}</strong>
                    </div>
                    <div>Address: {invoice.customerAddress}</div>
                </div>

                <table className="w-full mt-4 border-collapse">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="py-2">Product</th>
                            <th>Qty</th>
                            <th>Unit</th>
                            <th>GST%</th>
                            <th className="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((it) => (
                            <tr key={it._id} className="border-b">
                                <td className="py-2">{it.name}</td>
                                <td>{it.qty}</td>
                                <td>₹{it.unitPrice.toFixed(2)}</td>
                                <td>{it.gstPercent}%</td>
                                <td className="text-right">
                                    ₹{it.totalInclGst.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-4 text-right space-y-1">
                    <div>Subtotal: ₹{invoice.subTotal.toFixed(2)}</div>
                    <div>Total GST: ₹{invoice.totalGst.toFixed(2)}</div>
                    <div className="text-xl font-bold">
                        Grand Total: ₹{invoice.total.toFixed(2)}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default InvoiceView;
