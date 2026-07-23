import React, { useState, useEffect } from 'react';

const COLOR_OPTIONS = [
  { value: 'yellow', hex: '#fef08a', textHex: '#713f12' },
  { value: 'blue', hex: '#bfdbfe', textHex: '#1e3a8a' },
  { value: 'green', hex: '#bbf7d0', textHex: '#065f46' },
  { value: 'pink', hex: '#fbcfe8', textHex: '#831843' },
  { value: 'purple', hex: '#e9d5ff', textHex: '#581c87' },
  { value: 'orange', hex: '#fed7aa', textHex: '#7c2d12' },
];

export function NoteForm({ isOpen, onSubmit, initialNote = null }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [color, setColor] = useState('yellow');

  // Validation
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync state if editing an existing note
  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '');
      setBody(initialNote.body || '');
      setColor(initialNote.color || 'yellow');
    } else {
      // Reset form for creation
      setTitle('');
      setBody('');
      setColor('yellow');
    }
    setErrors({});
    setIsSubmitted(false);
  }, [initialNote, isOpen]);

  // Handle inline validation on change
  useEffect(() => {
    if (isSubmitted) {
      validate();
    }
  }, [title, body]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Note title is required.';
    } else if (title.trim().length > 60) {
      newErrors.title = 'Title must be under 60 characters.';
    }

    if (!body.trim()) {
      newErrors.body = 'Note body is required.';
    } else if (body.trim().length > 1000) {
      newErrors.body = 'Body must be under 1000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (validate()) {
      onSubmit({
        id: initialNote?.id, // keep id for editing
        title: title.trim(),
        body: body.trim(),
        color,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Note Title */}
      <div className="form-group">
        <label htmlFor="note-title" className="form-label">
          Title <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <input
          id="note-title"
          type="text"
          className={`form-input ${errors.title ? 'has-error' : ''}`}
          placeholder="e.g. Shopping List"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? 'note-title-error' : undefined}
          required
        />
        {errors.title && (
          <span id="note-title-error" className="form-error">
            {errors.title}
          </span>
        )}
      </div>

      {/* Note Body */}
      <div className="form-group">
        <label htmlFor="note-body" className="form-label">
          Content <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <textarea
          id="note-body"
          className={`form-textarea ${errors.body ? 'has-error' : ''}`}
          placeholder="Type your sticky note content here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="5"
          aria-invalid={!!errors.body}
          aria-describedby={errors.body ? 'note-body-error' : undefined}
          required
        />
        {errors.body && (
          <span id="note-body-error" className="form-error">
            {errors.body}
          </span>
        )}
      </div>

      {/* Note Color Picker */}
      <div className="form-group">
        <span className="form-label">Sticky Color</span>
        <div className="color-picker" role="radiogroup" aria-label="Select sticky note color">
          {COLOR_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`color-option ${color === opt.value ? 'selected' : ''}`}
              style={{
                backgroundColor: opt.hex,
                borderColor: color === opt.value ? 'var(--text-primary)' : 'transparent',
              }}
              onClick={() => setColor(opt.value)}
              aria-label={`Select ${opt.value} color`}
              aria-checked={color === opt.value}
              role="radio"
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialNote ? 'Save Note' : 'Add Sticky Note'}
        </button>
      </div>
    </form>
  );
}
