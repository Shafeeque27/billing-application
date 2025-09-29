import React from 'react';

const Search = ({ value, onChange, placeholder = 'Search...' }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="p-2 border rounded w-full md:w-1/3"
        />
    );
};

export default Search;
