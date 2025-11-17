# ARIA Authoring Practices Guide

Source: W3C ARIA Authoring Practices Guide 1.2
Reference: https://www.w3.org/TR/wai-aria-practices-1.2/

## Core ARIA Rules

### Rule 1: Don't use ARIA
If native HTML element exists, use it instead of recreating with ARIA.

### Rule 2: Don't change native semantics
Don't do: `<h2 role="tab">Tab</h2>`
Do: `<div role="tab"><h2>Tab</h2></div>`

### Rule 3: All interactive ARIA must be keyboard accessible
Any element with ARIA role must be keyboard operable.

### Rule 4: Don't hide focusable elements
Don't use `aria-hidden="true"` on focusable elements.

### Rule 5: Provide accessible names
All interactive elements need accessible name via:
- Visible label
- aria-label
- aria-labelledby

## Common Widget Patterns

### Accordion
```tsx
<div className="accordion">
  <h3>
    <button aria-expanded="false" 
            aria-controls="panel1-content"
            id="panel1-trigger">
      Section 1
    </button>
  </h3>
  <div id="panel1-content" 
       role="region"
       aria-labelledby="panel1-trigger"
       hidden>
    Content
  </div>
</div>
```

### Alert
```tsx
<div role="alert">
  Important message - announced immediately
</div>

// Or for polite announcements
<div role="status" aria-live="polite">
  Status update
</div>
```

### Button
```tsx
// Native button preferred
<button>Click me</button>

// If custom element necessary
<div role="button" 
     tabIndex={0}
     onClick={handleClick}
     onKeyDown={(e) => {
       if (e.key === ' ' || e.key === 'Enter') {
         e.preventDefault();
         handleClick();
       }
     }}>
  Custom Button
</div>
```

### Checkbox
```tsx
<div role="checkbox"
     tabIndex={0}
     aria-checked={checked}
     onClick={toggle}
     onKeyDown={(e) => {
       if (e.key === ' ') {
         e.preventDefault();
         toggle();
       }
     }}>
  Option
</div>
```

### Combobox (Dropdown)
```tsx
<div className="combobox">
  <label htmlFor="combo-input">Choose:</label>
  <input id="combo-input"
         role="combobox"
         aria-expanded={open}
         aria-controls="listbox"
         aria-autocomplete="list"
         aria-activedescendant={activeId} />
  <ul role="listbox" id="listbox">
    <li role="option" id="opt1">Option 1</li>
    <li role="option" id="opt2">Option 2</li>
  </ul>
</div>
```

### Dialog (Modal)
```tsx
<div role="dialog"
     aria-labelledby="dialog-title"
     aria-describedby="dialog-desc"
     aria-modal="true">
  <h2 id="dialog-title">Title</h2>
  <p id="dialog-desc">Description</p>
  <button onClick={close}>Close</button>
</div>
```

Focus management required:
- Focus moves to dialog on open
- Focus trapped within dialog
- Focus returns to trigger on close

### Disclosure (Show/Hide)
```tsx
<button aria-expanded={expanded}
        aria-controls="content">
  Toggle Details
</button>
<div id="content" hidden={!expanded}>
  Details content
</div>
```

### Link
```tsx
// Navigation links
<a href="/page">Page Link</a>

// Action triggers (use button instead)
<button onClick={action}>Action</button>
```

### Menu
```tsx
<nav>
  <button aria-haspopup="menu"
          aria-expanded={open}
          aria-controls="menu">
    Menu
  </button>
  <ul role="menu" id="menu">
    <li role="menuitem">
      <a href="/1">Item 1</a>
    </li>
    <li role="menuitem">
      <button onClick={action}>Item 2</button>
    </li>
  </ul>
</nav>
```

### Navigation
```tsx
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
```

### Progress
```tsx
<div role="progressbar"
     aria-valuenow={current}
     aria-valuemin={0}
     aria-valuemax={100}
     aria-label="Loading">
  {current}%
</div>
```

### Radio Group
```tsx
<fieldset>
  <legend>Choose option:</legend>
  <div role="radiogroup">
    <div role="radio"
         aria-checked={selected === 'opt1'}
         tabIndex={selected === 'opt1' ? 0 : -1}>
      Option 1
    </div>
    <div role="radio"
         aria-checked={selected === 'opt2'}
         tabIndex={selected === 'opt2' ? 0 : -1}>
      Option 2
    </div>
  </div>
</fieldset>
```

### Slider
```tsx
<div role="slider"
     tabIndex={0}
     aria-valuemin={0}
     aria-valuemax={100}
     aria-valuenow={value}
     aria-label="Volume">
  <div className="slider-track">
    <div className="slider-thumb" />
  </div>
</div>
```

### Switch
```tsx
<button role="switch"
        aria-checked={on}
        onClick={toggle}>
  <span>Dark Mode</span>
</button>
```

### Tabs
```tsx
<div className="tabs">
  <div role="tablist">
    <button role="tab"
            aria-selected={active === 0}
            aria-controls="panel-0"
            tabIndex={active === 0 ? 0 : -1}>
      Tab 1
    </button>
    <button role="tab"
            aria-selected={active === 1}
            aria-controls="panel-1"
            tabIndex={active === 1 ? 0 : -1}>
      Tab 2
    </button>
  </div>
  <div role="tabpanel"
       id="panel-0"
       aria-labelledby="tab-0"
       hidden={active !== 0}>
    Panel 1 content
  </div>
  <div role="tabpanel"
       id="panel-1"
       aria-labelledby="tab-1"
       hidden={active !== 1}>
    Panel 2 content
  </div>
</div>
```

### Tooltip
```tsx
<button aria-describedby="tooltip">
  Info
</button>
<div role="tooltip" id="tooltip">
  Helpful information
</div>
```

## Keyboard Patterns

### Standard Keys
- **Tab**: Move focus to next element
- **Shift+Tab**: Move focus to previous element
- **Enter**: Activate buttons, links
- **Space**: Activate buttons, check boxes
- **Arrow keys**: Navigate within widgets
- **Escape**: Close dialogs, cancel operations
- **Home/End**: Move to first/last item

### Widget-Specific Patterns

#### Menu
- Arrow keys navigate items
- Enter/Space activates item
- Escape closes menu

#### Tabs
- Arrow keys navigate between tabs
- Tab moves to panel content
- Home/End to first/last tab

#### Grid/Table
- Arrow keys navigate cells
- Enter edits cell
- Tab moves through rows

#### Listbox
- Arrow keys navigate options
- Space toggles multiselect
- Type-ahead selection

## Live Regions

### aria-live Values
- **polite**: Announces when idle
- **assertive**: Interrupts current speech
- **off**: No announcement

### Specialized Roles
- **alert**: Important, time-sensitive (assertive)
- **status**: Status update (polite)
- **log**: Sequential information (polite)
- **marquee**: Non-essential updates (off by default)
- **timer**: Countdown or timer (off by default)

## Common Mistakes

### Over-using ARIA
```tsx
// ❌ Bad: Redundant ARIA
<button role="button" aria-label="Submit">Submit</button>

// ✅ Good: Native semantics
<button>Submit</button>
```

### Missing keyboard support
```tsx
// ❌ Bad: Click only
<div role="button" onClick={action}>Click</div>

// ✅ Good: Full keyboard support
<div role="button" 
     tabIndex={0}
     onClick={action}
     onKeyDown={handleKeyboard}>
  Activate
</div>
```

### Wrong ARIA properties
```tsx
// ❌ Bad: aria-expanded on non-control
<div aria-expanded="true">Content</div>

// ✅ Good: aria-expanded on control
<button aria-expanded="true" 
        aria-controls="content">
  Toggle
</button>
<div id="content">Content</div>
```

### Incorrect roles
```tsx
// ❌ Bad: Wrong role
<div role="button">
  <a href="/page">Link text</a>
</div>

// ✅ Good: Correct semantics
<a href="/page">Link text</a>
```

## Testing ARIA

1. Validate role/property combinations
2. Test keyboard navigation completely
3. Verify screen reader announcements
4. Check focus management
5. Test state changes announced
6. Validate accessible names present