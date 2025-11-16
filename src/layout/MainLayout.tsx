import type { ReactNode } from 'react';
import { Box } from '../design-system/Box/Box';
import { MainFooter } from './MainFooter';
import { MainNavigation } from './MainNavigation';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box direction="col" >
      <MainNavigation />
      {children}
      <MainFooter />
    </Box>
  );
};
