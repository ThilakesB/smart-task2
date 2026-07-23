# Smart Task & Notes Dashboard

A modern, responsive, production-ready React web application to manage tasks and sticky notes, featuring a unified search interface, priority categorizations, theme settings, and full Local Storage state persistence.

## Tech Stack
- **Framework**: React 19 (Functional components, custom Hooks, Context API, and `useReducer`)
- **Build Tool**: Vite
- **Styling**: Hand-written Vanilla CSS3 (utilizing CSS Grids, Flexbox, transitions, custom keyframe animations, and CSS variables for theming)
- **Persistence**: Browser Local Storage (fully client-side, zero backend / server dependencies)
- **Accessibility**: Keyboard navigable, aria-live toast notifications, focus trapping modal structures, semantic HTML5 tags

---

## Setup & Running Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run in Development Mode**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

3. **Build for Production**
   ```bash
   npm run build
   ```
   The compiled static assets will be output to the `/dist` folder.

4. **Preview the Build Locally**
   ```bash
   npm run preview
   ```

---

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Top-bar containing brand, SearchBar, and ThemeToggle
│   │   └── MainLayout.jsx      # Overall container layout
│   ├── dashboard/
│   │   └── SummaryCard.jsx     # Analytics stats widgets & progress bar
│   ├── tasks/
│   │   ├── TaskList.jsx        # Orchestrates tasks panel & creation triggers
│   │   ├── TaskItem.jsx        # Individual tasks render & validation
│   │   ├── TaskFilters.jsx     # Selectors for status, priority, category, and sorting
│   │   └── TaskForm.jsx        # Creation and editing input form
│   ├── notes/
│   │   ├── NoteList.jsx        # Orchestrates note pins & layout grid
│   │   ├── NoteCard.jsx        # Sticky note card visual panel
│   │   └── NoteForm.jsx        # Sticky notes text and color editor
│   └── common/
│       ├── SearchBar.jsx       # Real-time debounced search input field
│       ├── Modal.jsx           # Accessible dialog layer with focus trap
│       ├── ConfirmDialog.jsx   # Deletion safety confirm popup modal
│       ├── Badge.jsx           # Status badge tag
│       ├── EmptyState.jsx      # Placeholder for empty query listings
│       └── ThemeToggle.jsx     # System-synchronized dark/light mode toggle
├── hooks/
│   ├── useLocalStorage.js      # Synchronizes react state with localStorage
│   ├── useDebounce.js          # Delays keyword filtering to avoid lag
│   ├── useTheme.js             # Controls prefers-color-scheme theme persistence
│   ├── useToast.js             # Shortcut to access the global toast alerts
│   ├── useTasks.js             # Extracts unique tags and filters/sorts task records
│   └── useNotes.js             # Conducts fuzzy search on note headers and bodies
├── context/
│   ├── DashboardContext.jsx    # Central useReducer store for tasks and notes lists
│   └── ToastContext.jsx        # Accessible aria-live global toast manager
├── utils/
│   └── date.js                 # Overdue checkers and readable formatters
├── styles/
│   ├── variables.css           # Brand palettes, HSL scales, light/dark themes
│   ├── global.css              # Baseline resets and custom focus rings
│   ├── components.css          # Core layouts, cards, modals, custom checkboxes
│   └── animations.css          # CSS Keyframes for slide, fade, check, and shake
├── App.jsx                     # Top level component declaring providers and laying elements
├── index.css                   # Aggregates CSS import packages
└── main.jsx                    # React entry file
```

---

## Core Features

1. **Productivity Analytics Dashboard**: Displays total, completed, pending, and overdue counts alongside a dynamic completion progress tracker bar.
2. **Task Board**: Custom forms to add, edit, and delete task cards. Supports description detail text, due dates, priority tags (Low/Medium/High), and custom category tags. High priority and overdue tasks are visually highlighted.
3. **Sticky Notes**: Fast note creation utilizing a grid layout. Supports customizable sticky background colors (Yellow, Blue, Green, Pink, Purple, Orange) matching light/dark styles.
4. **Unified Search System**: Search tasks, notes, or tags simultaneously. Debounced to prevent layout lag.
5. **Advanced Task Filtering & Sorting**: Group tasks by status, urgency, or category tags. Sort ascending/descending by due date, priority, or creation date.
6. **Dark & Light Mode switch**: Defaults automatically to system preference (`prefers-color-scheme`) and persists user choices.
7. **Accessibility First Design**: Modal overlays use keyboard focus trapping, Esc close handlers, and restore focus to trigger buttons. Deletions are secured behind confirmation prompts. System triggers accessibility-compliant `aria-live` toasts for CRUD actions.

---

## Known Limitations

- **Browser Specific Storage**: State is persisted solely in the browser's Local Storage. Data is domain-specific and will be wiped if the user clears site cookies or browsing histories.
- **Local Storage Size Capacity**: Local Storage has a standard storage limit of approximately 5MB - 10MB per origin. Creating excessive numbers of notes or attachment-rich texts may eventually trigger browser quota warnings.
- **Concurrent Editing**: Because there is no real-time cloud database, opening the dashboard in multiple separate tabs or browsers will write independently to Local Storage, potentially leading to state sync lag or overwrites.
