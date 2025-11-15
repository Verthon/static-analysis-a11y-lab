import { Box } from './design-system/Box/Box';
import { Heading } from './design-system/Heading/Heading';
import { Typography } from './design-system/Typography/Typography';
import { useTranslation } from './i18n/useTranslation';

export const ContactContent = () => {
  const { t } = useTranslation();

  return (
    <Box as="main" direction="col">
      <Heading as="h1">{t('contact.title')}</Heading>

      <Box as="section" direction="col">
        <Heading as="h2">{t('contact.subtitle')}</Heading>
        <Typography as="p" variant="body">
          {t('contact.description')}
        </Typography>
      </Box>

      <Box as="section" direction="row">
        <Box as="article" direction="col">
          <Heading as="h3">{t('contact.address.title')}</Heading>
          <Typography as="p" variant="small">
            {t('contact.address.street')}
          </Typography>
          <Typography as="p" variant="small">
            {t('contact.address.city')}
          </Typography>
        </Box>

        <Box as="article" direction="col">
          <Heading as="h3">{t('contact.email.title')}</Heading>
          <Typography as="p" variant="small">
            {t('contact.email.address')}
          </Typography>
        </Box>

        <Box as="article" direction="col">
          <Heading as="h3">{t('contact.phone.title')}</Heading>
          <Typography as="p" variant="small">
            {t('contact.phone.number')}
          </Typography>
        </Box>
      </Box>

      <Box as="section" direction="col">
        <Heading as="h3">{t('contact.hours.title')}</Heading>
        <Typography as="p" variant="small">
          {t('contact.hours.weekdays')}
        </Typography>
        <Typography as="p" variant="small">
          {t('contact.hours.weekend')}
        </Typography>
      </Box>
    </Box>
  );
};