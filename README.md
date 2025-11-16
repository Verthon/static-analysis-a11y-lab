# Static Analysis accessibility lab

Idea for this repo is to discover how much static code analysis tools can give developers on IDE/Terminal level.
Automating accessibility checks is hard, experts from [Deque](https://www.deque.com/) claim that "Please note that only 20% to 50% of all accessibility issues can automatically be detected."

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

- [ESLint jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
  - big set of rules <https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#supported-rules>
  - you can map your custom components Button to button checks etc
- [OXLint jsx-a11y](https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#settings-jsx-a11y)
  - covers everything from ESLint plugin but way faster
- [Biome linter](https://biomejs.dev/linter/)
  - found false positive for PageLoader `role="status"` to use `output` instead (result of a calculation / user action” + form-associated, labelable control)
- [Storybook a11y](https://storybook.js.org/docs/writing-tests/accessibility-testing#accessibility-checks-with-a11y-addon)
  - in this repo just static analysis in the a11y tab of Storybook

### CLI

- [Axe CLI](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/cli/README.md)
  - lacks the ability of Axe Linter to add custom components handling as HTML tags, therefore it is useful for prod builds only

## Challenges

Static code analysis falls short for accessibility:

- a11y is mostly about runtime not just markup
- dynamic nature of the content (when page is loaded etc)
- awareness of the entire page contents (headings order etc)
- most accessibility problems are semantic, not syntactic
- usage of the UI libraries components that encapsulate already some a11y setup

## Next steps

- tests capabilities for regular UI
- design system Storybook a11y interactive testing
- browser plugins like [Axe Core](https://www.deque.com/axe/devtools/chrome-browser-extension/) or [Wave](https://wave.webaim.org/extension/)

## Additional resources

List of automated [tools](https://a11y-automation.dev/automated-tools)
