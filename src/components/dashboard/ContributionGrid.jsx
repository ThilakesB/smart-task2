import React, { useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { getLocalYYYYMMDD, formatDate } from '../../utils/date';

export function ContributionGrid() {
  const { state } = useDashboard();
  const { tasks, notes } = state;

  // 1. Gather all activity dates and tally them in a hash map
  const activityMap = useMemo(() => {
    const map = {};

    const incrementDate = (isoString) => {
      const dateStr = getLocalYYYYMMDD(isoString);
      if (dateStr) {
        map[dateStr] = (map[dateStr] || 0) + 1;
      }
    };

    // Count created tasks
    tasks.forEach((task) => {
      if (task.createdAt) incrementDate(task.createdAt);
      // Count completed tasks (if completed)
      if (task.completed && task.completedAt) {
        incrementDate(task.completedAt);
      }
    });

    // Count created notes
    notes.forEach((note) => {
      if (note.createdAt) incrementDate(note.createdAt);
    });

    return map;
  }, [tasks, notes]);

  // 2. Generate the 53-week grid ending today, starting on Sunday
  const calendarData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 364 days ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);

    // Align to the start of the week (Sunday is 0)
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const weeks = [];
    let currentDay = new Date(startDate);

    // Generate 53 weeks (53 * 7 = 371 days)
    for (let w = 0; w < 53; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const dateCopy = new Date(currentDay);
        const dateStr = getLocalYYYYMMDD(dateCopy);
        const count = activityMap[dateStr] || 0;
        const isFuture = dateCopy > today;

        // Calculate visual level
        let level = 0;
        if (count > 0) {
          if (count === 1) level = 1;
          else if (count === 2) level = 2;
          else if (count === 3) level = 3;
          else level = 4;
        }

        week.push({
          date: dateCopy,
          dateStr,
          count: isFuture ? 0 : count,
          level: isFuture ? -1 : level, // -1 signals future/empty
          isFuture,
        });

        currentDay.setDate(currentDay.getDate() + 1);
      }
      weeks.push(week);
    }

    return weeks;
  }, [activityMap]);

  // 3. Compute total contributions in the last 365 days
  const totalContributions = useMemo(() => {
    let sum = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);
    
    // Set starts of day
    const startStr = getLocalYYYYMMDD(startDate);

    Object.entries(activityMap).forEach(([dateStr, count]) => {
      // Only sum if within the 365-day range and not in the future
      if (dateStr >= startStr && dateStr <= getLocalYYYYMMDD(today)) {
        sum += count;
      }
    });

    return sum;
  }, [activityMap]);

  // 4. Calculate month headers dynamically
  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;

    calendarData.forEach((week, weekIndex) => {
      // Check month of first day of the week
      const firstDayOfWeek = week[0].date;
      const currentMonth = firstDayOfWeek.getMonth();

      // If month changes, record it at this column index
      if (currentMonth !== lastMonth) {
        const label = firstDayOfWeek.toLocaleString('default', { month: 'short' });
        
        // Avoid packing labels too close (require at least 2 weeks distance)
        const previousLabel = labels[labels.length - 1];
        if (!previousLabel || (weekIndex - previousLabel.colIndex > 2)) {
          labels.push({
            name: label,
            colIndex: weekIndex,
          });
          lastMonth = currentMonth;
        }
      }
    });

    return labels;
  }, [calendarData]);

  return (
    <div className="contribution-section animate-fade-in" aria-label="Contributions calendar panel">
      <div className="contribution-header">
        <h3 className="contribution-heading">
          Contributions Streaks ({totalContributions} in the last year)
        </h3>
      </div>

      <div className="contribution-grid-scroll">
        <div className="contribution-grid-wrapper">
          <div className="contribution-calendar-container">
            {/* Month labels at top */}
            <div className="contribution-labels-months" aria-hidden="true">
              {monthLabels.map((lbl, index) => (
                <span
                  key={index}
                  style={{
                    gridColumnStart: lbl.colIndex + 1,
                  }}
                  className="month-label"
                >
                  {lbl.name}
                </span>
              ))}
            </div>

            {/* Day labels + Grid Columns row */}
            <div className="contribution-calendar-row">
              {/* Day Labels Column */}
              <div className="contribution-labels-days" aria-hidden="true">
                <span></span>
                <span>Mon</span>
                <span></span>
                <span>Wed</span>
                <span></span>
                <span>Fri</span>
                <span></span>
              </div>

              {/* Grid Columns representing weeks */}
              <div className="contribution-calendar" role="grid" aria-label="Task and note contributions calendar">
                {calendarData.map((week, wIndex) => (
                  <div className="contribution-column" key={wIndex} role="row">
                    {week.map((day, dIndex) => {
                      const readableDate = formatDate(day.dateStr);
                      const labelText = day.isFuture
                        ? 'Future date'
                        : `${day.count} contribution${day.count === 1 ? '' : 's'} on ${readableDate}`;

                      return (
                        <div
                          key={dIndex}
                          className={`contribution-cell level-${day.level}`}
                          title={labelText}
                          aria-label={labelText}
                          role="gridcell"
                          style={{
                            visibility: day.isFuture ? 'hidden' : 'visible',
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="contribution-footer">
        <span className="contribution-footer-text">Learn how we count contributions</span>
        <div className="contribution-legend" aria-hidden="true">
          <span>Less</span>
          <div className="contribution-cell level-0" />
          <div className="contribution-cell level-1" />
          <div className="contribution-cell level-2" />
          <div className="contribution-cell level-3" />
          <div className="contribution-cell level-4" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
