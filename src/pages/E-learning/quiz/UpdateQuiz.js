import {  useLocation, Link as RouterLink  } from 'react-router-dom';

import { useEffect } from 'react';
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
import QuizUpdateForm from './QuizUpdateForm';


// ----------------------------------------------------------------------

export default function UpdateQuiz() {
  const { themeStretch } = useSettings();
  const location = useLocation();
  
  const quizToEdit  = location.state;
  console.log("updating quiz")
  console.log(quizToEdit)
  console.log(location)

  useEffect(async () => {
    /* quiz = await quizToEdit ;
    console.log("quiz")
    console.log(quiz) */
    // localStorage.removeItem('addedQuiz');
  }, []);

  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'New Post' },
          ]}
        />
        <QuizUpdateForm quiz={quizToEdit} />
      </Container>
    </Page>
  );
}
