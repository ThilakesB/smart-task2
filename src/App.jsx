import React from 'react';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import { ToastProvider } from './context/ToastContext';
import { MainLayout } from './components/layout/MainLayout';
import { SummaryCard, ProgressTracker } from './components/dashboard/SummaryCard';
import { TaskList } from './components/tasks/TaskList';
import { NoteList } from './components/notes/NoteList';
import { ContributionGrid } from './components/dashboard/ContributionGrid';
import { isOverdue } from './utils/date';

function DashboardContent() {
  const { state } = useDashboard();
  const { tasks, notes } = state;

  // Compute live statistics for summary widgets
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const overdueTasks = tasks.filter((t) => isOverdue(t.dueDate, t.completed)).length;
  const pendingTasks = tasks.filter((t) => !t.completed && !isOverdue(t.dueDate, t.completed)).length;
  const totalNotes = notes.length;

  return (
    <MainLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        
        {/* Statistics Widgets Row */}
        <section className="dashboard-summary animate-fade-in" aria-label="Productivity Analytics Summary">
          <SummaryCard
            label="Total Tasks"
            value={totalTasks}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            }
          />
          <SummaryCard
            label="Completed Tasks"
            value={completedTasks}
            iconBg="var(--success-light)"
            iconColor="var(--success)"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
          />
          <SummaryCard
            label="Pending Tasks"
            value={pendingTasks}
            iconBg="var(--warning-light)"
            iconColor="var(--warning-dark)"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
          />
          <SummaryCard
            label="Overdue Tasks"
            value={overdueTasks}
            iconBg="var(--danger-light)"
            iconColor="var(--danger)"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            }
          />
          <SummaryCard
            label="Sticky Notes"
            value={totalNotes}
            iconBg="var(--note-pink)"
            iconColor="var(--note-pink-text)"
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8.5L15.5 3Z" />
                <path d="M15 3v6h6" />
              </svg>
            }
          />
          <ProgressTracker completed={completedTasks} total={totalTasks} />
        </section>

        {/* Contribution Activity Grid */}
        <ContributionGrid />

        {/* Dynamic Column Viewports */}
        <div className="dashboard-main">
          <TaskList />
          <NoteList />
        </div>
      </div>
    </MainLayout>
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
