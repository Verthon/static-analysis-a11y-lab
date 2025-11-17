# TSX Component Semantic Mappings

## Core Mapping Principles

1. Check JSDoc comments for semantic hints
2. Analyze `as`, `component`, or `role` props
3. Look for HTML element in render return
4. Consider component name and purpose
5. Check for ARIA attributes

## Common Component Libraries

### Material-UI (MUI)
```tsx
// Typography
<Typography variant="h1"> → <h1>
<Typography variant="body1"> → <p>
<Typography component="span"> → <span>

// Buttons & Links  
<Button> → <button>
<IconButton> → <button>
<Link> → <a>
<Fab> → <button>

// Form Controls
<TextField> → <input> with <label>
<Select> → <select>
<Checkbox> → <input type="checkbox">
<Radio> → <input type="radio">
<Switch> → <input type="checkbox" role="switch">

// Layout
<AppBar> → <header>
<Drawer> → <nav> or <aside>
<Paper> → <article> or <section>
<Card> → <article>
<List> → <ul>
<ListItem> → <li>

// Feedback
<Alert> → <div role="alert">
<Snackbar> → <div role="status">
<Dialog> → <div role="dialog">
```

### Ant Design
```tsx
// Typography
<Title level={1}> → <h1>
<Text> → <span>
<Paragraph> → <p>

// Buttons & Navigation
<Button> → <button>
<Link> → <a>
<Breadcrumb> → <nav aria-label="breadcrumb">
<Menu> → <ul role="menu">

// Form Controls
<Input> → <input>
<Select> → <select>
<Checkbox> → <input type="checkbox">
<Radio> → <input type="radio">
<Switch> → <button role="switch">
<DatePicker> → <input type="date">

// Layout
<Layout.Header> → <header>
<Layout.Footer> → <footer>
<Layout.Sider> → <aside>
<Layout.Content> → <main>

// Feedback
<Alert> → <div role="alert">
<Modal> → <div role="dialog">
<Notification> → <div role="status">
```

### Chakra UI
```tsx
// Typography
<Heading as="h1"> → <h1>
<Text> → <p>
<Link> → <a>

// Buttons & Controls
<Button> → <button>
<IconButton> → <button>
<Checkbox> → <input type="checkbox">
<Radio> → <input type="radio">
<Switch> → <input type="checkbox" role="switch">

// Form Controls
<Input> → <input>
<Textarea> → <textarea>
<Select> → <select>
<FormLabel> → <label>
<FormHelperText> → <span>
<FormErrorMessage> → <span role="alert">

// Layout
<Box> → <div>
<Flex> → <div>
<Grid> → <div>
<Container> → <div>
<Stack> → <div>

// Feedback
<Alert> → <div role="alert">
<Toast> → <div role="status">
<Modal> → <div role="dialog">
```

### React Bootstrap
```tsx
// Typography  
<h1> to <h6> → Direct mapping

// Navigation
<Nav> → <nav>
<Navbar> → <nav>
<Breadcrumb> → <nav aria-label="breadcrumb">
<Pagination> → <nav aria-label="pagination">

// Buttons & Controls
<Button> → <button>
<ToggleButton> → <button aria-pressed>

// Forms
<Form.Control> → <input>
<Form.Select> → <select>
<Form.Check> → <input type="checkbox|radio">
<Form.Label> → <label>
<Form.Text> → <span>

// Layout
<Container> → <div>
<Row> → <div>
<Col> → <div>
<Card> → <article>

// Feedback
<Alert> → <div role="alert">
<Modal> → <div role="dialog">
<Toast> → <div role="status">
```

### Semantic UI React
```tsx
// Typography
<Header as="h1"> → <h1>

// Buttons & Navigation
<Button> → <button>
<Menu> → <nav> or <ul role="menu">

// Forms
<Input> → <input>
<TextArea> → <textarea>
<Select> → <select>
<Checkbox> → <input type="checkbox">
<Radio> → <input type="radio">

// Layout
<Container> → <div>
<Segment> → <section>
<Grid> → <div>

// Feedback
<Message> → <div role="alert">
<Modal> → <div role="dialog">
```

## Custom Component Patterns

### Heading Components
```tsx
// Pattern 1: as prop
<Heading as="h2">Title</Heading> → <h2>

// Pattern 2: level prop
<Heading level={3}>Title</Heading> → <h3>

// Pattern 3: variant prop
<Typography variant="h4">Title</Typography> → <h4>

// Pattern 4: component prop
<Text component="h5">Title</Text> → <h5>
```

### Button Components
```tsx
// Pattern 1: Basic button
<Button>Click</Button> → <button>

// Pattern 2: Link button
<Button href="/path">Go</Button> → <a href="/path">

// Pattern 3: as prop
<Button as="a" href="/path">Link</Button> → <a>

// Pattern 4: component prop
<Button component={Link} to="/path">Nav</Button> → <a>
```

### Form Components
```tsx
// Pattern 1: Wrapped input
<TextField label="Name" /> → <label> + <input>

// Pattern 2: Separate label
<FormLabel htmlFor="field">Label</FormLabel>
<Input id="field" /> → <label> + <input>

// Pattern 3: Compound component
<FormControl>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormHelperText>Enter email</FormHelperText>
</FormControl> → <label> + <input> + <span>
```

## Detection Strategies

### 1. Check Render Method
```tsx
// Look for return statement
render() {
  return <button>{children}</button> // → <button>
}

// Or function component return
return (
  <a href={href}>{children}</a> // → <a>
)
```

### 2. Check for Element Spread
```tsx
// Element type from props
const Element = as || 'div';
return <Element {...props} /> // → depends on 'as' prop

// Component prop pattern
const Component = component || Button;
return <Component {...props} /> // → depends on component
```

### 3. Check Role Attribute
```tsx
return (
  <div role="button" tabIndex={0}> // → acts as <button>
    {children}
  </div>
)
```

### 4. Check ARIA Attributes
```tsx
// Dialog pattern
<div role="dialog" aria-modal="true"> // → modal dialog

// Navigation pattern  
<nav aria-label="Main navigation"> // → navigation landmark

// Alert pattern
<div role="alert" aria-live="assertive"> // → alert region
```

## Common Anti-Patterns

### Non-Semantic Wrappers
```tsx
// ❌ Bad: Wrapper without semantics
<Box onClick={handleClick}>Click me</Box>

// ✅ Map to: <button>
<Button onClick={handleClick}>Click me</Button>
```

### Missing Semantic Props
```tsx
// ❌ Bad: Heading without level
<Text>Page Title</Text>

// ✅ Map to: <h1>
<Heading as="h1">Page Title</Heading>
```

### Role Misuse
```tsx
// ❌ Bad: Wrong role
<span role="button" onClick={action}>Click</span>

// ✅ Map to: <button>
<button onClick={action}>Click</button>
```

## Testing Component Mappings

1. **Inspect JSDoc**
   - Look for @component tags
   - Check @prop descriptions
   - Note semantic hints

2. **Analyze Props**
   - Check for `as`, `component`, `role`
   - Look for HTML attributes
   - Check event handlers

3. **Review Render Output**
   - Trace to final HTML element
   - Check applied ARIA attributes
   - Verify keyboard support

4. **Test Behavior**
   - Keyboard interaction works
   - Screen reader announces correctly
   - Focus management appropriate