import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        api.get('/invoices')
            .then((i) => {
                setInvoices(i.data);
                setFilteredInvoices(i.data);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!search) {
                setFilteredInvoices(invoices);
            } else {
                const lower = search.toLowerCase();
                setFilteredInvoices(
                    invoices.filter(
                        (i) =>
                            i.invoiceNumber.toLowerCase().includes(lower) ||
                            i.customerName.toLowerCase().includes(lower)
                    )
                );
            }
        }, 300);
    }, [search, invoices]);

    return (
        <Layout>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
                <h2 className="text-xl font-semibold">Invoices</h2>
                <Search
                    value={search}
                    onChange={setSearch}
                    placeholder="Search invoices..."
                />
                <Link
                    to="/invoices/new"
                    className="py-2 px-4 rounded bg-black text-white">
                    Create Invoice
                </Link>
            </div>

            <div className="space-y-4">
                {filteredInvoices.map((inv) => (
                    <div
                        key={inv._id}
                        className="card flex justify-between items-center">
                        <div>
                            <div className="font-semibold">
                                {inv.invoiceNumber}
                            </div>
                            <div className="text-muted">
                                {new Date(inv.date).toLocaleDateString()} •{' '}
                                {inv.customerName}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                to={`/invoices/${inv._id}`}
                                className="py-1 px-4 rounded-full border bg-black text-white">
                                View
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default InvoiceList;
