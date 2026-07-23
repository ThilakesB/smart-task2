import React from 'react';
import { ContributionGrid } from './ContributionGrid';
import { ProgressTracker } from './SummaryCard';
import { Badge } from '../common/Badge';
import { isOverdue, formatDate } from '../../utils/date';

export function HomeView({ tasks, notes, onToggleTask, onEditTask, onDeleteTask, onNavigate }) {
  // Take the 5 most recent tasks (sorted by created date desc)
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="home-view-grid animate-fade-in">
      {/* Row 1: Contribution calendar + Progress Analytics + Quick controls */}
      <div className="home-row-1">
        {/* Left side: Contribution Calendar */}
        <div className="home-card-calendar">
          <ContributionGrid />
        </div>

        {/* Right side: Progress Tracker & Quick Actions */}
        <div className="home-card-analytics">
          <div className="analytics-card-header">
            <h3 className="analytics-card-title">Activity Analytics</h3>
          </div>
          <ProgressTracker 
            completed={tasks.filter(t => t.completed).length} 
            total={tasks.length} 
          />
          
          <div className="quick-actions-card">
            <h4 className="quick-actions-title">Quick Actions</h4>
            <div className="quick-actions-buttons">
              <button 
                className="btn btn-primary" 
                onClick={() => onNavigate('tasks')}
                style={{ width: '100%' }}
              >
                Go to Tasks
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => onNavigate('notes')}
                style={{ width: '100%' }}
              >
                Go to Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Recent Tasks Table (aligned to mock transaction table) */}
      <div className="recent-tasks-card">
        <div className="recent-tasks-header">
          <h3 className="recent-tasks-title">Recent Tasks</h3>
          <button 
            className="btn btn-text" 
            onClick={() => onNavigate('tasks')}
          >
            View All Tasks &rarr;
          </button>
        </div>

        {recentTasks.length > 0 ? (
          <div className="recent-tasks-table-container">
            <table className="recent-tasks-table">
              <thead>
                <tr>
                  <th scope="col">Task Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Due Date</th>
                  <th scope="col" style={{ textAlign: 'center' }}>Status</th>
                  <th scope="col" style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => {
                  const overdue = isOverdue(task.dueDate, task.completed);
                  return (
                    <tr key={task.id} className={task.completed ? 'completed-row' : ''}>
                      <td>
                        <div className="table-task-title-cell">
                          <span className={`table-task-title ${task.completed ? 'strike' : ''}`}>
                            {task.title}
                          </span>
                        </div>
                      </td>
                      <td>
                        <Badge variant="category">{task.category || 'General'}</Badge>
                      </td>
                      <td>
                        <Badge variant={task.priority}>{task.priority}</Badge>
                      </td>
                      <td>
                        {task.dueDate ? (
                          <span className={`table-date ${overdue ? 'overdue-text' : ''}`}>
                            {formatDate(task.dueDate)}
                          </span>
                        ) : (
                          <span className="table-date-none">&mdash;</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {/* Custom status toggle check */}
                        <label className="checkbox-container" style={{ display: 'inline-flex', padding: 0 }}>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            checked={task.completed}
                            onChange={() => onToggleTask(task.id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="btn-icon"
                            onClick={() => onEditTask(task)}
                            aria-label={`Edit task: ${task.title}`}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg>
                          </button>
                          <button
                            className="btn-icon btn-icon-danger"
                            onClick={() => onDeleteTask(task.id)}
                            aria-label={`Delete task: ${task.title}`}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No recent tasks. Click "Go to Tasks" to add your first task.
          </div>
        )}
      </div>
    </div>
  );
}
