import type { ReactNode } from 'react';
import { Box } from '../design-system/Box/Box';
import { MainFooter } from './MainFooter';
import { MainNavigation } from './MainNavigation';

type MainLayoutProps = {
  children: ReactNode;
};

/**
 * Main layout component that wraps all pages.
 * Provides consistent navigation and footer across the application.
 *
 * @component
 * @accessibility
 * - WCAG 2.0 AA compliant
 * - Proper landmark structure (nav, main, footer)
 * - Mobile-first responsive design
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box as="div" direction="col">
      <MainNavigation />
      {children}
      <MainFooter />
    </Box>
  );
};
