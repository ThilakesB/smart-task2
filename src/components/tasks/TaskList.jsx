import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { TaskFilters } from './TaskFilters';
import { TaskForm } from './TaskForm';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';
import { useTasks } from '../../hooks/useTasks';
import { useToast } from '../../hooks/useToast';

export function TaskList() {
  const {
    tasks,
    filteredTasks,
    categories,
    filters,
    setFilters,
    sort,
    setSort,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  const { addToast } = useToast();

  // Modal open states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleCreateSubmit = (taskData) => {
    const newTask = addTask(taskData);
    setIsCreateOpen(false);
    addToast(`Task "${newTask.title}" added successfully!`, 'success');
  };

  const handleEditSubmit = (taskData) => {
    editTask(taskData);
    setEditingTask(null);
    addToast(`Task "${taskData.title}" updated successfully!`, 'success');
  };

  const handleToggle = (id) => {
    toggleTask(id);
    const updatedTask = tasks.find((t) => t.id === id);
    if (updatedTask) {
      const nextStatus = !updatedTask.completed ? 'completed' : 'pending';
      addToast(
        `Task "${updatedTask.title}" marked as ${nextStatus}!`,
        nextStatus === 'completed' ? 'success' : 'info'
      );
    }
  };

  const handleDelete = (id) => {
    const deletedTask = tasks.find((t) => t.id === id);
    deleteTask(id);
    if (deletedTask) {
      addToast(`Task "${deletedTask.title}" deleted!`, 'danger');
    }
  };

  return (
    <section className="dashboard-column" aria-labelledby="tasks-heading">
      {/* Column Header */}
      <div className="column-header">
        <div className="column-title-container">
          <h2 id="tasks-heading" className="column-title">
            Tasks
          </h2>
          <span className="column-count" aria-label={`${filteredTasks.length} tasks matching current filters`}>
            {filteredTasks.length}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsCreateOpen(true)}
          aria-haspopup="dialog"
        >
          {/* Add Icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ marginRight: '4px' }}
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Task Filters */}
      <TaskFilters
        filters={filters}
        setFilters={setFilters}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />

      {/* Tasks List Content */}
      {filteredTasks.length > 0 ? (
        <div className="task-list" role="list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={tasks.length === 0 ? 'No tasks yet' : 'No tasks match criteria'}
          description={
            tasks.length === 0
              ? 'Get started by creating your very first task right now.'
              : 'Try clearing your filters or altering your search query terms.'
          }
          actionText={tasks.length === 0 ? 'Create a Task' : null}
          onAction={tasks.length === 0 ? () => setIsCreateOpen(true) : null}
        />
      )}

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add New Task"
      >
        <TaskForm isOpen={isCreateOpen} onSubmit={handleCreateSubmit} />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        title="Edit Task"
      >
        <TaskForm
          isOpen={!!editingTask}
          onSubmit={handleEditSubmit}
          initialTask={editingTask}
        />
      </Modal>
    </section>
  );
}
