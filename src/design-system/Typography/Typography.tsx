import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TypographyVariant = 'body' | 'small' | 'caption';

type BaseTypographyProps = {
  variant?: TypographyVariant;
  children?: ReactNode;
};

type ParagraphProps = BaseTypographyProps & {
  as: 'p';
} & Omit<ComponentPropsWithoutRef<'p'>, 'className'>;

type SpanProps = BaseTypographyProps & {
  as: 'span';
} & Omit<ComponentPropsWithoutRef<'span'>, 'className'>;

type TypographyProps = ParagraphProps | SpanProps;

const variantStyles: Record<TypographyVariant, string> = {
  body: 'text-base leading-relaxed',
  small: 'text-sm leading-normal',
  caption: 'text-xs leading-tight',
};

/**
 * A typography component for rendering text content with consistent styling.
 *
 * Provides:
 * - Type-safe element selection (p or span)
 * - Consistent typography variants
 * - Proper semantic HTML for text content
 *
 * @component
 * @example
 * ```tsx
 * <Typography as="p" variant="body">This is body text</Typography>
 * <Typography as="span" variant="small">Small inline text</Typography>
 * <Typography as="p" variant="caption">Caption text</Typography>
 * ```
 *
 * @accessibility
 * - WCAG 2.0 AA compliant
 * - Use `p` for block-level text content
 * - Use `span` for inline text or when nested in other text elements
 * - Maintains proper text hierarchy and readability
 */
export function Typography({
  as,
  variant = 'body',
  children,
  ...props
}: TypographyProps) {
  const Component = as;
  const styles = variantStyles[variant];

  return (
    <Component {...props} className={styles}>
      {children}
    </Component>
  );
}
