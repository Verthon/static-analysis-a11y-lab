import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'style' | 'className'>;

/**
 * Hides content visually while keeping it accessible to screen readers.
 *
 * Uses the "visually-hidden" CSS pattern that:
 * - Removes content from visual flow without using display:none or visibility:hidden
 * - Keeps content in the accessibility tree for screen readers
 * - Prevents content from affecting layout
 *
 * @component
 * @example
 * ```tsx
 * <VisuallyHidden>Skip to main content</VisuallyHidden>
 * <VisuallyHidden as="span">Accessible label</VisuallyHidden>
 * ```
 *
 * @accessibility
 * - WCAG 2.0 AA compliant
 * - Content remains accessible to assistive technologies
 * - Commonly used for skip links, accessible labels, and screen reader-only text
 * - Does not use display:none or visibility:hidden which would hide from screen readers
 */
export function VisuallyHidden<T extends ElementType = 'span'>({
  as,
  children,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'span';

  return (
    <Component
      {...props}
      className="absolute size-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
    >
      {children}
    </Component>
  );
}
