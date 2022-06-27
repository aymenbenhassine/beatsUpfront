import { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProduits } from '../../redux/actions/E-commerceActions/productActions';
import { getProducts, filterProducts } from '../../redux/slices/product';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ShopProductList,
  ShopProductSearch,
} from '../../sections/@dashboard/e-commerce/shop';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const {filters } = useSelector((state) => state.product);

  const defaultValues = {
    gender: filters.gender,
    category: filters.category,
    colors: filters.colors,
    priceRange: filters.priceRange,
    rating: filters.rating,
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch } = methods;

  const values = watch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(values));
  }, [dispatch, values]);

  useEffect(() => {
    getProduits(dispatch);
  }, [dispatch]);
  const produits = useSelector((state) => state.produits);
  // console.log(produits);;

  return (
    <Page title="Beats'up Shop">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Beats'up Shop"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: 'Shop' },
          ]}
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />
        </Stack>

        <ShopProductList produits={produits} />
        <CartWidget />
      </Container>
    </Page>
  );
}