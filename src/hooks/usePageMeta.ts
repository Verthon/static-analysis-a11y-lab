import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
}

export const usePageMeta = ({ title, description }: PageMeta): void => {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );

    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }

    metaDescription.content = description;

    return () => {
      document.title = '';
      if (metaDescription) {
        metaDescription.content = '';
      }
    };
  }, [title, description]);
};
