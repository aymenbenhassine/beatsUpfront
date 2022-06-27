// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import EventNewForm from '../../components/events/EventNewForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections


// ----------------------------------------------------------------------

export default function EventNewPost() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Event: New Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Event"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Events', href: PATH_DASHBOARD.blog.root },
            { name: 'New Event' },
          ]}
        />

        <EventNewForm />
        
      </Container>
    </Page>
  );
}
