import React from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
    return (
        <Layout>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    Products: <div className="text-2xl font-bold">—</div>
                </div>
                <div className="card">
                    Invoices: <div className="text-2xl font-bold">—</div>
                </div>
                <div className="card">
                    Revenue: <div className="text-2xl font-bold">—</div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
