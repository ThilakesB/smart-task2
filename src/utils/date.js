/**
 * Checks if a task is overdue (due date is in the past and task is not completed).
 * Supports comparison based on calendar date (ignoring current time).
 * 
 * @param {string} dueDateString - YYYY-MM-DD format due date
 * @param {boolean} completed - Task completion status
 * @returns {boolean}
 */
export function isOverdue(dueDateString, completed) {
  if (!dueDateString || completed) return false;

  // Create date objects for comparison at start of day local time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(dueDateString);
  // Add timezone offset to ensure the date matches local input calendar date
  const offset = dueDate.getTimezoneOffset();
  dueDate.setMinutes(dueDate.getMinutes() + offset);
  dueDate.setHours(0, 0, 0, 0);

  return dueDate < today;
}

/**
 * Formats a YYYY-MM-DD date string to a readable format (e.g. Jul 23, 2026).
 * 
 * @param {string} dateString 
 * @returns {string}
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() + offset);

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Returns YYYY-MM-DD local format from any date object or ISO string.
 * 
 * @param {string|Date} isoStringOrDate
 * @returns {string}
 */
export function getLocalYYYYMMDD(isoStringOrDate) {
  if (!isoStringOrDate) return null;
  const date = new Date(isoStringOrDate);
  if (isNaN(date.getTime())) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
