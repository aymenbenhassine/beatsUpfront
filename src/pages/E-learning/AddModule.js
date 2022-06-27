// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { BlogNewPostForm } from '../../sections/@dashboard/blog';
import ModuleNewForm from '../../components/Profile/Artist/ModuleNewForm';

// ----------------------------------------------------------------------

export default function AddCourse() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Blog: New Module">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Module"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'List Module', href: PATH_DASHBOARD.eLearning.listmoduleartist},
            { name: 'New Module' },
          ]}
        />
        <ModuleNewForm />
      </Container>
    </Page>
  );
}
