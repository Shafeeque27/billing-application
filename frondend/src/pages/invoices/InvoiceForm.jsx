import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Fetch products for item selection
    useEffect(() => {
        api.get('/products')
            .then((r) => setProducts(r.data))
            .catch(() => {});
    }, []);

    const addItem = () =>
        setItems((prev) => [...prev, { product: '', qty: 1 }]);

    const updateItem = (index, key, value) => {
        const copy = [...items];
        copy[index][key] = value;
        setItems(copy);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/invoices', {
                customerName,
                customerAddress,
                items,
            });
            navigate('/invoices');
        } catch (err) {
            alert('Create failed');
        }
    };

    return (
        <Layout>
            <div className="card max-w-3xl">
                <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Customer Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="p-3 border rounded"
                            required
                        />
                        <input
                            placeholder="Customer Address"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="p-3 border rounded"
                        />
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Items</h3>
                        <div className="space-y-2">
                            {items.map((it, idx) => (
                                <div
                                    key={idx}
                                    className="p-3 border rounded flex gap-2">
                                    <select
                                        className="flex-1 p-2 border rounded"
                                        value={it.product}
                                        onChange={(e) =>
                                            updateItem(
                                                idx,
                                                'product',
                                                e.target.value
                                            )
                                        }>
                                        <option value="">Select product</option>
                                        {products.map((p) => (
                                            <option key={p._id} value={p._id}>
                                                {p.name} — ₹{p.price}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        min="1"
                                        value={it.qty}
                                        onChange={(e) =>
                                            updateItem(
                                                idx,
                                                'qty',
                                                Number(e.target.value)
                                            )
                                        }
                                        className="w-24 p-2 border rounded"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={addItem}
                                className="py-2 px-3 rounded border">
                                Add Item
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button className="py-2 px-4 rounded bg-black text-white">
                            Create
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/invoices')}
                            className="py-2 px-4 rounded border">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default InvoiceForm;
