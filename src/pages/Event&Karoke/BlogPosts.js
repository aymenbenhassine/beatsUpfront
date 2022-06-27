import orderBy from 'lodash/orderBy';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { Grid, Button, Container, Stack, CircularProgress } from '@mui/material';
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
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';
import EventPostCard from '../../components/events/EventPostCard';
import { getEvents } from '../../redux/actions/events';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

export default function BlogPosts() {

  const dispatch = useDispatch();

  useEffect(() => {
    getEvents(dispatch);
  }, [dispatch]);

  const Events = useSelector((state) => state.Events)
  console.log(Events);

  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3002/Events');

      if (isMountedRef.current) {
        setPosts(response.data.posts);
      }
    } catch (error) {
      console.error(error);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Event: Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Event"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Event', href: PATH_DASHBOARD.event.root },
            { name: 'Posts' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.event.newPost}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Event
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>
{
        !Events.length ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {Events.map((Event) => (
          <Grid key={Event._id} item xs={12} sm={4} md={4}>
            <EventPostCard event={Event} index={"index"} />
          </Grid>
        ))}
      </Grid>
    )}
                
        
      </Container>
    </Page>
  );
}
