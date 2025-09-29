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
            <div className="card max-w-xl">
                <h2 className="text-xl font-semibold mb-4">
                    {id ? 'Edit' : 'Add'} Product
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                        required
                    />
                    
                    <input
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                        required
                    />
                    <input
                        name="gst"
                        type="number"
                        placeholder="GST %"
                        value={form.gst}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />
                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full p-3 border rounded"
                    />
                    <div className="flex gap-2">
                        <button className="py-2 px-4 rounded bg-black text-white">
                            Save
                        </button>
                        <button
                            type="button"
                            className="py-2 px-4 rounded border"
                            onClick={() => navigate('/products')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ProductForm;
