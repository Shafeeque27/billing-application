import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [items, setItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    // Fetch products
    useEffect(() => {
        api.get('/products')
            .then((r) => setProducts(r.data))
            .catch(() => {});
    }, []);

    // Calculate invoice total whenever items change
    useEffect(() => {
        let sum = 0;
        items.forEach((it) => {
            const product = products.find((p) => p._id === it.product);
            if (product) sum += product.price * it.qty;
        });
        setTotal(sum);
    }, [items, products]);

    const addItem = () =>
        setItems((prev) => [...prev, { product: '', qty: 1 }]);

    const updateItem = (index, key, value) => {
        const copy = [...items];
        copy[index][key] = value;
        setItems(copy);
    };

    const removeItem = (index) => {
        const copy = [...items];
        copy.splice(index, 1);
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
            alert('Failed to create invoice');
        }
    };

    return (
        <Layout>
            <div className="card max-w-3xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6">Create Invoice</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Customer Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="p-3 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                        <input
                            placeholder="Customer Address"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="p-3 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    {/* Invoice Items */}
                    <div>
                        <h3 className="font-semibold mb-2">Items</h3>
                        <div className="space-y-2">
                            {items.map((it, idx) => {
                                const product = products.find(
                                    (p) => p._id === it.product
                                );
                                const itemTotal = product
                                    ? product.price * it.qty
                                    : 0;
                                return (
                                    <div
                                        key={idx}
                                        className="p-3 border rounded flex gap-2 items-center">
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
                                            <option value="">
                                                Select product
                                            </option>
                                            {products.map((p) => (
                                                <option
                                                    key={p._id}
                                                    value={p._id}>
                                                    {p.name} — ₹
                                                    {p.price.toFixed(2)}
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
                                            className="w-24 p-2 border rounded text-center"
                                        />
                                        <span className="w-24 text-right font-medium">
                                            ₹{itemTotal.toFixed(2)}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeItem(idx)}
                                            className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600">
                                            ✕
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            type="button"
                            onClick={addItem}
                            className="mt-2 py-2 px-4 rounded border hover:bg-slate-100 transition">
                            + Add Item
                        </button>
                    </div>

                    {/* Total & Actions */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-xl font-bold">
                            Total: ₹{total.toFixed(2)}
                        </div>
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="py-2 px-4 rounded bg-black text-white hover:bg-gray-800 transition">
                                Create
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/invoices')}
                                className="py-2 px-4 rounded border hover:bg-slate-100 transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default InvoiceForm;
