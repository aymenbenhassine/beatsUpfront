
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import { Container, CircularProgress, Grid } from '@mui/material';
// hooks
import useSettings from '../../../hooks/useSettings';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections

import QuestionCardAdmin from './QuestionCardAdmin';
// ----------------------------------------------------------------------




// ----------------------------------------------------------------------


export default function ListCourses({quiz}) {
  const dispatch = useDispatch();
  /* const location = useLocation();
    const { quiz } = location.state ;
    console.log("quiz :")
    console.log(quiz) */
  const { themeStretch } = useSettings();
  console.log(quiz)

  const isMountedRef = useIsMountedRef();







  return (
    <Page title="Quiz: Questions">
      <Container maxWidth={themeStretch ? false : 'lg'}>

        <HeaderBreadcrumbs
          heading="Questions"
          links={[
            {},
          ]}
        />

      </Container>

      <Grid alignItems="stretch" spacing={3}>
        <QuestionCardAdmin quiz={quiz} />
      </Grid>

    </Page>
  );
}
