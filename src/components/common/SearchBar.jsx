import React from 'react';
import { useDashboard } from '../../context/DashboardContext';

export function SearchBar() {
  const { state, dispatch } = useDashboard();
  const { searchQuery } = state;

  const handleChange = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const handleClear = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
  };

  return (
    <div className="search-container">
      <span className="search-icon" aria-hidden="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="text"
        className="search-input"
        placeholder="Search tasks and notes..."
        value={searchQuery}
        onChange={handleChange}
        aria-label="Search tasks and notes"
      />
      {searchQuery && (
        <button
          className="btn-icon"
          onClick={handleClear}
          aria-label="Clear search"
          style={{
            position: 'absolute',
            right: '0.5rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
}
