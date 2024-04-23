// SearchBar.js
import React from 'react';
import './Search.css';
import { useEffect } from 'react';

const SearchBar = ({ disabled, onFocus, onBlur, searchOnChangeHandler, handleSearch }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    /**
     * Event handler for keyboard shortcut
     */
    useEffect(() => {
        const handleShortcut = (e) => {
            // Check if the pressed key is '/'
            if (e.key === '/' && e.ctrlKey) {
                handleSearch();
            }
        };

        // Added event listener for 'keydown' event
        document.addEventListener('keydown', handleShortcut);

        // Remove event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleShortcut);
        };
    }, [handleSearch]);
    return (
        <div className={`search-bar ${disabled ? 'disabled' : ''}`}>
            <input
                type="text"
                placeholder="Search..."
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
                onChange={(e) => searchOnChangeHandler(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <div className="table-controls">ctrl+/</div>
        </div>
    );
};

export default SearchBar;
