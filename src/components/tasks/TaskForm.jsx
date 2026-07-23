import React, { useState, useEffect } from 'react';

export function TaskForm({ isOpen, onSubmit, initialTask = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('');

  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state if editing an existing task
  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setDueDate(initialTask.dueDate || '');
      setPriority(initialTask.priority || 'medium');
      setCategory(initialTask.category || '');
    } else {
      // Clear form for creation
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setCategory('');
    }
    setErrors({});
    setIsSubmitted(false);
  }, [initialTask, isOpen]);

  // Handle inline validation on change
  useEffect(() => {
    if (isSubmitted) {
      validate();
    }
  }, [title]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Task title is required.';
    } else if (title.trim().length > 100) {
      newErrors.title = 'Title must be under 100 characters.';
    }

    if (category.trim().length > 30) {
      newErrors.category = 'Category must be under 30 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validate()) {
      onSubmit({
        id: initialTask?.id, // keep id for editing
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate || null,
        priority,
        category: category.trim() || 'General',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Task Title */}
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">
          Title <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <input
          id="task-title"
          type="text"
          className={`form-input ${errors.title ? 'has-error' : ''}`}
          placeholder="e.g. Finish project implementation plan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'task-title-error' : undefined}
          required
        />
        {errors.title && (
          <span id="task-title-error" className="form-error">
            {errors.title}
          </span>
        )}
      </div>

      {/* Task Description */}
      <div className="form-group">
        <label htmlFor="task-desc" className="form-label">
          Description
        </label>
        <textarea
          id="task-desc"
          className="form-textarea"
          placeholder="Add details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
      </div>

      {/* Row of Due Date & Priority */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
        <div className="form-group">
          <label htmlFor="task-duedate" className="form-label">
            Due Date
          </label>
          <input
            id="task-duedate"
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="task-priority" className="form-label">
            Priority
          </label>
          <select
            id="task-priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* Category Tag */}
      <div className="form-group">
        <label htmlFor="task-category" className="form-label">
          Category Tag
        </label>
        <input
          id="task-category"
          type="text"
          className={`form-input ${errors.category ? 'has-error' : ''}`}
          placeholder="e.g. Work, Health, Personal (default: General)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? 'task-category-error' : undefined}
        />
        {errors.category && (
          <span id="task-category-error" className="form-error">
            {errors.category}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialTask ? 'Save Changes' : 'Create Task'}
        </button>
      </div>
    </form>
  );
}
