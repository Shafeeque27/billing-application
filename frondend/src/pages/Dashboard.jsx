import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';

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
        console.log(stats.productsCount);
        
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="text-center">Loading Dashboard...</div>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    Products:
                    <div className="text-2xl font-bold">
                        {stats.productsCount}
                    </div>
                </div>
                <div className="card">
                    Invoices:
                    <div className="text-2xl font-bold">
                        {stats.invoicesCount}
                    </div>
                </div>
                <div className="card">
                    Revenue:
                    <div className="text-2xl font-bold">
                        {stats.revenue.toFixed(2)}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
