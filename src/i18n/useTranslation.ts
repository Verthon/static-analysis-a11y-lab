import { createElement, type ReactElement } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import en from "./en.json";
import es from "./es.json";

import { useLocaleContext } from "./LocaleProvider";
import type { MessageValues } from "./types";

const allMessages = {
  ...en,
  ...es,
} as const;

export type MessageKey = keyof typeof allMessages;
type MessageContent<K extends MessageKey> = (typeof allMessages)[K];

type ValuesRequired<K extends MessageKey> = MessageValues<
  MessageContent<K>
> extends Record<string, never>
  ? false
  : true;
interface TranslateFn {
  <K extends MessageKey>(
    key: ValuesRequired<K> extends true ? never : K
  ): string;

  <K extends MessageKey>(
    key: K,
    values: MessageValues<MessageContent<K>>
  ): string;
}

interface FormatMessageFn {
  <K extends MessageKey>(
    key: ValuesRequired<K> extends true ? never : K
  ): ReactElement;

  <K extends MessageKey>(
    key: K,
    values: MessageValues<MessageContent<K>>
  ): ReactElement;
}

interface UseTranslationReturn {
  locale: ReturnType<typeof useLocaleContext>["locale"];
  setLocale: ReturnType<typeof useLocaleContext>["setLocale"];
  t: TranslateFn;
  formatMessage: FormatMessageFn;
}

export const useTranslation = (): UseTranslationReturn => {
  const { locale, setLocale } = useLocaleContext();
  const intl = useIntl();

  const t: TranslateFn = <K extends MessageKey>(
    key: K,
    values?: MessageValues<MessageContent<K>>
  ) => {
    return intl.formatMessage(
      { id: key },
      values as Record<string, string | number>
    );
  };

  const formatMessage: FormatMessageFn = <K extends MessageKey>(
    key: K,
    values?: MessageValues<MessageContent<K>>
  ) => {
    return createElement(FormattedMessage, {
      id: key,
      values: values as Record<string, string | number>,
    });
  };

  return { locale, setLocale, t, formatMessage };
};
