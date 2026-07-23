import React from 'react';

export function TaskFilters({ filters, setFilters, sort, setSort, categories }) {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortFieldChange = (value) => {
    setSort((prev) => ({ ...prev, field: value }));
  };

  const toggleSortDirection = () => {
    setSort((prev) => ({
      ...prev,
      direction: prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="task-filters animate-fade-in">
      <div className="filters-row">
        {/* Status Filter */}
        <div className="filter-group">
          <label htmlFor="filter-status" className="filter-label">
            Status
          </label>
          <select
            id="filter-status"
            className="filter-select"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="filter-group">
          <label htmlFor="filter-priority" className="filter-label">
            Priority
          </label>
          <select
            id="filter-priority"
            className="filter-select"
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label htmlFor="filter-category" className="filter-label">
            Category
          </label>
          <select
            id="filter-category"
            className="filter-select"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            style={{ textTransform: 'capitalize' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Field Select */}
        <div className="filter-group">
          <label htmlFor="sort-field" className="filter-label">
            Sort By
          </label>
          <select
            id="sort-field"
            className="filter-select"
            value={sort.field}
            onChange={(e) => handleSortFieldChange(e.target.value)}
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdDate">Created Date</option>
          </select>
        </div>

        {/* Sort Direction Toggle Button */}
        <div className="filter-group" style={{ flex: '0 0 auto', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={toggleSortDirection}
            aria-label={`Change sort direction to ${
              sort.direction === 'asc' ? 'descending' : 'ascending'
            }`}
            title={`Sort Direction: ${sort.direction === 'asc' ? 'Ascending' : 'Descending'}`}
            style={{ height: '38px', padding: '0 12px' }}
          >
            {sort.direction === 'asc' ? (
              // Ascending Icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 8 4-4 4 4" />
                <path d="M7 4v16" />
                <path d="M11 12h10" />
                <path d="M11 16h7" />
                <path d="M11 20h4" />
                <path d="M11 8h10" />
              </svg>
            ) : (
              // Descending Icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m3 16 4 4 4-4" />
                <path d="M7 20V4" />
                <path d="M11 12h10" />
                <path d="M11 16h7" />
                <path d="M11 20h4" />
                <path d="M11 8h10" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
