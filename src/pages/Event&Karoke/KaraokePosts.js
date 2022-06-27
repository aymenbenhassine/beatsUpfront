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
import KaraokePostCard from '../../components/events/KaraokePostCard';
import { getKaraokes } from '../../redux/actions/karaoke';

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
    getKaraokes(dispatch);
  }, [dispatch]);

  const Karaokes = useSelector((state) => state.Karaokes)
  console.log(Karaokes);

  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const getAllPosts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3002/Karaokes');

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
    <Page title="Karaoke: Songs">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Karaoke"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Karaoke', href: PATH_DASHBOARD.karaoke.root },
            { name: 'Songs' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.karaoke.newPost}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New Karaoke
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>
{
        !Karaokes.length ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {Karaokes.map((Karaoke) => (
          <Grid key={Karaoke._id} item xs={12} sm={4} md={4}>
            <KaraokePostCard karaoke={Karaoke} index={"index"} />
          
          </Grid>
           
        ))}
      </Grid>
    )}
                
        
      </Container>
    </Page>
  );
}
