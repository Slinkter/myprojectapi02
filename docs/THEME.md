# Theme System Documentation

## Overview
The UserApp Pro theme system implements a light and dark mode toggle with persistence and system preference synchronization. It uses Tailwind CSS v4 for styling and a custom React hook for state management.

## Architecture

### 1. Theme Logic (`src/shared/hooks/useTheme.js`)
The `useTheme` hook manages the visual state of the application:
- **Initialization**: 
  - Priority 1: Value saved in `localStorage` (`theme` key).
  - Priority 2: System preference via `window.matchMedia('(prefers-color-scheme: dark)')`.
- **Synchronization**:
  - Listens for system theme changes and updates the UI if no manual preference is set.
  - Updates the `document.documentElement` class list (adds/removes `.dark`).
  - Persists the current selection to `localStorage`.

### 2. Styling (`src/index.css`)
The theme is applied using the `.dark` class on the root element.
- **Light Mode**: Default `:root` styles.
- **Dark Mode**: Styles defined under the `.dark` selector.
- **Color Palette**: Uses a Slate-based palette for high contrast and readability.
- **Transition**: A smooth `0.3s ease` transition is applied to `background-color` and `color` for a seamless user experience.

### 3. Accessibility (A11y)
- **Focus Ring**: A global `:focus-visible` rule provides a high-contrast blue outline (`#3b82f6`) for keyboard users, ensuring clear focus indication across all interactive elements.
- **Contrast**: Color pairings are selected to meet WCAG AA standards for contrast ratios in both light and dark modes.
- **Screen Readers**: The `ThemeToggleButton` uses dynamic `aria-label` to communicate the current state and the effect of the action to assistive technologies.

## Usage

### Switching Themes
Use the `ThemeToggleButton` component in your layout to provide users with a theme toggle.

### Conditional Styling in Components
Use Tailwind's `dark:` variant for component-specific theme styles:
```jsx
<div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
  Theme-aware content
</div>
```
