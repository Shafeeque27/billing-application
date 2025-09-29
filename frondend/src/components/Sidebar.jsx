import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const linkClass = ({ isActive }) =>
        `block py-2 px-4 rounded-lg ${
            isActive
                ? 'bg-accent/20 text-accent'
                : 'text-slate-700 hover:bg-slate-100'
        }`;

    return (
        <aside className="w-64 p-6 bg-white border-r">
            <h2 className="text-xl font-bold text-primary">Billing Application</h2>
            <nav className="mt-6 space-y-2">
                <NavLink to="/" className={linkClass} end>
                    Dashboard
                </NavLink>
                <NavLink to="/products" className={linkClass}>
                    Products
                </NavLink>
                <NavLink to="/invoices" className={linkClass}>
                    Invoices
                </NavLink>
            </nav>
            <div className="mt-6">
                <button
                    onClick={logout}
                    className="w-full py-2 rounded-lg bg-red-500 text-white">
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
