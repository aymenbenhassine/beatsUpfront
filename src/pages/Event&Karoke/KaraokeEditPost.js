// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import KaraokeEditForm from '../../components/events/KaraokeEditForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections


// ----------------------------------------------------------------------

export default function KaraokeEditPost() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Karaoke: Update Karaoke">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Update an Karaoke"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Karaoke', href: PATH_DASHBOARD.blog.root },
            { name: 'Update Karaoke' },
          ]}
        />

        <KaraokeEditForm />
        
      </Container>
    </Page>
  );
}
