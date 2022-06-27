// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import KaraokeNewForm from '../../components/events/KaraokeNewForm'; 
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections


// ----------------------------------------------------------------------

export default function KaraokeNewPost() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Karaoke: New Karaoke">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Karaoke"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Karaokes', href: PATH_DASHBOARD.blog.root },
            { name: 'New Karaoke' },
          ]}
        />

        <KaraokeNewForm />
        
      </Container>
    </Page>
  );
}
