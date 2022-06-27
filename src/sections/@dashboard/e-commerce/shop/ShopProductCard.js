import { useState } from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  produit: PropTypes.object,
};

export default function ShopProductCard({ produit, product }) {
  console.log("produit");
  console.log(produit);
  // const { name, cover, price, colors, status, priceSale } = product;

  const linkTo = `${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(produit._id)}`;
  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        
          <Label
            variant="filled"
            color={(produit.status === 'used' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {produit.status}
          </Label>
  
        <Image alt={produit.name} src={produit.image} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link 
        to= {`${PATH_DASHBOARD.eCommerce.root}/productDetails/${paramCase(produit._id)}`}
        color="inherit" 
        component={RouterLink}
        state={{ single : produit }}
        >
          <Typography variant="subtitle2" noWrap>
            {produit.name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
        &nbsp;
          <Stack direction="row" spacing={0.5}>
            { produit.oldPrice !==0 &&
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {produit.oldPrice} DT
              </Typography>
            }

            <Typography variant="subtitle1">&nbsp;{produit.price} DT</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
