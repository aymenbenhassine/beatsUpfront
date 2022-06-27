import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../sections/@dashboard/user/profile';
import ProfileArtistCollection from '../../components/Profile/Artist/ProfileArtistCollection';
import ProfileArtistMusic from '../../components/Profile/Artist/ProfileArtistMusic';
import ProfileArtistCourse from '../../components/Profile/Artist/ProfileArtistCourse';


import { getCollections } from '../../redux/actions/collections';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function ArtistProfile() {
  const { themeStretch } = useSettings();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const [currentTab, setCurrentTab] = useState('profile');
  const [findFriends, setFindFriends] = useState('');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };

  // ----------------------------------------------------------

  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    getCollections(dispatch);
  }, [dispatch]);

  const { collections } = useSelector((state) => state.collections);

  // ----------------------------------------------------------

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds} />,
    },
    // {
    //   value: 'followers',
    //   icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
    //   component: <ProfileFollowers followers={_userFollowers} />,
    // },
    // {
    //   value: 'friends',
    //   icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
    //   component: <ProfileFriends friends={_userFriends} findFriends={findFriends} onFindFriends={handleFindFriends} />,
    // },
    // {
    //   value: 'gallery',
    //   icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
    //   component: <ProfileGallery gallery={_userGallery} />,
    // },
    {
      value: 'Collections',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileArtistCollection collections={collections} setCurrentId={setCurrentId} />,
    },
    {
      value: 'Musics',
      icon: <Iconify icon={'bi:music-note-beamed'} width={20} height={20} />,
      component: <ProfileArtistMusic />,
    },
    {
      value: 'Events',
      icon: <Iconify icon={'bi:calendar-event-fill'} width={20} height={20} />,
      component: <ProfileArtistMusic />,
    },
    {
      value: 'Karaoke',
      icon: <Iconify icon={'maki:karaoke'} width={20} height={20} />,
      component: <ProfileArtistMusic />,
    },
    {
      value: 'Music Course',
      icon: <Iconify icon={'bi:music-note-list'} width={20} height={20} />,
      component: <ProfileArtistCourse />,

    },
    // lien mte3 el icons https://icon-sets.iconify.design/
  ];

  return (
    <Page title="Artist: Profile">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Artist', href: PATH_DASHBOARD.artist.root },
            { name: user?.result?.name || user?.result?.username },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={_userAbout} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
