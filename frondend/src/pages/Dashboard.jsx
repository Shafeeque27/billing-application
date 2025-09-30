import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { FaBox, FaFileInvoiceDollar, FaMoneyBillWave } from 'react-icons/fa';

const Dashboard = () => {
    const [stats, setStats] = useState({
        productsCount: 0,
        invoicesCount: 0,
        revenue: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const { data } = await api.get('/dashboard');
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="text-center text-gray-500 text-lg py-20">
                    Loading Dashboard...
                </div>
            </Layout>
        );
    }

    const cards = [
        {
            title: 'Products',
            value: stats.productsCount,
            icon: <FaBox className="text-3xl text-indigo-500" />,
            color: 'bg-indigo-50',
        },
        {
            title: 'Invoices',
            value: stats.invoicesCount,
            icon: <FaFileInvoiceDollar className="text-3xl text-green-500" />,
            color: 'bg-green-50',
        },
        {
            title: 'Revenue',
            value: `₹${stats.revenue.toFixed(2)}`,
            icon: <FaMoneyBillWave className="text-3xl text-yellow-500" />,
            color: 'bg-yellow-50',
        },
    ];

    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className={`flex items-center gap-4 p-6 rounded-xl shadow-md hover:shadow-xl transition ${card.color}`}>
                        <div>{card.icon}</div>
                        <div>
                            <div className="text-gray-500 font-medium">
                                {card.title}
                            </div>
                            <div className="text-2xl font-bold mt-1">
                                {card.value}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Dashboard;
