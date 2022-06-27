
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';


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
import QuestionUpdateForm from './QuestionUpdateForm';
import ListQuestion from './listQuestion'


// ----------------------------------------------------------------------

export default function UpdateQuestion() {
  const { themeStretch } = useSettings();
  const location = useLocation();
  const { questionToUpdate } = location.state;
  console.log(questionToUpdate)

  /* const location = useLocation();
  const { quiz } = location.state ;
  console.log("quiz :")
  console.log(quiz) */ 
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
        <QuestionUpdateForm question={questionToUpdate} />
      </Container>
    </Page>
  );
}
