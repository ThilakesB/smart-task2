import React, { useState } from 'react';
import { NoteCard } from './NoteCard';
import { NoteForm } from './NoteForm';
import { Modal } from '../common/Modal';
import { EmptyState } from '../common/EmptyState';
import { useNotes } from '../../hooks/useNotes';
import { useToast } from '../../hooks/useToast';

export function NoteList() {
  const { notes, filteredNotes, addNote, editNote, deleteNote } = useNotes();
  const { addToast } = useToast();

  // Modal open states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleCreateSubmit = (noteData) => {
    const newNote = addNote(noteData);
    setIsCreateOpen(false);
    addToast(`Note "${newNote.title}" created successfully!`, 'success');
  };

  const handleEditSubmit = (noteData) => {
    editNote(noteData);
    setEditingNote(null);
    addToast(`Note "${noteData.title}" updated successfully!`, 'success');
  };

  const handleDelete = (id) => {
    const deletedNote = notes.find((n) => n.id === id);
    deleteNote(id);
    if (deletedNote) {
      addToast(`Note "${deletedNote.title}" deleted!`, 'danger');
    }
  };

  return (
    <section className="dashboard-column" aria-labelledby="notes-heading">
      {/* Column Header */}
      <div className="column-header">
        <div className="column-title-container">
          <h2 id="notes-heading" className="column-title">
            Sticky Notes
          </h2>
          <span className="column-count" aria-label={`${filteredNotes.length} notes total`}>
            {filteredNotes.length}
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
          Add Note
        </button>
      </div>

      {/* Note List Container */}
      {filteredNotes.length > 0 ? (
        <div className="note-list">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={setEditingNote}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title={notes.length === 0 ? 'No sticky notes' : 'No notes match search'}
          description={
            notes.length === 0
              ? 'Capture thoughts, reminders, or code snippets with sticky notes.'
              : 'Try checking your search keyword for typos.'
          }
          actionText={notes.length === 0 ? 'Create a Note' : null}
          onAction={notes.length === 0 ? () => setIsCreateOpen(true) : null}
          icon={
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8.5L15.5 3Z" />
              <path d="M15 3v6h6" />
              <path d="M9 13h6" />
              <path d="M9 17h6" />
            </svg>
          }
        />
      )}

      {/* Create Note Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add Sticky Note"
      >
        <NoteForm isOpen={isCreateOpen} onSubmit={handleCreateSubmit} />
      </Modal>

      {/* Edit Note Modal */}
      <Modal
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        title="Edit Sticky Note"
      >
        <NoteForm
          isOpen={!!editingNote}
          onSubmit={handleEditSubmit}
          initialNote={editingNote}
        />
      </Modal>
    </section>
  );
}
