import React from 'react';

export function Badge({ children, variant = 'category', className = '' }) {
  const getBadgeClass = () => {
    switch (variant) {
      case 'low':
        return 'badge-low';
      case 'medium':
        return 'badge-medium';
      case 'high':
        return 'badge-high';
      default:
        return 'badge-category';
    }
  };

  return (
    <span className={`badge ${getBadgeClass()} ${className}`}>
      {children}
    </span>
  );
}
