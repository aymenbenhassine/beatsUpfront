import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components

import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { BlogNewPostForm } from '../../../sections/@dashboard/blog';
import QuizNewForm from './QuizNewForm';



// ----------------------------------------------------------------------

export default function AddQuiz() {
  const { themeStretch } = useSettings();

  useEffect(() => {
    localStorage.removeItem('addedQuiz');
  }, []);

  return (
    <Page title="Quiz: New Quiz">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add a Quiz"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Quiz' },
            { name: 'New Quiz' },
          ]}
        />
        <QuizNewForm />
      </Container>
    </Page>
  );
}
