import { useEffect, useState, useCallback } from 'react';
import { sentenceCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Divider, Container, Tab, Typography, Pagination, Grid } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// utils
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../components/skeleton';
// sections
// import {
//   BlogPostHero,
//   BlogPostTags,
//   BlogPostRecent,
//   BlogPostCommentList,
//   BlogPostCommentForm,
// } from '../../sections/@dashboard/blog';
import CollectionDetailsHero from '../../components/Explore/CollectionDetails/CollectionDetailsHero';
import MusicTable from '../../components/Explore/CollectionDetails/MusicTable';

// ----------------------------------------------------------------------

export default function CollectionDetails() {
  const { themeStretch } = useSettings();

  const [value, setValue] = useState('1');

  const PRODUCT_DESCRIPTION = [
    {
      title: '100% Original',
      description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
      icon: 'ic:round-verified',
    },
    {
      title: '10 Day Replacement',
      description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
      icon: 'cib:ethereum',
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
  // -----------------------------------------------------------------
  const isMountedRef = useIsMountedRef();

  const location = useLocation();

  const { single } = location.state;

  console.log(single)

  const { title } = useParams();

  const [recentPosts, setRecentPosts] = useState([]);

  const [post, setPost] = useState(null);

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/post', {
        params: { title },
      });

      if (isMountedRef.current) {
        setPost(response.data.post);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [isMountedRef, title]);

  const getRecentPosts = useCallback(async () => {
    try {
      const response = await axios.get('/api/blog/posts/recent', {
        params: { title },
      });

      if (isMountedRef.current) {
        setRecentPosts(response.data.recentPosts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef, title]);

  useEffect(() => {
    getPost();
    getRecentPosts();
  }, [getRecentPosts, getPost]);

  return (
    <Page title="Blog: Post Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Collection Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(single.title) },
          ]}
        />

        {single && (
          <Card>
            <CollectionDetailsHero single={single} />
            <Divider />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <MusicTable single={single} />
            </Box>
            {/* <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h4" sx={{ mb: 5 }}>
                Description:
              </Typography>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {single.desc}
              </Typography>
            </Box> */}
            {/*
              <Markdown children={post.body} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments.length})
                </Typography>
              </Box>

              <BlogPostCommentList post={post} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={8} color="primary" />
              </Box>

              <BlogPostCommentForm />
            </Box> */}
          </Card>
        )}

        {!single && !error && <SkeletonPost />}

        {/* {error && <Typography variant="h6">404 {error}!</Typography>} */}

        {/* <BlogPostRecent posts={recentPosts} /> */}

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
                  // label={`Review (${product.reviews.length})`}
                  sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                />
              </TabList>
            </Box>

            <Divider />

            <TabPanel value="1">
              <Box sx={{ p: 3 }}>
                <Markdown children={single.desc} />
              </Box>
            </TabPanel>
            <TabPanel value="2">{/* <ProductDetailsReview product={product} /> */}</TabPanel>
            <TabPanel value="3">{/* <ProductDetailsReview product={product} /> */}</TabPanel>
          </TabContext>
        </Card>
      </Container>
    </Page>
  );
}
