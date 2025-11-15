import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  direction?: FlexDirection;
} & ComponentPropsWithoutRef<T>;

const directionMap: Record<FlexDirection, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
};

/**
 * A polymorphic layout component that renders a flex container.
 * Can be rendered as any HTML element via the `as` prop.
 *
 * @component
 * @example
 * ```tsx
 * <Box direction="col">Content</Box>
 * <Box as="section" direction="row">Content</Box>
 * <Box as="article" direction="col-reverse">Content</Box>
 * ```
 *
 * @accessibility
 * - WCAG 2.0 AA compliant
 * - Preserves semantic HTML through polymorphic `as` prop
 * - Flex layout respects reading order and screen reader flow
 */
export function Box<T extends ElementType = 'div'>({
  as,
  children,
  direction = 'row',
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'div';
  const directionClass = directionMap[direction];

  return (
    <Component {...props} className={`flex ${directionClass}`}>
      {children}
    </Component>
  );
}
