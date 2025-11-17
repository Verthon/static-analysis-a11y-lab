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
    <Box
      as="header"
      direction="row"
      padding="6"
      gap="8"
      alignItems="center"
      justifyContent="between"
    >
      <Link
        to={routesConfig.home}
        className="font-semibold text-gray-900 hover:text-blue-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 rounded"
      >
        <Typography as="span" variant="body">
          {t('nav.logo')}
        </Typography>
      </Link>
      <Box as="nav" direction="row" gap="6">
        <Link
          to={routesConfig.contact}
          className="text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 rounded"
        >
          <Typography as="span" variant="body">
            {t('nav.contact')}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};
