import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';
type MinHeight = 'parent' | 'screen';
type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type Gap = '1' | '2' | '3' | '4' | '6' | '8' | '12' | '16';
type Padding = '2' | '3' | '4' | '6' | '8' | '12' | '16';

type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  direction?: FlexDirection;
  minHeight?: MinHeight;
  grow?: boolean;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  gap?: Gap;
  padding?: Padding;
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

const alignItemsMap: Record<AlignItems, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyContentMap: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const gapMap: Record<Gap, string> = {
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
  '12': 'gap-12',
  '16': 'gap-16',
};

const paddingMap: Record<Padding, string> = {
  '2': 'p-2',
  '3': 'p-3',
  '4': 'p-4',
  '6': 'p-6',
  '8': 'p-8',
  '12': 'p-12',
  '16': 'p-16',
};

/**
 * A polymorphic layout component that renders a flex container.
 * Can be rendered as any HTML element via the `as` prop.
 *
 * @component
 * @example
 * ```tsx
 * <Box direction="col" gap="4" padding="6">Content</Box>
 * <Box as="section" direction="row" justifyContent="between" alignItems="center">Content</Box>
 * <Box as="footer" direction="col" gap="2" padding="8">Footer</Box>
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
  alignItems,
  justifyContent,
  gap,
  padding,
  ...props
}: PolymorphicProps<T>) {
  const Component = as ?? 'div';
  const directionClass = directionMap[direction];
  const minHeightClass = minHeight ? minHeightMap[minHeight] : '';
  const alignItemsClass = alignItems ? alignItemsMap[alignItems] : '';
  const justifyContentClass = justifyContent ? justifyContentMap[justifyContent] : '';
  const gapClass = gap ? gapMap[gap] : '';
  const paddingClass = padding ? paddingMap[padding] : '';

  const className = `flex ${directionClass} ${minHeightClass} ${alignItemsClass} ${justifyContentClass} ${gapClass} ${paddingClass}`.trim();

  return (
    <Component {...props} className={className}>
      {children}
    </Component>
  );
}
