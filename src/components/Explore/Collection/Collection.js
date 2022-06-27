import PropTypes from 'prop-types';
import React from 'react';
import { paramCase } from 'change-case';
// @mui
import { Card, Avatar, Box, Button, Typography, Link, CardContent, Stack, CardActions } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
import Image from '../../Image';
import TextMaxLine from '../../TextMaxLine';
import SvgIconStyle from '../../SvgIconStyle';
import { likeCollection } from '../../../redux/actions/collections';
import { useStyles } from './styles';

const Collection = ({ collection }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const classes = useStyles();
  
  return (
    <Card elevation={6}>
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
          alt={user?.result.username}
          src={user?.result.imageUrl}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />
        <Image alt="cover" src={collection.cover} ratio="4/3" />
      </Box>

      <div className={classes.details}>
        <TextMaxLine variant="body2" color="textSecondary" component="h2" line={1}>
          {collection.tags.map((tag) => `#${tag} `)}
        </TextMaxLine>
      </div>

      <CollectionContent collection={collection} />
    </Card>
  );
};

CollectionContent.propTypes = {
  collection: PropTypes.object,
  index: PropTypes.number,
};

export function CollectionContent({ collection, index }) {
  // --------------------------------------------------------
  const isDesktop = useResponsive('up', 'md');
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const linkTo = `/dashboard/music/collection/${paramCase(collection.title)}`;

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const Likes = () => {
    if (collection.likes.length > 0) {
      return collection.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {collection.likes.length > 2
            ? `You and ${collection.likes.length - 1} others`
            : `${collection.likes.length} like${collection.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{collection.likes.length} {collection.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <CardContent
      sx={{
        // pt: 4.5,
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
        {fDate(collection.createdAt)}
      </Typography>

      <Link to={linkTo} color="inherit" component={RouterLink} state={{ single: collection }}>
        <TextMaxLine variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'} line={1} persistent>
          {collection.title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-start"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likeCollection(collection._id, user?.result?.googleId || user?.result?._id))}
          >
            <Likes />
          </Button>
        </CardActions>
      </Stack>
    </CardContent>
  );
}

export default Collection;
