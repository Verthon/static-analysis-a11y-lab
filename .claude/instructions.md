# A11y Auditor Available

When asked to audit accessibility:
1. Run: `python .a11y-audit/a11y-auditor/scripts/audit.py [path]`
2. Review the WCAG references in `.a11y-audit/a11y-auditor/references/`
3. Check component mappings for custom TSX components
4. Provide fixes based on audit results

The auditor understands our custom components:
- `<Heading as="h1">` maps to `<h1>`
- Check JSDoc comments for semantic hints