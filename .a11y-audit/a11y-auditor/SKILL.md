---
name: a11y-auditor
description: WCAG 2.0 AA accessibility auditor for TSX/React codebases. Performs static code analysis to identify accessibility issues that automated linters miss, including semantic quality, content context, and custom component patterns. Use when auditing code for accessibility compliance, reviewing components for a11y best practices, or validating WCAG 2.0 AA criteria in React/TSX projects.
---

# A11y Auditor - WCAG 2.0 AA Compliance

## Audit Mode Activation

When user requests accessibility audit:
1. Identify target paths/folders specified by user
2. Load W3C references before analysis (see references/)
3. Map custom components to semantic HTML equivalents
4. Perform static code analysis against WCAG 2.0 AA criteria

## Component Mapping Rules

### Custom Component Recognition
Identify semantic meaning from JSDoc comments and props:
- `<Heading as="h1">` → `<h1>`
- `<Button variant="primary">` → `<button>`
- `<Link to="/path">` → `<a href="/path">`
- `<TextInput type="email">` → `<input type="email">`

Always check component definition JSDoc for semantic hints.

## Critical Analysis Areas

### 1. Perceivable (WCAG Principle 1)

#### Images & Media
- Alt text quality (descriptive, not just present)
- Complex images have long descriptions
- Decorative images use `alt=""` or `role="presentation"`
- Video/audio have captions/transcripts

#### Color & Contrast
- Information not conveyed by color alone
- Error states have icons/text, not just red color
- Links distinguishable without color
- Check for color contrast issues in inline styles

### 2. Operable (WCAG Principle 2)

#### Keyboard Navigation
- All interactive elements keyboard accessible
- No keyboard traps (check modal/dropdown patterns)
- Focus order matches visual order
- Skip navigation links present
- Custom widgets follow ARIA authoring practices

#### Focus Management
- Focus visible on all interactive elements
- Focus moves logically through page
- Focus returns appropriately after modal close
- Focus not lost on dynamic content updates

### 3. Understandable (WCAG Principle 3)

#### Content Quality
- Link text descriptive without context
- Button text indicates action
- Error messages specific and helpful
- Instructions don't rely on sensory characteristics
- Form labels clear and associated correctly

#### Predictability
- Navigation consistent across pages
- Components behave predictably
- Context changes announced or user-initiated

### 4. Robust (WCAG Principle 4)

#### Semantic HTML
- Correct elements for purpose (button vs div+onClick)
- Heading hierarchy logical (no skipped levels)
- Lists use ul/ol/dl appropriately
- Landmarks used correctly

#### ARIA Usage
- ARIA only when native HTML insufficient
- ARIA roles match component behavior
- Required ARIA properties present
- ARIA states update dynamically

## Analysis Workflow

### Phase 1: Component Inventory
```
For each file in audit path:
1. Identify all interactive elements
2. Map custom components to semantic equivalents
3. Note component patterns and variations
```

### Phase 2: Pattern Detection
Check for anti-patterns automated tools miss:

```typescript
// ❌ BAD: Generic alt text
<img src="chart.png" alt="image" />
<img src="photo.jpg" alt="photo" />

// ❌ BAD: Non-semantic interactive element
<div onClick={handleClick}>Click me</div>
<span onKeyDown={handleKey}>Select</span>

// ❌ BAD: Orphan heading levels
<h1>Title</h1>
<h3>Subtitle</h3> // Missing h2

// ❌ BAD: Ambiguous link text
<a href="/more">Read more</a>
<a href="/details">Click here</a>

// ❌ BAD: Color-only status
<div style={{color: status === 'error' ? 'red' : 'green'}}>
  {message}
</div>

// ❌ BAD: Missing form associations
<label>Email</label>
<input type="email" />

// ❌ BAD: Inaccessible custom dropdown
<div className="dropdown" onClick={toggle}>
  <div>{selected}</div>
  <div className="options">{options}</div>
</div>
```

### Phase 3: Context Analysis

Evaluate semantic meaning beyond syntax:

1. **Alt Text Quality**
   - Does it describe image purpose/content?
   - Is it redundant with surrounding text?
   - Does it include "image of" unnecessarily?

2. **Link Context**
   - Can purpose be determined from link text alone?
   - Are multiple "read more" links distinguishable?
   - Do links indicate external/download/new window?

3. **Form Usability**
   - Are required fields marked clearly?
   - Do errors explain what's wrong and how to fix?
   - Is field purpose clear from label alone?

4. **Heading Structure**
   - Does hierarchy reflect content structure?
   - Is there exactly one h1?
   - Are headings used for structure, not styling?

## Severity Classification

### Critical (Blocks Access)
- Keyboard traps
- Missing alt text on informative images
- Form inputs without labels
- Inaccessible custom widgets
- Content only available via mouse

### Major (Significant Barrier)
- Poor alt text quality
- Ambiguous link text
- Missing skip navigation
- Inconsistent navigation
- Color-only information

### Minor (Usability Issue)
- Skipped heading levels
- Decorative images with alt text
- Redundant ARIA
- Focus order issues
- Missing landmarks

## Report Format

```markdown
# Accessibility Audit Report

## Summary
- Files Analyzed: X
- Critical Issues: X
- Major Issues: X
- Minor Issues: X
- WCAG 2.0 AA Compliance: PASS/FAIL

## Critical Issues

### [Component/File Path]
**Issue**: [Specific problem]
**WCAG Criterion**: [e.g., 1.1.1 Non-text Content]
**Impact**: [Who is affected and how]
**Current Code**:
```tsx
[problematic code]
```
**Recommended Fix**:
```tsx
[accessible code]
```

## Patterns Observed
- [Recurring issues across codebase]
- [Component patterns needing standardization]
- [Training opportunities identified]

## Recommendations
1. Immediate fixes for critical issues
2. Component library improvements
3. Development guidelines updates
```

## Required References

Before starting audit, always read:
1. `references/wcag-checklist.md` - Complete WCAG 2.0 AA criteria
2. `references/aria-patterns.md` - Correct ARIA widget patterns
3. `references/component-mapping.md` - TSX component semantic mappings

## Custom Component Analysis

When encountering custom components:

1. Check component definition for JSDoc
2. Analyze props for semantic hints
3. Look for `as`, `role`, or `component` props
4. Check rendered output if available
5. Map to closest semantic HTML element

Example analysis:
```tsx
/**
 * @component Button
 * @description Accessible button component
 * @prop {string} variant - Visual style
 * @prop {boolean} disabled - Disabled state
 */
export const Button: FC<ButtonProps> = ({ 
  children, 
  onClick, 
  disabled,
  ...rest 
}) => {
  // This maps to native <button>
  return <button disabled={disabled} onClick={onClick} {...rest}>
    {children}
  </button>
}
```

## Success Criteria

Audit passes when:
- ✅ No critical issues found
- ✅ Major issues have remediation plan
- ✅ All WCAG 2.0 AA criteria addressed
- ✅ Custom components properly mapped
- ✅ Actionable recommendations provided

## Important Notes

- Focus on issues linters cannot detect
- Prioritize user impact over technical compliance
- Consider context and actual usage patterns
- Test assumptions about custom components
- Provide specific, actionable fixes
- Reference W3C specifications directly