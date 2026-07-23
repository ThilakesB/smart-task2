import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
const DashboardContext = createContext(null);

// Initial state values
const DEFAULT_STATE = {
  tasks: [],
  notes: [],
  searchQuery: '',
};

// Reducer function
function dashboardReducer(state, action) {
  switch (action.type) {
    // Tasks actions
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };

    // Notes actions
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? { ...note, ...action.payload } : note
        ),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    // Search action
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
}

// Provider Component
export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, DEFAULT_STATE, () => {
    try {
      const localTasks = window.localStorage.getItem('app-tasks');
      const localNotes = window.localStorage.getItem('app-notes');
      return {
        tasks: localTasks ? JSON.parse(localTasks) : [],
        notes: localNotes ? JSON.parse(localNotes) : [],
        searchQuery: '',
      };
    } catch (e) {
      console.error('Error loading initial dashboard state from localStorage:', e);
      return DEFAULT_STATE;
    }
  });

  // Sync state to localStorage on changes
  useEffect(() => {
    try {
      window.localStorage.setItem('app-tasks', JSON.stringify(state.tasks));
    } catch (e) {
      console.error('Error saving tasks to localStorage:', e);
    }
  }, [state.tasks]);

  useEffect(() => {
    try {
      window.localStorage.setItem('app-notes', JSON.stringify(state.notes));
    } catch (e) {
      console.error('Error saving notes to localStorage:', e);
    }
  }, [state.notes]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Export custom hook to use DashboardContext
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
