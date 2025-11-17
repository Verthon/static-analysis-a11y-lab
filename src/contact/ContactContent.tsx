import { Box } from '../design-system/Box/Box';
import { Heading } from '../design-system/Heading/Heading';
import { Typography } from '../design-system/Typography/Typography';
import { useLocale } from '../i18n/useLocale';
import { usePageMeta } from '../hooks/usePageMeta';
import { ContactForm } from './ContactForm';

export const ContactContent = () => {
  const { t } = useLocale();

  usePageMeta({
    title: t('contact.meta.title'),
    description: t('contact.meta.description'),
  });

  return (
    <Box as="main" direction="col" padding="8" gap="12">
      <Box direction="col" gap="2">
        <Heading as="h1">{t('contact.title')}</Heading>
      </Box>

      <Box as="section" direction="col" gap="4">
        <Heading as="h2">{t('contact.subtitle')}</Heading>
        <Typography as="p" variant="body">
          {t('contact.description')}
        </Typography>
      </Box>

      <Box as="section" direction="col">
        <ContactForm />
      </Box>

      <Box as="section" direction="row" gap="8">
        <Box as="article" direction="col" gap="2">
          <Heading as="h3">{t('contact.address.title')}</Heading>
          <Typography as="p" variant="small">
            {t('contact.address.street')}
          </Typography>
          <Typography as="p" variant="small">
            {t('contact.address.city')}
          </Typography>
        </Box>

        <Box as="article" direction="col" gap="2">
          <Heading as="h3">{t('contact.email.title')}</Heading>
          <Typography as="p" variant="small">
            {t('contact.email.address')}
          </Typography>
        </Box>

        <Box as="article" direction="col" gap="2">
          <Heading as="h3">{t('contact.phone.title')}</Heading>
          <Typography as="p" variant="small">
            {t('contact.phone.number')}
          </Typography>
        </Box>
      </Box>

      <Box as="section" direction="col" gap="2">
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