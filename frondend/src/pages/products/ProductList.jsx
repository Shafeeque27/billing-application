import React, { useEffect, useState } from 'react';
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
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3">
                <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                <Search
                    value={search}
                    onChange={setSearch}
                    placeholder="Search products..."
                />
                <Link
                    to="/products/new"
                    className="py-2 px-5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    Add Product
                </Link>
            </div>

            {error && <div className="text-red-600 mb-4">{error}</div>}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                    <div
                        key={p._id}
                        className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 capitalize">
                                {p.name}
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Stock: {p.stock}
                            </p>
                            <p className="mt-1 text-gray-600">
                                Price: ₹{p.price.toFixed(2)}
                            </p>
                        </div>

                        <div className="mt-4 flex gap-2">
                            <Link
                                to={`/products/${p._id}/edit`}
                                className="flex-1 py-2 px-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-center font-semibold shadow-md transition transform hover:scale-105">
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(p._id)}
                                className="flex-1 py-2 px-4 rounded-full text-white font-semibold
             bg-gradient-to-r from-gray-700 via-gray-500 to-gray-400
             hover:from-gray-800 hover:via-gray-600 hover:to-gray-500
             shadow-md hover:shadow-lg hover:scale-105
             transition-all duration-300">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {filteredProducts.length === 0 && (
                    <div className="text-gray-500 col-span-full text-center py-10">
                        No products found.
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default ProductList;
