import React from 'react';

export function SummaryCard({ label, value, icon, iconBg = 'var(--primary-light)', iconColor = 'var(--primary)' }) {
  return (
    <div className="summary-card" role="group" aria-label={`${label}: ${value}`}>
      <div
        className="summary-icon-container"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <div className="summary-info">
        <span className="summary-label">{label}</span>
        <span className="summary-value">{value}</span>
      </div>
    </div>
  );
}

export function ProgressTracker({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-card">
      <div className="progress-header">
        <h3 className="progress-title">Task Completion Progress</h3>
        <span className="progress-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="Task completion progress bar"
        />
      </div>
    </div>
  );
}
