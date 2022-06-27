// @mui
import { Box, Container } from '@mui/material';
import Image from '../../components/Image';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogNewPostForm } from '../../sections/@dashboard/blog';
import CourceNewForm from '../../components/Profile/Artist/CourceNewForm';



// ----------------------------------------------------------------------

export default function AddCourse() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new course"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'E-Learning', href: PATH_DASHBOARD.eLearning.listsArtist },
            { name: 'New Course' },
          ]}
        />   
        <CourceNewForm />
      </Container>
    </Page>
  );
}
