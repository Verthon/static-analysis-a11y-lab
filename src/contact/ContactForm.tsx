import { useReducer } from 'react';
import { Form } from '@base-ui-components/react/form';
import { Field } from '@base-ui-components/react/field';
import { Select } from '@base-ui-components/react/select';
import { useLocale } from '../i18n/useLocale';

interface ContactFormData {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}

type FormState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success' }
  | { status: 'error'; errors: Record<string, string> };

type FormAction =
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; errors: Record<string, string> }
  | { type: 'RESET' };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SUBMIT':
      return { status: 'loading' };
    case 'SUCCESS':
      return { status: 'success' };
    case 'ERROR':
      return { status: 'error', errors: action.errors };
    case 'RESET':
      return { status: 'idle' };
    default:
      return state;
  }
};

export const ContactForm = () => {
  const { t } = useLocale();
  const [state, dispatch] = useReducer(formReducer, { status: 'idle' });

  const inquiryOptions = [
    { value: 'general', label: t('contact.form.inquiry.general') },
    { value: 'problem', label: t('contact.form.inquiry.problem') },
    { value: 'feedback', label: t('contact.form.inquiry.feedback') },
    { value: 'other', label: t('contact.form.inquiry.other') },
  ];

  return (
    <Form
      className="flex w-full max-w-2xl flex-col gap-6"
      errors={state.status === 'error' ? state.errors : {}}
      onClearErrors={() => dispatch({ type: 'RESET' })}
      onSubmit={async (event) => {
        event.preventDefault();
        dispatch({ type: 'SUBMIT' });

        const formData = new FormData(event.currentTarget);

        const name = formData.get('name');
        const email = formData.get('email');
        const inquiryType = formData.get('inquiryType');
        const message = formData.get('message');

        if (
          typeof name !== 'string' ||
          typeof email !== 'string' ||
          typeof inquiryType !== 'string' ||
          typeof message !== 'string'
        ) {
          dispatch({
            type: 'ERROR',
            errors: { form: 'Invalid form data' },
          });
          return;
        }

        const data: ContactFormData = {
          name,
          email,
          inquiryType,
          message,
        };

        await new Promise((resolve) => setTimeout(resolve, 800));

        console.log('Form submitted:', data);
        dispatch({ type: 'SUCCESS' });

        event.currentTarget.reset();

        setTimeout(() => {
          dispatch({ type: 'RESET' });
        }, 3000);
      }}
    >
      <Field.Root name="name" className="flex flex-col items-start gap-2">
        <Field.Label className="text-sm font-medium text-gray-900">
          {t('contact.form.name.label')}
        </Field.Label>
        <Field.Control
          type="text"
          required
          placeholder={t('contact.form.name.placeholder')}
          className="h-11 w-full rounded-md border border-gray-300 px-4 text-base text-gray-900 transition-colors hover:border-gray-400 focus:border-blue-800 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />
        <Field.Error className="text-sm text-red-800" />
      </Field.Root>

      <Field.Root name="email" className="flex flex-col items-start gap-2">
        <Field.Label className="text-sm font-medium text-gray-900">
          {t('contact.form.email.label')}
        </Field.Label>
        <Field.Control
          type="email"
          required
          placeholder={t('contact.form.email.placeholder')}
          className="h-11 w-full rounded-md border border-gray-300 px-4 text-base text-gray-900 transition-colors hover:border-gray-400 focus:border-blue-800 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />
        <Field.Error className="text-sm text-red-800" />
      </Field.Root>

      <Field.Root name="inquiryType" className="flex flex-col items-start gap-2">
        <Field.Label className="text-sm font-medium text-gray-900">
          {t('contact.form.inquiry.label')}
        </Field.Label>
        <Select.Root name="inquiryType" items={inquiryOptions} required>
          <Select.Trigger className="flex h-11 w-full items-center justify-between gap-3 rounded-md border border-gray-300 px-4 text-base text-gray-900 select-none transition-colors hover:border-gray-400 hover:bg-gray-50 focus-visible:border-blue-800 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 data-popup-open:bg-gray-50 cursor-default">
            <Select.Value />
            <Select.Icon className="flex">▼</Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner className="outline-none select-none z-10" sideOffset={8}>
              <Select.Popup className="origin-(--transform-origin) bg-clip-padding rounded-md bg-white text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200">
                <Select.List className="relative py-1 overflow-y-auto max-h-96">
                  {inquiryOptions.map(({ label, value }) => (
                    <Select.Item
                      key={value}
                      value={value}
                      className="grid min-w-full cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900"
                    >
                      <Select.ItemIndicator className="col-start-1">✓</Select.ItemIndicator>
                      <Select.ItemText className="col-start-2">{label}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
        <Field.Error className="text-sm text-red-800" />
      </Field.Root>

      <Field.Root name="message" className="flex flex-col items-start gap-2">
        <Field.Label className="text-sm font-medium text-gray-900">
          {t('contact.form.message.label')}
        </Field.Label>
        <Field.Control
          render={(props) => (
            <textarea
              {...props}
              required
              rows={5}
              placeholder={t('contact.form.message.placeholder')}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-base text-gray-900 transition-colors hover:border-gray-400 focus:border-blue-800 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800 resize-vertical"
            />
          )}
        />
        <Field.Error className="text-sm text-red-800" />
      </Field.Root>

      <button
        disabled={state.status === 'loading'}
        type="submit"
        className="flex h-12 items-center justify-center rounded-md border border-gray-300 bg-gray-900 px-6 text-base font-medium text-white select-none transition-colors hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800 active:bg-gray-950 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      >
        {state.status === 'loading' ? t('common.loading') : t('contact.form.submit')}
      </button>

      {state.status === 'success' && (
        <output className="p-4 bg-green-100 text-green-900 rounded-md text-base font-medium border border-green-300">
          {t('contact.form.success')}
        </output>
      )}
    </Form>
  );
};
