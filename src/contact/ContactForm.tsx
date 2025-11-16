import { useState } from 'react';
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

export const ContactForm = () => {
  const { t } = useLocale();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const inquiryOptions = [
    { value: 'general', label: t('contact.form.inquiry.general') },
    { value: 'problem', label: t('contact.form.inquiry.problem') },
    { value: 'feedback', label: t('contact.form.inquiry.feedback') },
    { value: 'other', label: t('contact.form.inquiry.other') },
  ];

  return (
    <Form
      className="flex w-full max-w-2xl flex-col gap-4"
      errors={errors}
      onClearErrors={setErrors}
      onSubmit={async (event) => {
        event.preventDefault();
        setLoading(true);
        setSubmitSuccess(false);

        const formData = new FormData(event.currentTarget);
        const data: ContactFormData = {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          inquiryType: formData.get('inquiryType') as string,
          message: formData.get('message') as string,
        };

        await new Promise((resolve) => setTimeout(resolve, 800));

        console.log('Form submitted:', data);
        setLoading(false);
        setSubmitSuccess(true);

        event.currentTarget.reset();

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }}
    >
      <Field.Root name="name" className="flex flex-col items-start gap-1">
        <Field.Label className="text-sm font-medium text-gray-900">
          {t('contact.form.name.label')}
        </Field.Label>
        <Field.Control
          type="text"
          required
          placeholder={t('contact.form.name.placeholder')}
          className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />
        <Field.Error className="text-sm text-red-800" />
      </Field.Root>

      <Field.Root name="email" className="flex flex-col items-start gap-1">
        <Field.Label className="text-sm font-medium text-gray-900">
          {t('contact.form.email.label')}
        </Field.Label>
        <Field.Control
          type="email"
          required
          placeholder={t('contact.form.email.placeholder')}
          className="h-10 w-full rounded-md border border-gray-200 pl-3.5 text-base text-gray-900 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800"
        />
        <Field.Error className="text-sm text-red-800" />
      </Field.Root>

      <Field.Root name="inquiryType" className="flex flex-col items-start gap-1">
        <Field.Label className="text-sm font-medium text-gray-900">
          {t('contact.form.inquiry.label')}
        </Field.Label>
        <Select.Root name="inquiryType" items={inquiryOptions} required>
          <Select.Trigger className="flex h-10 w-full items-center justify-between gap-3 rounded-md border border-gray-200 pr-3 pl-3.5 text-base text-gray-900 select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 data-popup-open:bg-gray-100 cursor-default">
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

      <Field.Root name="message" className="flex flex-col items-start gap-1">
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
              className="w-full rounded-md border border-gray-200 px-3.5 py-2 text-base text-gray-900 focus:outline-2 focus:-outline-offset-1 focus:outline-blue-800 resize-vertical"
            />
          )}
        />
        <Field.Error className="text-sm text-red-800" />
      </Field.Root>

      <button
        disabled={loading}
        type="submit"
        className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none hover:bg-gray-100 focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-blue-800 active:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
      >
        {loading ? t('common.loading') : t('contact.form.submit')}
      </button>

      {submitSuccess && (
        <output className="p-3 bg-green-100 text-green-800 rounded-md text-sm">
          {t('contact.form.success')}
        </output>
      )}
    </Form>
  );
};
