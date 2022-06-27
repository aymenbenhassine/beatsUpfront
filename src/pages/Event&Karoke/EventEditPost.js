// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import EventEditForm from '../../components/events/EventEditForm';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections


// ----------------------------------------------------------------------

export default function EventEditPost() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Event: Update Event">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Update an Event"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Events', href: PATH_DASHBOARD.blog.root },
            { name: 'Update Event' },
          ]}
        />

        <EventEditForm />
        
      </Container>
    </Page>
  );
}
