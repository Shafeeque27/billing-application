import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex bg-slate-50">
            <Sidebar />
            <div className="flex-1 p-6">
                <Header />
                <main className="mt-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
