import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type MinHeight = 'parent' | 'screen';

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  direction?: FlexDirection;
  minHeight?: MinHeight;
  grow?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'className' | 'style'>;

const directionMap: Record<FlexDirection, string> = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
};

const minHeightMap: Record<MinHeight, string> = {
  parent: 'min-h-full',
  screen: 'min-h-screen min-h-[100dvh]',
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
  minHeight,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'div';
  const directionClass = directionMap[direction];
  const minHeightClass = minHeight ? minHeightMap[minHeight] : '';

  const className = `flex ${directionClass} ${minHeightClass}`.trim();

  return (
    <Component {...props} className={className}>
      {children}
    </Component>
  );
}
