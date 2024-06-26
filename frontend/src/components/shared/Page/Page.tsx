import { FC, ReactNode } from 'react';

import { Heading } from '@/components/elements';
import { DocumentTitle, useDocumentTitle } from '@/hooks';
import { cx } from '@/utils/classNames';

import { BackButton } from './elements/BackButton';

export type PageProps = {
  children: ReactNode;
  title?: ReactNode;
  documentTitle?: DocumentTitle;
  actions?: ReactNode;
  isHeaderSticky?: boolean;
  headerContent?: ReactNode;
  backButton?: string | boolean;
  className?: string;
};

export const Page: FC<PageProps> = ({
  children,
  title,
  documentTitle,
  actions,
  isHeaderSticky,
  headerContent,
  backButton,
  className,
}) => {
  useDocumentTitle(documentTitle || (title as DocumentTitle));

  return (
    <>
      {(title || actions) && (
        <div
          className={cx(
            'border-b border-gray-50 bg-white p-6 lg:rounded-tl-2xl',
            isHeaderSticky && 'sticky top-[70px] z-10',
            className,
          )}
          id="pageHeader"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {backButton && title && (
                <BackButton
                  backButtonRoute={
                    typeof backButton === 'string' ? backButton : undefined
                  }
                />
              )}
              <Heading as="h1" variant="h2">
                {title}
              </Heading>
            </div>
            {actions && (
              <div className="flex items-center gap-3">{actions}</div>
            )}
          </div>
          {headerContent && <div className="mt-4">{headerContent}</div>}
        </div>
      )}
      <div className="min-h-layout bg-gray-10 p-6">{children}</div>
    </>
  );
};
