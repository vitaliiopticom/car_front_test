import { FC } from 'react';

import { DataView, Page, PaginationAdapter } from '@/components/shared';
import { useTranslation } from '@/i18n';
import { useDisclosure } from '@/hooks';
import { data } from './data';
import { Button } from '@/components/elements';
import { ProductFormModal } from '../components/ProductFormModal';
import { ProductList } from '../components/ProductList';
import {
  PRODUCT_DATA_VIEW_ID,
  productListFiltersDefaultValues,
} from '../constant';
import { Novu } from '@novu/node';

const test = async () => {
  const novu = new Novu('ba58edc09c767102085ac3787b543f39');

  const a = await novu.subscribers.getGlobalPreference('subscriberId');
  console.log(a);
};

/**
 * Renders the product page.
 * @returns The product page component.
 */
export const ProductPage: FC = () => {
  const { t } = useTranslation();
  const createModal = useDisclosure();

  return (
    <Page
      title={t('common.optiproduct')}
      actions={
        <Button onClick={createModal.onOpen}>{t('product.addNew')}</Button>
      }
    >
      <PaginationAdapter data={data || []} id={PRODUCT_DATA_VIEW_ID}>
        {(pageData) => (
          <DataView
            data={pageData}
            filterDefaultValues={productListFiltersDefaultValues}
            id={PRODUCT_DATA_VIEW_ID}
            isFetching={false}
            isLoading={false}
            recordsCount={data?.length}
          >
            <ProductList />
          </DataView>
        )}
      </PaginationAdapter>
      <ProductFormModal
        isOpen={createModal.isOpen}
        onClose={createModal.onClose}
        title={'common.addNew'}
        onSubmit={createModal.onClose}
      />
      <button onClick={test}>
        <span>Click me</span>
      </button>
    </Page>
  );
};
