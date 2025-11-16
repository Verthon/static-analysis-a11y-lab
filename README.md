# Static Analysis accessibility lab

Idea for this repo is to discover how much static code analysis tools can give developers on IDE level

## Tooling audited

### VSCode Extensions

1. [Axe Linter](https://marketplace.visualstudio.com/items?itemName=deque-systems.vscode-axe-linter)
    - great thing about this linter is the fact they list all the [rules](https://docs.deque.com/linter/4.0.0/en/axe-linter-rules)
    - requires the additional setup file `axe-linter.yml`
2. [SonarQube](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
    - found false positive for PageLoader `role="status"` to use `output` instead (result of a calculation / user action” + form-associated, label-able control)
3. [Web Accessibility](https://marketplace.visualstudio.com/items?itemName=MaxvanderSchee.web-accessibility)
    - does not work with `.tsx`
4. [A11Y Lint](https://marketplace.visualstudio.com/items?itemName=A11yLint.A11yLint)
    - does not work with `.tsx`

### Linters

- ESLint jsx-a11y
  - big set of rules <https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#supported-rules>
  - you can map your custom components Button to button checks etc
- OXLint jsx-a11y
  - covers everything from ESLint plugin but way faster
- Biome linter
  - found false positive for PageLoader `role="status"` to use `output` instead (result of a calculation / user action” + form-associated, labelable control)

## Challenges

Static code analysis falls short for accessibility:

- a11y is mostly about runtime not just markup
- dynamic nature of the content (when page is loaded etc)
- awareness of the entire page contents (headings order etc)
- most accessibility problems are semantic, not syntactic
- usage of the UI libraries components that encapsulate already some a11y setup

## Next steps

- tests capabilities
- design systems Storybook a11y linting

## Additional resources

List of automated [tools](https://a11y-automation.dev/automated-tools)
