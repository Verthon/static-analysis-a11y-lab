import { Link } from 'react-router';
import { Box } from '../design-system/Box/Box';
import { Typography } from '../design-system/Typography/Typography';
import { routesConfig } from '../routing/routesConfig';
import { useLocale } from '../i18n/useLocale';

/**
 * Main footer component with copyright and contact link.
 *
 * @component
 * @accessibility
 * - WCAG 2.0 AA compliant
 * - Uses semantic footer element
 * - Link has accessible text content
 */
export const MainFooter = () => {
  const { t } = useLocale();

  return (
    <Box as="footer" direction="col">
      <Box as="nav" direction="row">
        <Link to={routesConfig.contact}>
          <Typography as="span" variant="small">
            {t('footer.contact')}
          </Typography>
        </Link>
      </Box>
      <Typography as="p" variant="caption">
        {t('footer.copyright')}
      </Typography>
    </Box>
  );
};
