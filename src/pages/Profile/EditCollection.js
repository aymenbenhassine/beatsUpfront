// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import CollectionEditForm from '../../components/Profile/Artist/CollectionEditForm';

// ----------------------------------------------------------------------

export default function EditCollection() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Collection: New Collection">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit collection"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: 'Edit Collection' },
          ]}
        />

        <CollectionEditForm />
      </Container>
    </Page>
  );
}
