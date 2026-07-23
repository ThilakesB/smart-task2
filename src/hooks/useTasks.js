import { useState, useMemo, useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { useDebounce } from './useDebounce';
import { isOverdue } from '../utils/date';

export function useTasks() {
  const { state, dispatch } = useDashboard();
  const { tasks, searchQuery } = state;

  // Debounce the search query to optimize filtering on keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  // Local filter states
  const [filters, setFilters] = useState({
    status: 'all',       // 'all', 'completed', 'pending', 'overdue'
    priority: 'all',     // 'all', 'low', 'medium', 'high'
    category: 'all',     // 'all', or specific custom category name
  });

  // Local sorting states
  const [sort, setSort] = useState({
    field: 'dueDate',    // 'dueDate', 'priority', 'createdDate'
    direction: 'asc',    // 'asc', 'desc'
  });

  // Unique categories extracted from current tasks
  const categories = useMemo(() => {
    const allCategories = tasks
      .map((t) => t.category?.trim())
      .filter((c) => c && c.length > 0);
    return ['all', ...new Set(allCategories)];
  }, [tasks]);

  // CRUD Actions
  const addTask = useCallback((taskData) => {
    const newTask = {
      ...taskData,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    return newTask;
  }, [dispatch]);

  const editTask = useCallback((taskData) => {
    dispatch({ type: 'EDIT_TASK', payload: taskData });
  }, [dispatch]);

  const deleteTask = useCallback((id) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  }, [dispatch]);

  const toggleTask = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  }, [dispatch]);

  // Priority ranking value for sorting purposes
  const priorityWeight = {
    high: 3,
    medium: 2,
    low: 1,
  };

  // Filtered and sorted tasks list
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Apply unified search query (debounced)
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.category.toLowerCase().includes(query)
      );
    }

    // 2. Apply status filter
    if (filters.status !== 'all') {
      result = result.filter((task) => {
        const taskOverdue = isOverdue(task.dueDate, task.completed);
        if (filters.status === 'completed') return task.completed;
        if (filters.status === 'pending') return !task.completed && !taskOverdue;
        if (filters.status === 'overdue') return taskOverdue;
        return true;
      });
    }

    // 3. Apply priority filter
    if (filters.priority !== 'all') {
      result = result.filter((task) => task.priority === filters.priority);
    }

    // 4. Apply category filter
    if (filters.category !== 'all') {
      result = result.filter(
        (task) => task.category?.trim().toLowerCase() === filters.category.toLowerCase()
      );
    }

    // 5. Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      if (sort.field === 'dueDate') {
        // Handle tasks without due date (push them to the end)
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sort.field === 'priority') {
        const weightA = priorityWeight[a.priority] || 0;
        const weightB = priorityWeight[b.priority] || 0;
        comparison = weightA - weightB;
      } else if (sort.field === 'createdDate') {
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
      }

      return sort.direction === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [tasks, debouncedSearchQuery, filters, sort]);

  return {
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
  };
}
