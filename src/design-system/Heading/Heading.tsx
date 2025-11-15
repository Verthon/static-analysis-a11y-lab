import type { JSX, ReactNode } from 'react';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingProps<T extends HeadingLevel> = {
  as: T;
  children?: ReactNode;
} & Omit<JSX.IntrinsicElements[T], 'className'>;

const headingStyles: Record<HeadingLevel, string> = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-semibold',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium',
};

/**
 * A semantic heading component that renders h1-h6 elements with consistent styling.
 *
 * Provides:
 * - Type-safe heading level selection (h1-h6 only)
 * - Consistent typography scale
 * - Proper semantic HTML structure
 *
 * @component
 * @example
 * ```tsx
 * <Heading as="h1">Page Title</Heading>
 * <Heading as="h2">Section Title</Heading>
 * <Heading as="h3">Subsection Title</Heading>
 * ```
 *
 * @accessibility
 * - WCAG 2.0 AA compliant
 * - Maintains proper heading hierarchy for screen readers
 * - Use heading levels sequentially (don't skip levels)
 * - Only one h1 per page recommended
 */
export function Heading<T extends HeadingLevel>({
  as,
  children,
  ...props
}: HeadingProps<T>) {
  const Component = as as HeadingLevel;
  const styles = headingStyles[Component];

  return (
    <Component {...props} className={styles}>
      {children}
    </Component>
  );
}
