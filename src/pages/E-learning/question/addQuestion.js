import { useLocation } from 'react-router';

import PropTypes from 'prop-types';
import { useNavigate , Link as RouterLink} from 'react-router-dom';

// @mui
import { Button, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';

// sections
import { BlogNewPostForm } from '../../../sections/@dashboard/blog';
import QuestionNewForm from './QuestionNewForm';
import ListQuestion from './listQuestion'


// ----------------------------------------------------------------------

export default function AddQuestion() {
  const { themeStretch } = useSettings();
  const location = useLocation();

  /* const location = useLocation();
  const { quiz } = location.state ;
  console.log("quiz :")
  console.log(quiz) */ 
  const quiz = JSON.parse(localStorage.getItem('addedQuiz'));
  console.log(quiz)
  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
          heading="Add Your Questions Here"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Quiz' },
            { name: 'New Question' },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.eLearning.addmodule}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              Add another module
            </Button>}
        />
        <QuestionNewForm />
      </Container>
      <ListQuestion quiz={quiz} />
    </Page>
  );
}
