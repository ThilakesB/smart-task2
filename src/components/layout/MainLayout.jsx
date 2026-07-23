import React from 'react';
import { SearchBar } from '../common/SearchBar';
import { ThemeToggle } from '../common/ThemeToggle';

export function MainLayout({ activeTab, onTabChange, children }) {
  // Simple Initials Avatar "UT" for User Tasker
  const avatarInitials = "UT";

  return (
    <div className="app-workspace-container">
      {/* 1. Left Sidebar Navigation Panel */}
      <aside className="app-sidebar" aria-label="Main Navigation">
        <div className="sidebar-brand-section">
          {/* Logo Icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ color: 'var(--text-primary)' }}
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span className="sidebar-brand-title">SmartBoard</span>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            <li>
              <button
                className={`sidebar-link ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => onTabChange('home')}
                aria-current={activeTab === 'home' ? 'page' : undefined}
              >
                {/* Home Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Home</span>
              </button>
            </li>
            <li>
              <button
                className={`sidebar-link ${activeTab === 'tasks' ? 'active' : ''}`}
                onClick={() => onTabChange('tasks')}
                aria-current={activeTab === 'tasks' ? 'page' : undefined}
              >
                {/* Task Checklist Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 11-2 2 4 4L19 7" />
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                </svg>
                <span>Tasks</span>
              </button>
            </li>
            <li>
              <button
                className={`sidebar-link ${activeTab === 'notes' ? 'active' : ''}`}
                onClick={() => onTabChange('notes')}
                aria-current={activeTab === 'notes' ? 'page' : undefined}
              >
                {/* Note Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8.5L15.5 3Z" />
                  <path d="M15 3v6h6" />
                </svg>
                <span>Sticky Notes</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="sidebar-footer">
          <div className="sidebar-theme-row">
            <span className="theme-label-text">Theme Mode</span>
            <ThemeToggle />
          </div>
          <span className="sidebar-footer-tag">v1.1.0</span>
        </div>
      </aside>

      {/* 2. Main Content Wrapper */}
      <div className="app-main-viewport">
        {/* Top Header Bar */}
        <header className="viewport-header animate-fade-in">
          <div className="viewport-header-greeting">
            <h1 className="greeting-title">Hello, Dmytro</h1>
            <p className="greeting-subtitle">Here is your current productivity overview.</p>
          </div>
          
          <div className="viewport-header-actions">
            {/* Unified Search Input */}
            <SearchBar />

            {/* Profile Avatar Badge */}
            <div 
              className="user-profile-avatar" 
              role="img" 
              aria-label="User Profile initials"
              title="UserProfile Avatar"
            >
              {avatarInitials}
            </div>
          </div>
        </header>

        {/* Dynamic Inner Panel Viewport */}
        <main className="viewport-content animate-slide-up">
          {children}
        </main>
      </div>
    </div>
  );
}
