import React from 'react';
import { SearchBar } from '../common/SearchBar';
import { ThemeToggle } from '../common/ThemeToggle';

export function Header() {
  return (
    <header className="app-header">
      <div className="app-header-top animate-fade-in">
        <div className="brand-section">
          {/* Logo SVG */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: 'var(--primary)' }}
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <h1 className="brand-title">SmartBoard</h1>
        </div>
        <div className="app-header-controls">
          <ThemeToggle />
        </div>
      </div>
      <div className="animate-fade-in" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <SearchBar />
      </div>
    </header>
  );
}
