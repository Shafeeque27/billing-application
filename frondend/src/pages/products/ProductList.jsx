import React from 'react';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import Search from '../../components/Search';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
            setFilteredProducts(data);
        } catch (err) {
            setError('Could not fetch products');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!search) {
                setFilteredProducts(products);
            } else {
                const lower = search.toLowerCase();
                setFilteredProducts(
                    products.filter(
                        (p) =>
                            p.name.toLowerCase().includes(lower) ||
                            String(p.price).includes(lower) ||
                            String(p.stock).includes(lower)
                    )
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search, products]);

    const handleDelete = async (id) => {
        if (!confirm('Delete this product?')) return;
        try {
            await api.delete(`/products/${id}`);
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            alert('Delete failed');
        }
    };

    return (
        <Layout>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-2">
                <h2 className="text-xl font-semibold">Products</h2>
                <Search
                    value={search}
                    onChange={setSearch}
                    placeholder="Search products..."
                />
                <Link
                    to="/products/new"
                    className="py-2 px-4 rounded bg-black text-white">
                    Add Product
                </Link>
            </div>

            {error && <div className="text-red-600">{error}</div>}

            <div className="grid md:grid-cols-1 gap-4">
                {filteredProducts.map((p) => (
                    <div key={p._id} className="card flex justify-between">
                        <h3 className="font-semibold">{p.name}</h3>

                        <p className="mt-2">Stock: {p.stock}</p>
                        <p className="mt-2">Price: ₹{p.price.toFixed(2)}</p>

                        <div className="mt-4 flex gap-2">
                            <Link
                                to={`/products/${p._id}/edit`}
                                className="py-1 px-3 rounded border cursor-pointer">
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(p._id)}
                                className="py-1 px-3 rounded bg-red-500 text-white cursor-pointer">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {filteredProducts.length === 0 && (
                    <div className="text-gray-500">No products found.</div>
                )}
            </div>
        </Layout>
    );
};

export default ProductList;
