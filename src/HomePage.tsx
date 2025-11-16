import { Box } from "./design-system/Box/Box";
import { Heading } from "./design-system/Heading/Heading";
import { usePageMeta } from "./hooks/usePageMeta";
import { useLocale } from "./i18n/useLocale";

const HomePage = () => {
  const { t } = useLocale();

  usePageMeta({
    title: t('home.meta.title'),
    description: t('home.meta.description'),
  });

  return (
    <Box as="main">
      <Heading as="h1">Homepage</Heading>
    </Box>
  );
};

export default HomePage;
