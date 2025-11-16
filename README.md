# Static Analysis accessibility lab

Idea for this repo is to discover how much static code analysis tools can give developers on IDE level

## Tooling audited

### VSCode Extensions

1. [Web Accessibility](https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility)
    - does not work with `.tsx`
2. [Axe Linter](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter)
    - great thing about this linter is the fact they list all the [rules](https://docs.deque.com/linter/4.0.0/en/axe-linter-rules)
3. [A11Y Lint](https://marketplace.visualstudio.com/items?itemName=A11yLint.A11yLint)
    - does not work with `.tsx`

### Linters

- ESLint jsx-a11y

## Challenges

Static code analysis falls short for accessibility:

- a11y is mostly about runtime not just markup
- dynamic nature of the content (when page is loaded etc)
- awareness of the entire page contents (headings order etc)
- most accessibility problems are semantic, not syntactic
- usage of the UI libraries components that encapsulate already some a11y setup

## Additional resources

List of automated [tools](https://a11y-automation.dev/automated-tools)
