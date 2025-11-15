import { useIntl } from "react-intl";
import type en from "./en.json";

import { useLocaleContext } from "./LocaleProvider";

export type GeneralMessageKey = keyof typeof en;

export type MessageKey = GeneralMessageKey;

type TranslateFn = <K extends MessageKey>(
  key: K,
  values?: Record<string, string>
) => string;

interface UseLocaleReturn {
  locale: ReturnType<typeof useLocaleContext>["locale"];
  setLocale: ReturnType<typeof useLocaleContext>["setLocale"];
  t: TranslateFn;
}

export const useLocale = (): UseLocaleReturn => {
  const { locale, setLocale } = useLocaleContext();
  const intl = useIntl();

  const t: TranslateFn = (key, values) =>
    intl.formatMessage({ id: key }, values);

  return { locale, setLocale, t };
};
