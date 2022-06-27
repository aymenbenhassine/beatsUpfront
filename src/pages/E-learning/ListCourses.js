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
import { BlogPostsSort, BlogPostsSearch, CoursePostCard } from '../../sections/@dashboard/blog';

import { getCourses } from '../../redux/actions/E-LearningActions/courses';

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

export default function ListCourses() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };
  useEffect(() => {
    getCourses(dispatch);
  }, [dispatch]);
  const courses = useSelector((state) => state.cources);
  console.log(courses);
  /*
  <Grid container spacing={3}>
          {(!courses.length ? [...Array(12)] : sortedPosts).map((course, index) =>
            course ? (
              <Grid key={course.id} item xs={12} sm={6} md={3}>
                <BlogPostCard course={course} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
  */
  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Courses"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Learning',
              href: PATH_DASHBOARD.eLearning.lists,
            },
            { name: 'Courses' },
          ]}
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">

          <BlogPostsSearch />
          <BlogPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>
        {!courses.length ? (
          <CircularProgress />
        ) : (
          <Grid container alignItems="stretch" spacing={3}>
            {courses.map((course) => (
              <Grid key={course._id} item xs={12} sm={3} md={3}>
                <CoursePostCard course={course} />
              </Grid>
            ))}
          </Grid>
        )}

      </Container>
    </Page>
  );
}
