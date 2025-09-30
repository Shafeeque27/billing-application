import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [search, setSearch] = useState('');

    // Fetch all invoices
    useEffect(() => {
        api.get('/invoices')
            .then((i) => {
                setInvoices(i.data);
                setFilteredInvoices(i.data);
            })
            .catch(() => {});
    }, []);

    // Filter invoices with debounce
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

        return () => clearTimeout(timer);
    }, [search, invoices]);

    return (
        <Layout>
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                <h2 className="text-3xl font-bold text-gray-800">Invoices</h2>
                <Search
                    value={search}
                    onChange={setSearch}
                    placeholder="Search invoices..."
                />
                <Link
                    to="/invoices/new"
                    className="py-2 px-5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition-transform duration-200">
                    Create Invoice
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((inv) => (
                        <div
                            key={inv._id}
                            className="bg-white rounded-xl shadow-lg p-5 flex justify-between items-center hover:shadow-2xl transition-shadow duration-300">
                            <div>
                                <div className="font-semibold text-lg text-gray-800">
                                    {inv.invoiceNumber}
                                </div>
                                <div className="text-gray-500 mt-1">
                                    {new Date(inv.date).toLocaleDateString()} •{' '}
                                    {inv.customerName}
                                </div>
                            </div>
                            <div>
                                <Link
                                    to={`/invoices/${inv._id}`}
                                    className="py-2 px-5 rounded-full bg-gray-700 text-white font-semibold 
             shadow-md hover:bg-gray-800 hover:shadow-lg hover:scale-105 
             transition-all duration-300">
                                    View
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 mt-10 text-lg">
                        No invoices found.
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default InvoiceList;
