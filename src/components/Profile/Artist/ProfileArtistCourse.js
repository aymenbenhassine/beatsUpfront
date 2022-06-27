import { paramCase } from 'change-case';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

// react-player
import VideoPlayer from 'react-video-js-player';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  IconButton,
  Typography,
  CardContent,
  Grid,
  Button,
  Link,
  Stack,
  InputUnstyled,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import * as api from '../../../redux/api';

import InputStyle from '../../InputStyle';
import { BlogPostsSearch } from '../../../sections/@dashboard/blog';

import { UserListHead, UserListToolbar } from '../../../sections/@dashboard/user/list'; // utils
import { fDate } from '../../../utils/formatTime';
import cssStyles from '../../../utils/cssStyles';
// components
import Image from '../../Image';
import Iconify from '../../Iconify';
import LightboxModal from '../../LightboxModal';
import { deleteCourse, getCoursesByIdUser, ScrapingCourses } from '../../../redux/actions/E-LearningActions/courses';

import { PATH_DASHBOARD } from '../../../routes/paths';
import { MusicContext } from '../../../contexts/musicContext/MusicContext';
import { getMusics } from '../../../contexts/musicContext/apiCalls';

// ----------------------------------------------------------------------

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
}));

// ----------------------------------------------------------------------

export default function ProfileArtistCourse() {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    dispatch(getCoursesByIdUser(user?.result?.googleId || user?.result?._id));
  }, [dispatch]);
  const courses = useSelector((state) => state.cources);

  const [openLightbox, setOpenLightbox] = useState(false);

 

  return (
    <Box sx={{ mt: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Course
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_DASHBOARD.eLearning.add}
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            New Course
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            component={RouterLink}
            to={PATH_DASHBOARD.eLearning.Scrapingcourses}
            startIcon={<Iconify icon={'vscode-icons:file-type-python'} />}
          >
            Scrap course
          </Button>
        </Grid>
      </Grid>
      
      <Card sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {courses.map((course) => (
            <Grid key={course._id} item>
              <GalleryItem course={course} />
            </Grid>
          ))}
        </Box>
      </Card>
    </Box>
  );
}

// ----------------------------------------------------------------------

GalleryItem.propTypes = {
  course: PropTypes.object,
};

function GalleryItem({ course }) {
  const dispatch = useDispatch();

  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      <Link
        to={`/dashboard/e-learning/listmoduleartist`}
        color="inherit"
        component={RouterLink}
        state={{ courseToEdit: course }}
      >
        <Image alt="gallery image" ratio="1/1" src={course.imageUrl} />
      </Link>
      <CaptionStyle>
        <div>
          <Typography variant="subtitle1">{course.title}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            &nbsp;
          </Typography>
        </div>
        {/* <IconButton color="inherit">
          <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
        </IconButton> */}
        <Button
          size="small"
          color="primary"
          component={RouterLink}
          to={`/dashboard/e-learning/update/${paramCase(course.title)}`}
          state={{ courseToEdit: course }}
        >
          <EditIcon fontSize="small" /> &nbsp;Edit
        </Button>
        <Button size="small" color="primary" onClick={() => dispatch(deleteCourse(course._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CaptionStyle>
    </Card>
  );
}
