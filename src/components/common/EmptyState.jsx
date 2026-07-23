import React from 'react';

export function EmptyState({ title, description, actionText, onAction, icon }) {
  return (
    <div className="empty-state animate-fade-in" role="status">
      <div className="empty-state-icon" aria-hidden="true">
        {icon || (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 17h6" />
            <path d="M9 12h6" />
            <path d="M9 7h6" />
          </svg>
        )}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionText && onAction && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAction}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
