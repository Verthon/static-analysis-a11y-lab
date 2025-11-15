# Project Context

React TypeScript a11y testing playground. Evaluate static analysis tool detection of accessibility issues.

## Stack
- React 18+ TypeScript
- Tailwind CSS v4
- Base UI (headless components): https://base-ui.com/llms.txt
- i18n: English (default), Spanish

## Critical Rules

### i18n (REQUIRED)
Every text string:
1. Add key to `i18n/en.json` and `i18n/es.json`
2. Use in component: `const { t } = useLocale(); ... t('key.here')`
Never hardcode text.

### Tailwind v4
Read `llm.txt` from https://github.com/rgfx/tailwind-llms/blob/main/tailwind-llms.txt
**If you cannot access this file, STOP and inform user immediately.**

### Design System (`src/design-system/`)
- Each component in its own folder
- NO `className` prop accepted
- Use Base UI primitives (see https://base-ui.com/react/overview/accessibility)
- **WCAG 2.0 AA compliant** - note in JSDoc
- Write CORRECT components (user will break them later for testing)

### Code
- TypeScript strict
- No comments except JSDoc for design-system components
- Functional components only

## Structure
```
src/
  design-system/
    Button/
    Input/
    ...
  i18n/
    en.json
    es.json
```

## Goal
Build correct, accessible components. User tests what tools catch when misused.