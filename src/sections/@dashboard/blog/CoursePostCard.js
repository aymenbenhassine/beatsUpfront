import PropTypes from 'prop-types';
import { paramCase } from 'change-case';

import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Stack, Button, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';

import { useDispatch } from '../../../redux/store';



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
import { createWish } from '../../../redux/actions/E-LearningActions/wishList';



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

CoursePostCard.propTypes = {
  course: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function CoursePostCard({ course }) {
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
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
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
        <Image alt="cover" src={course.imageUrl} ratio="4/3" />
      </Box>
      <PostContent title={course.title} view={view} share={share} createdAt={course.creationDate} course={course} />
    </Card>
  );
}
// <PostContent title={course.title} view={view} comment={comment} share={share} createdAt={createdAt} />
// ----------------------------------------------------------------------

PostContent.propTypes = {
  createdAt: PropTypes.string,
  index: PropTypes.number,
  share: PropTypes.number,
  title: PropTypes.string,
  view: PropTypes.number,
  course: PropTypes.object,
};

export function PostContent({ title, view, share, createdAt, index, course }) {
  const isDesktop = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const user = JSON.parse(localStorage.getItem('profile'));

  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];


  const handleAddToWishlist= (idCourse) => {
    const userId = (user?.result?.googleId || user?.result?._id)
    const wish = {
      user: userId,
      course: idCourse,
    };
    console.log(wish);
    dispatch(createWish(wish));
    enqueueSnackbar('course added to wishlist');
    window.location.reload(false);
  };
  

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

      <TextMaxLine variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'} line={2} persistent>
        {title}
      </TextMaxLine>
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Button
          fullWidth
          size="small"
          color="warning"
          variant="contained"
          startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
          onClick={()=>{handleAddToWishlist(course._id)}}
        >
          Add to WishList
        </Button>
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            to={`/dashboard/e-learning/coursedetails`}
            component={RouterLink}
            state={{ courseContent: course }}
          >
            Start Course
          </Button>
      </Stack>

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
