# WCAG 2.0 AA Checklist

Source: W3C Web Accessibility Initiative
Reference: https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_customize&levels=aaa

## Principle 1: Perceivable

### 1.1 Text Alternatives
#### 1.1.1 Non-text Content (A)
- All images, form image buttons, and image map hot spots have appropriate alt text
- Images that do not convey content have alt=""
- Complex images have longer descriptions via longdesc or aria-describedby
- Form buttons have descriptive value
- Form inputs have associated text labels

### 1.2 Time-based Media
#### 1.2.1 Audio-only and Video-only (A)
- Transcript provided for audio-only content
- Video-only content has text or audio description

#### 1.2.2 Captions (A)
- Synchronized captions for video with audio

#### 1.2.3 Audio Description (A)
- Audio description or text alternative for video

#### 1.2.4 Captions Live (AA)
- Live captions for live audio content

#### 1.2.5 Audio Description (AA)
- Audio description for prerecorded video

### 1.3 Adaptable
#### 1.3.1 Info and Relationships (A)
- Semantic markup used for headings, lists, emphasized text
- Tables use proper headers and data cells
- Form labels associated with controls
- Related form fields grouped with fieldset/legend

#### 1.3.2 Meaningful Sequence (A)
- Reading order logical and intuitive
- CSS not used to change meaning
- Tabindex used appropriately if needed

#### 1.3.3 Sensory Characteristics (A)
- Instructions don't rely solely on shape, size, location
- Instructions don't rely solely on sound

### 1.4 Distinguishable
#### 1.4.1 Use of Color (A)
- Color not sole method of conveying information
- Links distinguishable without color

#### 1.4.2 Audio Control (A)
- Auto-playing audio can be paused/stopped

#### 1.4.3 Contrast Minimum (AA)
- Text has 4.5:1 contrast ratio
- Large text has 3:1 contrast ratio

#### 1.4.4 Resize Text (AA)
- Text resizable to 200% without assistive technology
- No horizontal scrolling at standard viewport

#### 1.4.5 Images of Text (AA)
- Actual text used instead of images of text
- Exception for logos and essential images

## Principle 2: Operable

### 2.1 Keyboard Accessible
#### 2.1.1 Keyboard (A)
- All functionality available via keyboard
- No keyboard traps
- Standard keyboard shortcuts work

#### 2.1.2 No Keyboard Trap (A)
- Keyboard focus can move away from all components
- Exit instructions provided if non-standard

### 2.2 Enough Time
#### 2.2.1 Timing Adjustable (A)
- Time limits can be turned off, adjusted, or extended
- Exception for real-time events

#### 2.2.2 Pause, Stop, Hide (A)
- Moving/blinking content can be paused
- Auto-updating content can be paused
- No content flashes more than 3 times per second

### 2.3 Seizures
#### 2.3.1 Three Flashes (A)
- No content flashes more than 3 times per second
- Flash is below general and red flash thresholds

### 2.4 Navigable
#### 2.4.1 Bypass Blocks (A)
- Skip navigation link or landmark regions
- Skiplink target at beginning of main content

#### 2.4.2 Page Titled (A)
- Page has descriptive and unique title
- Title identifies site and page

#### 2.4.3 Focus Order (A)
- Tab order follows logical sequence
- Focus moves predictably

#### 2.4.4 Link Purpose In Context (A)
- Link purpose determinable from link text
- Or from link text with surrounding context

#### 2.4.5 Multiple Ways (AA)
- Multiple ways to find pages (search, sitemap, nav)

#### 2.4.6 Headings and Labels (AA)
- Headings describe topic or purpose
- Labels describe input purpose

#### 2.4.7 Focus Visible (AA)
- Keyboard focus indicator visible
- Custom focus styles maintain visibility

## Principle 3: Understandable

### 3.1 Readable
#### 3.1.1 Language of Page (A)
- Page language identified in html lang attribute
- Language correct for content

#### 3.1.2 Language of Parts (AA)
- Language changes identified with lang attribute
- Applies to passages in different language

### 3.2 Predictable
#### 3.2.1 On Focus (A)
- No context change on focus alone
- Focus doesn't trigger form submission

#### 3.2.2 On Input (A)
- No context change on input alone
- Changes described before input

#### 3.2.3 Consistent Navigation (AA)
- Navigation consistent across pages
- Navigation in same relative order

#### 3.2.4 Consistent Identification (AA)
- Components with same function identified consistently
- Icons, labels consistent across pages

### 3.3 Input Assistance
#### 3.3.1 Error Identification (A)
- Errors clearly identified
- Error described to user in text

#### 3.3.2 Labels or Instructions (A)
- Labels provided for input
- Required fields marked
- Format instructions provided

#### 3.3.3 Error Suggestion (AA)
- Suggestions provided for fixing errors
- Format examples given

#### 3.3.4 Error Prevention Legal/Financial (AA)
- Submissions can be reversed, checked, or confirmed
- Applies to legal, financial, data deletion

## Principle 4: Robust

### 4.1 Compatible
#### 4.1.1 Parsing (A)
- Valid HTML/XHTML
- IDs are unique
- Elements properly nested
- Attributes not duplicated

#### 4.1.2 Name, Role, Value (A)
- All UI components have name and role
- States, properties, values can be set programmatically
- Changes notified to assistive technology

## Testing Checklist

### Manual Code Review Focus
- [ ] Alt text quality (not just presence)
- [ ] Link text descriptiveness
- [ ] Heading hierarchy logic
- [ ] Form label helpfulness
- [ ] Error message clarity
- [ ] Color independence
- [ ] Keyboard trap assessment
- [ ] Focus order logic
- [ ] ARIA appropriateness
- [ ] Custom component semantics

### Pattern Recognition
- [ ] Generic alt text ("image", "photo", "icon")
- [ ] "Click here" or "Read more" links
- [ ] Orphaned headings (h1 → h3)
- [ ] Unlabeled form inputs
- [ ] Color-only status indicators
- [ ] Non-semantic clickable divs
- [ ] Missing skip navigation
- [ ] Inconsistent navigation patterns
- [ ] Focus management in SPAs
- [ ] ARIA misuse or overuse