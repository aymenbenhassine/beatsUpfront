// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import MusicNewForm from '../../components/Profile/Artist/MusicNewForm';

// ----------------------------------------------------------------------

export default function AddNewMusic() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Music: New Music">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new music"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'New Music' },
          ]}
        />

        <MusicNewForm />
      </Container>
    </Page>
  );
}
