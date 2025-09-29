import React from 'react';

const Header = () => {
    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold">Welcome back</h1>
                <p className="text-muted">
                    Manage products, invoices and billing
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-white shadow">Y</div>
            </div>
        </header>
    );
};

export default Header;
