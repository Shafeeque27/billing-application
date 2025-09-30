// import React from 'react';

const Search = ({ value, onChange, placeholder = 'Search...' }) => {
    return (
        <div className="relative w-full md:w-1/3">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            />
            {/* Search Icon */}
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
            </span>
        </div>
    );
};

export default Search;
