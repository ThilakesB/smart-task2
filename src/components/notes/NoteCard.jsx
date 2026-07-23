import React, { useState } from 'react';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { formatDate } from '../../utils/date';

export function NoteCard({ note, onEdit, onDelete }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDelete = () => {
    onDelete(note.id);
  };

  return (
    <>
      <div
        className={`note-card color-${note.color} animate-fade-in`}
        role="article"
      >
        <div>
          {/* Header */}
          <div className="note-card-header">
            <h3 className="note-card-title">{note.title}</h3>
            
            <div className="note-actions">
              <button
                className="btn-icon"
                onClick={() => onEdit(note)}
                aria-label={`Edit note: ${note.title}`}
                title="Edit Note"
                style={{ color: 'inherit' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </button>
              <button
                className="btn-icon"
                onClick={() => setIsConfirmOpen(true)}
                aria-label={`Delete note: ${note.title}`}
                title="Delete Note"
                style={{ color: 'inherit' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="note-card-body">{note.body}</div>
        </div>

        {/* Footer */}
        <div className="note-card-footer">
          <span>{formatDate(note.createdAt)}</span>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete the note "${note.title}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}
