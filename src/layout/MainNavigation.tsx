import { Link } from 'react-router';
import { Box } from '../design-system/Box/Box';
import { Typography } from '../design-system/Typography/Typography';
import { routesConfig } from '../routing/routesConfig';
import { useLocale } from '../i18n/useLocale';

/**
 * Main navigation component with logo and contact link.
 * Mobile-first design with horizontal layout.
 *
 * @component
 * @accessibility
 * - WCAG 2.0 AA compliant
 * - Uses semantic nav element
 * - Links have accessible text content
 * - Responsive design for mobile and desktop
 */
export const MainNavigation = () => {
  const { t } = useLocale();

  return (
    <Box as="header" direction="row">
      <Link to={routesConfig.home}>
        <Typography as="span" variant="body">
          {t('nav.logo')}
        </Typography>
      </Link>
      <Link to={routesConfig.contact}>
        <Typography as="span" variant="body">
          {t('nav.contact')}
        </Typography>
      </Link>
    </Box>
  );
};
