import PropTypes from 'prop-types';
import { paramCase } from 'change-case';

import { useSelector, useDispatch } from 'react-redux';

import { Link as RouterLink } from 'react-router-dom';
// @mui
import DeleteIcon from '@mui/icons-material/Delete';

import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Stack, Button, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import TextMaxLine from '../../../components/TextMaxLine';
import TextIconLabel from '../../../components/TextIconLabel';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { deleteCourse } from '../../../redux/actions/E-LearningActions/courses';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

CourseArtistPostCard.propTypes = {
  course: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function CourseArtistPostCard({ course }) {
  const isDesktop = useResponsive('up', 'md');

  // const { cover, title, view, comment, share, author, createdAt } = course;
  const cover = 'test';
  const title = 'test';
  const view = 'test';
  const share = 'test';
  const author = 'test';
  const createdAt = '2121-6-6';

  console.log(course);

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        
        <Avatar
          alt={course.imageUrl}
          src={course.imageUrl}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />
        <Image
          alt="cover"
          src={course.imageUrl}
          ratio="4/3"
        />
      </Box>
      <CourseArtistPostContent title={course.title} view="1" share="1" createdAt={course.creationDate}  course={course} />
    </Card>
  );
}
// <PostContent title={course.title} view={view} comment={comment} share={share} createdAt={createdAt} />
// ----------------------------------------------------------------------

CourseArtistPostContent.propTypes = {
  createdAt: PropTypes.string,
  index: PropTypes.number,
  share: PropTypes.number,
  title: PropTypes.string,
  view: PropTypes.number,
  course: PropTypes.object,
};

export function CourseArtistPostContent({ title, view, share, createdAt, index, course }) {
  const dispatch = useDispatch();
  console.log('inside course content to check id :');
  console.log(course);
  console.log(course._id);

  const isDesktop = useResponsive('up', 'md');

  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography>
      
      <Link
        to={`/dashboard/e-learning/listmoduleartist`}
        color="inherit"
        component={RouterLink}
        state ={{ courseToEdit: course }}
      >
        <TextMaxLine variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'} line={2} persistent>
          {title}
        </TextMaxLine>
      </Link>

      <Button
        size="small"
        color="primary"
        component={RouterLink}
        to={`/dashboard/e-learning/update/${paramCase(title)}`}
        state={{ courseToEdit: course }}
      >
        <EditIcon fontSize="small" /> &nbsp;Edit
      </Button>
      <Button size="small" color="primary" onClick={() => dispatch(deleteCourse(course._id))}>
        <DeleteIcon fontSize="small" /> Delete
      </Button>
      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {/* boucle for views and share icons */}
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack>
    </CardContent>
  );
}
