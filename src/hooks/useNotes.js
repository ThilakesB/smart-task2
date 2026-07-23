import { useMemo, useCallback } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { useDebounce } from './useDebounce';

export function useNotes() {
  const { state, dispatch } = useDashboard();
  const { notes, searchQuery } = state;

  // Debounce query to optimize notes searching
  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  const addNote = useCallback((noteData) => {
    const newNote = {
      ...noteData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_NOTE', payload: newNote });
    return newNote;
  }, [dispatch]);

  const editNote = useCallback((noteData) => {
    dispatch({ type: 'EDIT_NOTE', payload: noteData });
  }, [dispatch]);

  const deleteNote = useCallback((id) => {
    dispatch({ type: 'DELETE_NOTE', payload: id });
  }, [dispatch]);

  const filteredNotes = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return notes;
    }

    const query = debouncedSearchQuery.toLowerCase().trim();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.body.toLowerCase().includes(query)
    );
  }, [notes, debouncedSearchQuery]);

  return {
    notes,
    filteredNotes,
    addNote,
    editNote,
    deleteNote,
  };
}
