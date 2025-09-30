import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import Layout from '../../components/Layout';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        price: '',
        gst: '',
        stock: '',
        description: '',
    });

    useEffect(() => {
        if (id) {
            api.get(`/products/${id}`)
                .then((r) =>
                    setForm({
                        name: r.data.name,
                        price: r.data.price,
                        gst: r.data.gst,
                        stock: r.data.stock,
                        description: r.data.description || '',
                    })
                )
                .catch(() => {});
        }
    }, [id]);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) await api.put(`/products/${id}`, form);
            else await api.post('/products', form);
            navigate('/products');
        } catch (err) {
            alert('Save failed');
        }
    };

    return (
        <Layout>
            <div className="max-w-xl mx-auto">
                <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {id ? 'Edit' : 'Add'} Product
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="name"
                            placeholder="Product Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            required
                        />
                        <input
                            name="price"
                            type="number"
                            step="0.01"
                            placeholder="Price (₹)"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            required
                        />
                        <input
                            name="gst"
                            type="number"
                            placeholder="GST %"
                            value={form.gst}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                        <input
                            name="stock"
                            type="number"
                            placeholder="Stock Quantity"
                            value={form.stock}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                            rows={4}
                        />
                        <div className="flex gap-3 mt-4">
                            <button className="flex-1 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/products')}
                                className="flex-1 py-3 border rounded-lg hover:bg-gray-100 transition">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default ProductForm;
