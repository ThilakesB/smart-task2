import React, { useState } from 'react';
import { Badge } from '../common/Badge';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { isOverdue, formatDate } from '../../utils/date';

export function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const overdue = isOverdue(task.dueDate, task.completed);

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <>
      <div
        className={`task-item animate-fade-in priority-${task.priority} ${
          task.completed ? 'completed' : ''
        } ${overdue ? 'overdue' : ''}`}
        role="listitem"
      >
        <div className="task-item-main">
          {/* Custom Checkbox */}
          <label className="checkbox-container" aria-label={`Toggle task completion for: ${task.title}`}>
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <span className="checkmark"></span>
          </label>

          <div className="task-content">
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}

            <div className="task-meta">
              {/* Due Date */}
              {task.dueDate && (
                <span className={`task-meta-item ${overdue ? 'overdue-warning' : ''}`}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ marginRight: '2px' }}
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {overdue ? 'Overdue: ' : 'Due: '}
                  {formatDate(task.dueDate)}
                </span>
              )}

              {/* Priority Badge */}
              <Badge variant={task.priority}>{task.priority}</Badge>

              {/* Category Badge */}
              {task.category && (
                <Badge variant="category">{task.category}</Badge>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="task-actions">
            <button
              className="btn-icon"
              onClick={() => onEdit(task)}
              aria-label={`Edit task: ${task.title}`}
              title="Edit Task"
            >
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
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
            <button
              className="btn-icon btn-icon-danger"
              onClick={() => setIsConfirmOpen(true)}
              aria-label={`Delete task: ${task.title}`}
              title="Delete Task"
            >
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
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete the task "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
