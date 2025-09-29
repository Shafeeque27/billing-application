import { useEffect, useState } from 'react';

export default function useAuth() {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        setUser(token ? { token } : null);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ token });
    };
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return { user, login, logout };
}
