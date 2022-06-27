import orderBy from 'lodash/orderBy';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paramCase } from 'change-case';


// @mui
import PropTypes from 'prop-types';
import {
  CardHeader,
  Grid,
  Button,
  Container,
  Stack,
  CircularProgress,
  Box,
  Card,
  Typography,
  Link,
} from '@mui/material';
import ReactPlayer from 'react-player';


import Scrollbar from '../../components/Scrollbar';

// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';

// utils
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { SkeletonPostItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { CourseArtistPostCard, BlogPostsSort, BlogPostsSearch } from '../../sections/@dashboard/blog';
import Image from '../../components/Image';
import { EcommerceLatestProducts } from '../../sections/@dashboard/general/e-commerce';
import ListModuleUser from './ListModuleUser';
import ChatWidget from './liveChat/chatWidget';
import { getModulesByIdCource } from '../../redux/actions/E-LearningActions/modules';

function CourseContentUser() {
  const { themeStretch } = useSettings();
  const location = useLocation();
  const { courseContent } = location.state;
  console.log('state courseContent ');
  console.log(courseContent);
  const [ModuleData, setModuleData] = useState({
    _id: '',
    title: '',
    description: '',
  });

  const dispatch = useDispatch();
  useEffect(() => {
    // getModules(dispatch);
    // getModulesByIdCource(dispatch,single._id);
    // mod._id =""
    dispatch(getModulesByIdCource(courseContent._id));
  }, [dispatch]);

  const modules = useSelector((state) => state.module);

  const handleClickModule = (module) => {
    setModuleData(module);
  };


  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={courseContent.title}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'E-learning', href: PATH_DASHBOARD.eLearning.lists },
            { name: courseContent.title },
          ]}
          

        />
        <Grid container spacing={3}>
          <Grid item xs={12} spacing={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={9}>
                <Card sx={{ p: 3 }} style={{ height: 400, width: 700 }}>
                  <Box sx={{ position: 'relative' }}>
                    <ReactPlayer url={ModuleData.videoURL} controls="true" />
                  </Box>
                  <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    {' '}
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} md={3} height={5}>
                <Card style={{ height: 400 }}>
                  <CardHeader title="Modules" />
                  <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
                      {modules.map((module) => (
                        <Stack key={module._id} direction="row" spacing={2}>
                          <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                            <Button onClick={() => handleClickModule(module)}>{module.title}</Button>

                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Scrollbar>
                </Card>
              </Grid>
              <Grid item xs={12} md={9}>
                <Card sx={{ p: 3 }} style={{ width: 700 }}>

                  <Typography variant="h3">{ModuleData.title}</Typography>
                  <Typography variant="h5">
                    {ModuleData.description}
                  </Typography>
                  {ModuleData._id !== '' && (
                    <Typography variant="h5">
                      <Button
                        variant="contained"
                        component={RouterLink}
                        to={PATH_DASHBOARD.eLearning.respondToQuiz}
                        state={{ module: ModuleData }}
                      >
                        Check your skills
                      </Button>
                    </Typography>)}

                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <ChatWidget />
    </Page>
  );
}
export default CourseContentUser;
