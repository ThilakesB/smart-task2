import React, { useState } from 'react';
import { DashboardProvider } from './context/DashboardContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { MainLayout } from './components/layout/MainLayout';
import { HomeView } from './components/dashboard/HomeView';
import { TaskList } from './components/tasks/TaskList';
import { NoteList } from './components/notes/NoteList';
import { Modal } from './components/common/Modal';
import { TaskForm } from './components/tasks/TaskForm';
import { useTasks } from './hooks/useTasks';
import { useNotes } from './hooks/useNotes';

function DashboardContent() {
  const [activeTab, setActiveTab] = useState('home');
  const { tasks, toggleTask, deleteTask, editTask } = useTasks();
  const { notes } = useNotes();
  const { addToast } = useToast();

  const [editingTask, setEditingTask] = useState(null);

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

  // Render view based on active tab state
  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TaskList />;
      case 'notes':
        return <NoteList />;
      case 'home':
      default:
        return (
          <HomeView
            tasks={tasks}
            notes={notes}
            onToggleTask={handleToggle}
            onEditTask={setEditingTask}
            onDeleteTask={handleDelete}
            onNavigate={setActiveTab}
          />
        );
    }
  };

  return (
    <>
      <MainLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </MainLayout>

      {/* Edit Task Modal (triggered from HomeView Recent Transactions table) */}
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
    </>
  );
}

function App() {
  return (
    <ToastProvider>
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
    </ToastProvider>
  );
}

export default App;
