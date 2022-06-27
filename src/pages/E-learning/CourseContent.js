import orderBy from 'lodash/orderBy';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';


// @mui
import { Grid, Button, Container, Stack, CircularProgress, Box, Card, Typography } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';

// utils
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { SkeletonPostItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CourseArtistPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';
import Image from '../../components/Image';
import { EcommerceLatestProducts } from '../../sections/@dashboard/general/e-commerce';
import ListModuleUser from './ListModuleUser';

function CourseContent() {
  const { themeStretch } = useSettings();
  const location = useLocation();
  const { modul } = location.state;
  console.log('state module ');
  console.log(modul);
  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Blog"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Profile', href: PATH_DASHBOARD.artist.profile },

            { name: 'Courses' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.blog.newPost}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Course
            </Button>
          }
        />
        <Grid container >
          <Grid item xs={12} spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Box sx={{ position: 'relative' }}>
                    <ReactPlayer url={modul.videoURL} controls="true" />
                  </Box>
                  
                </Card>
              </Grid>

              <Grid item xs={12} md={8}>

                <Card sx={{ p: 3 }}>
                  <Typography variant="h3">{modul.title}</Typography>
                  <Typography variant="h5">{modul.content}</Typography>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default CourseContent;
