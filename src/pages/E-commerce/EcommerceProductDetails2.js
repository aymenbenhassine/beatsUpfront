import { sentenceCase } from 'change-case';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import {
  Box, Tab, Card, Grid, Divider, Container, IconButton,
  Button, Stack, Typography, Rating
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// form
import { Controller, useForm } from 'react-hook-form';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, addCart, onGotoStep } from '../../redux/slices/product';
// utils
import { fShortenNumber, fCurrency } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Label from '../../components/Label';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// import Markdown from '../../components/Markdown';
// import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
// sections
// import {
//   ProductDetailsSummary,
//   ProductDetailsReview,
// } from '../../sections/@dashboard/e-commerce/product-details';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import Image from '../../components/Image';
// import { addToCart } from 'src/redux/actions/E-commerceActions/cartActions';
// import { ConnectedTvOutlined } from '@mui/icons-material';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

export default function EcommerceProductDetails2() {
  const theme = useTheme();
  const location = useLocation();
  const { single } = location.state;
  const singleId = single._id;

  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { name = '' } = useParams();
  const { product, error, checkout } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const defaultValues = {
  };

  const [qte, setQte] = useState(1);
  const [itemsData, setItemsData] = useState({
    name: single.name,
    status: single.status,
    description: single.description,
    image: single.image,
    countInStock: single.countInStock,
    price: single.price,
    oldPrice: single.oldPrice,
    category: single.category,
  });

  const onSubmit = async (data) => {
    try {
      // if (!alreadyProduct) {
      //   onAddCart({
      //     ...data,
      //     subtotal: data.price * data.quantity,
      //   });
      // }
      setCartItems([...cartItems, qte]);
      onGotoStep(0);
      navigate(PATH_DASHBOARD.eCommerce.checkout, { state: { cartItems } });

    } catch (error) {
      console.error(error);
    }
  };

  const methods = useForm({
    defaultValues,
  });

  const { watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  console.log("details");
  console.log(single);

  // useEffect(() => {
  //   dispatch(getProduct(name));
  // }, [dispatch, name]);

  const handleAddCart = (product) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  return (
    <Page title="Ecommerce: Product Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            {
              name: 'Shop',
              href: PATH_DASHBOARD.eCommerce.shop,
            },
            { name: single.name },
          ]}
        />

        <CartWidget />

        {single && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <Box sx={{ p: 1 }}>
                    <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                      <Image
                        alt="large image"
                        src={single.image}
                        ratio="1/1"
                        sx={{ cursor: 'zoom-in' }}
                      />
                      )
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <RootStyle>
                    <Label
                      variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                      // color={single.inStock === 'in_stock' ? 'success' : 'error'}
                      color={single.countInStock === 0 ? 'error' : 'success'}
                      sx={{ textTransform: 'uppercase' }}
                    >
                      {single.countInStock === 0 ? 'out of Stock' : 'in Stock'
                      }
                    </Label>
                    <Typography
                      variant="overline"
                      sx={{
                        mt: 2,
                        mb: 1,
                        display: 'block',
                        color: single.status === 'used' ? 'error.main' : 'info.main',
                      }}
                    >
                      {single.status} Product
                    </Typography>

                    <Typography variant="h3" paragraph>
                      {single.name}
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                      <Rating value={single.numReviews} precision={0.1} readOnly />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        ({fShortenNumber(single.numReviews)}&nbsp;
                        reviews)
                      </Typography>
                    </Stack>

                    <Typography variant="h4" sx={{ mb: 3 }}>
                      {
                        single.oldPrice !== 0 &&

                        <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                          {single.oldPrice} DT
                        </Box>
                      }
                      &nbsp; &nbsp;{single.price} DT
                    </Typography>

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <Grid>
                      <Typography variant="h6" paragraph>
                        Description
                      </Typography>
                      {single.description}
                    </Grid>
                    <Divider sx={{ borderStyle: 'dashed' }} />



                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

                      {single.countInStock !== 0 &&
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>

                          <Typography variant="subtitle1" sx={{ mt: 3 }}>
                            Quantity
                          </Typography>

                          <Typography sx={{ mt: 3 }}>
                            <Incrementer
                              name="quantity"
                              quantity={values.quantity}
                              // available={available}
                              onIncrementQuantity={() => setValue('quantity', values.quantity + 1)}
                              onDecrementQuantity={() => setValue('quantity', values.quantity - 1)}
                            />
                            {/* <RHFTextField
                            name="name"
                            value={qte}
                            onChange={(e) => setQte(e.target.value)}
                            /> */}
                          </Typography>
                          <Typography variant="caption" component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
                            Available: {single.countInStock}
                            {/* {user.result.username} */}
                          </Typography>

                        </Stack>
                      }
                      <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
                        <Button
                          fullWidth
                          // disabled={isMaxQuantity}
                          size="large"
                          color="warning"
                          variant="contained"
                        // onClick={handleAddCart}
                        >
                          Add to Wishlist
                        </Button>

                        {single.countInStock !== 0 &&
                          <Button
                            fullWidth
                            size="large"
                            type="submit"
                            sx={{ whiteSpace: 'nowrap' }}
                            startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
                            variant="contained">
                            Add To Cart
                          </Button>
                        }
                      </Stack>
                    </FormProvider>
                    {/* <ProductDetailsSummary
                    single={single}
                    product={product}
                    cart={checkout.cart}
                    onAddCart={handleAddCart}
                    onGotoStep={handleGotoStep}
                  /> */}
                  </RootStyle>
                </Grid>
              </Grid>
            </Card>
            {/* <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="Description" />
                    <Tab
                      disableRipple
                      value="2"
                      label={`Review (${product.reviews.length})`}
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <ProductDetailsReview product={product} />
                </TabPanel>
              </TabContext>
            </Card> */}
          </>
        )}

        {/* {!product && <SkeletonProduct />}

        {error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrementQuantity, onDecrementQuantity }) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
