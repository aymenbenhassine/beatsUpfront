import { sentenceCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct, addCart, onGotoStep } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsReview,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/e-commerce/product-details';
/** reviews */
import CourseDetailsReview from './reviews/CourseDetailsReview';


import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import Image from '../../components/Image';
import CourseDetailsSummary from './courseDetailsSummary';


// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'ic:round-verified-user',
  },
];

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

export default function CourseDetaile() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const location = useLocation();
  const { courseContent } = location.state;
  const [value, setValue] = useState('1');
  const { name = '' } = useParams();
  const {  error, checkout } = useSelector((state) => state.product);
  const product = {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    "cover": "https://minimal-assets-api.vercel.app/assets/images/products/product_1.jpg",
    "images": [
        "https://minimal-assets-api.vercel.app/assets/images/products/product_1.jpg",
        "https://minimal-assets-api.vercel.app/assets/images/products/product_2.jpg",
        "https://minimal-assets-api.vercel.app/assets/images/products/product_3.jpg",
        "https://minimal-assets-api.vercel.app/assets/images/products/product_4.jpg",
        "https://minimal-assets-api.vercel.app/assets/images/products/product_5.jpg",
        "https://minimal-assets-api.vercel.app/assets/images/products/product_6.jpg",
        "https://minimal-assets-api.vercel.app/assets/images/products/product_7.jpg",
        "https://minimal-assets-api.vercel.app/assets/images/products/product_8.jpg"
    ],
    "name": "Nike Air Force 1 NDESTRUKT",
    "code": "38BEE270",
    "sku": "WW75K5210YW/SV",
    "tags": [
        "Dangal",
        "The Sting",
        "2001: A Space Odyssey",
        "Singin' in the Rain"
    ],
    "price": 16.19,
    "priceSale": 16.19,
    "totalRating": 2.5,
    "totalReview": 7860,
    "ratings": [
        {
            "name": "1 Star",
            "starCount": 1364,
            "reviewCount": 6112
        },
        {
            "name": "2 Star",
            "starCount": 3251,
            "reviewCount": 166
        },
        {
            "name": "3 Star",
            "starCount": 566,
            "reviewCount": 9326
        },
        {
            "name": "4 Star",
            "starCount": 7691,
            "reviewCount": 1792
        },
        {
            "name": "5 Star",
            "starCount": 839,
            "reviewCount": 4696
        }
    ],
    "reviews": [
        {
            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
            "name": "Jayvion Simon",
            "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg",
            "comment": "Assumenda nam repudiandae rerum fugiat vel maxime.",
            "rating": 2.5,
            "isPurchased": true,
            "helpful": 5391,
            "postedAt": "2022-04-05T23:46:14.942Z"
        },
        {
            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
            "name": "Lucian Obrien",
            "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg",
            "comment": "Quis veniam aut saepe aliquid nulla.",
            "rating": 2,
            "isPurchased": true,
            "helpful": 2545,
            "postedAt": "2022-04-04T22:46:14.942Z"
        },
        {
            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
            "name": "Deja Brady",
            "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_3.jpg",
            "comment": "Reprehenderit ut voluptas sapiente ratione nostrum est.",
            "rating": 4.9,
            "isPurchased": true,
            "helpful": 4109,
            "postedAt": "2022-04-03T21:46:14.942Z"
        },
        {
            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
            "name": "Harrison Stein",
            "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_4.jpg",
            "comment": "Error ut sit vel molestias velit.",
            "rating": 2,
            "isPurchased": false,
            "helpful": 8966,
            "postedAt": "2022-04-02T20:46:14.942Z"
        },
        {
            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
            "name": "Reece Chung",
            "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg",
            "comment": "Quo quia sit nihil nemo doloremque et.",
            "rating": 4,
            "isPurchased": false,
            "helpful": 2268,
            "postedAt": "2022-04-01T19:46:14.942Z"
        },
        {
            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
            "name": "Lainey Davidson",
            "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_6.jpg",
            "comment": "Autem doloribus harum vero laborum.",
            "rating": 5,
            "isPurchased": true,
            "helpful": 4403,
            "postedAt": "2022-03-31T18:46:14.942Z"
        },
        {
            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
            "name": "Cristopher Cardenas",
            "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_7.jpg",
            "comment": "Tempora officiis consequuntur architecto nostrum autem nam adipisci.",
            "rating": 4.9,
            "isPurchased": false,
            "helpful": 1333,
            "postedAt": "2022-03-30T17:46:14.942Z"
        },
        {
            "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
            "name": "Melanie Noble",
            "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_8.jpg",
            "comment": "Voluptas sunt magni adipisci praesentium saepe.",
            "rating": 5,
            "isPurchased": false,
            "helpful": 9371,
            "postedAt": "2022-03-29T16:46:14.942Z"
        }
    ],
    "status": "sale",
    "inventoryType": "in_stock",
    "sizes": [
        "6",
        "7",
        "8",
        "8.5",
        "9",
        "9.5",
        "10",
        "10.5",
        "11",
        "11.5",
        "12",
        "13"
    ],
    "available": 97,
    "description": "\n<p><strong><small> SPECIFICATION</small></strong></p>\n<p>Leather panels. Laces. Rounded toe. Rubber sole.\n<br /><br />\n<p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>\n<p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>\n",
    "sold": 515,
    "createdAt": "2022-04-05T23:46:14.942Z",
    "category": "Apparel",
    "gender": "Men",
    "colors": [
        "#00AB55",
        "#000000"
    ]
}


  const handleAddCart = (product) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page title="E-learning: Course Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Course Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Learning',
              href: PATH_DASHBOARD.eLearning.lists,
            },
           
            { name: courseContent.title },

          ]}
        />


        {product && (
          <>
           <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  {/* <ProductDetailsCarousel product={product} /> */}
                  <Box sx={{ p: 1 }}>
                    <Box sx={{ zIndex: 0, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
                      <Image
                        alt="large image"
                        src={courseContent.imageUrl}

                        ratio="1/1"
                        sx={{ cursor: 'zoom-in' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <CourseDetailsSummary
                    product={product}
                    course={courseContent}
                    cart={checkout.cart}
                    onAddCart={handleAddCart}
                    onGotoStep={handleGotoStep}
                  />
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                    <IconWrapperStyle>
                      <Iconify icon={item.icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
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
                  <CourseDetailsReview course={courseContent} />
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!product && <SkeletonProduct />}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}
