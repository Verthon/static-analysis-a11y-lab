import type { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

import enMessages from './en.json';
import esMessages from './es.json';

import { LocaleProvider, useLocaleContext } from './LocaleProvider';

const messagesByLocale = {
  en: enMessages,
  es: esMessages
} as const;

export const I18nProvider = ({ children }: { children: ReactNode }) => (
  <LocaleProvider>
    <InnerIntlProvider>{children}</InnerIntlProvider>
  </LocaleProvider>
);

const InnerIntlProvider = ({ children }: { children: ReactNode }) => {
  const { locale } = useLocaleContext();
  const messages = messagesByLocale[locale] ?? messagesByLocale.en;

  return (
    <IntlProvider locale={locale} defaultLocale="en" messages={messages}>
      {children}
    </IntlProvider>
  );
};
