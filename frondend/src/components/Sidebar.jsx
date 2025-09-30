import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const linkClass = ({ isActive }) =>
        `flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
            isActive
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-slate-700 hover:bg-slate-100 hover:text-blue-600'
        }`;

    return (
        <aside className="w-64 h-screen p-6 bg-white shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Billing App
            </h2>
            <nav className="flex-1 space-y-2">
                <NavLink to="/" className={linkClass} end>
                    🏠 Dashboard
                </NavLink>
                <NavLink to="/products" className={linkClass}>
                    📦 Products
                </NavLink>
                <NavLink to="/invoices" className={linkClass}>
                    🧾 Invoices
                </NavLink>
            </nav>
            <div className="mt-6">
                <button
                    onClick={logout}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white font-semibold shadow-md transition transform hover:scale-105">
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
