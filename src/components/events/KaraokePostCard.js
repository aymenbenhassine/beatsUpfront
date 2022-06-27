import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {Button, Box, Link, Card, Avatar, Typography, CardContent, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fDate } from '../../utils/formatTime';
import { fShortenNumber } from '../../utils/formatNumber';
// components
import Image from '../Image';
import Iconify from '../Iconify';
import TextMaxLine from '../TextMaxLine';
import TextIconLabel from '../TextIconLabel';
import SvgIconStyle from '../SvgIconStyle';

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

KaraokePostCard.propTypes = {
  Karaoke: PropTypes.object,
};

export default function KaraokePostCard({ karaoke, index }) {
  const isDesktop = useResponsive('up', 'md');

  const { KaraokeName, KaraokeHost, Karaokephoto, Karaokelyrics, Karaokemp3, createdAt } = karaoke;

  const latestPost = index === 0 || index === 1 || index === 2;


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
          alt={KaraokeHost}
          src={""}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />
        <Image alt="cover" src={Karaokephoto} ratio="4/3" />
      </Box>

      <PostContent title={KaraokeName} view={"100"} comment={"100"} share={"100"} createdAt={""} />
    </Card>
  );
}

// ----------------------------------------------------------------------

PostContent.propTypes = {
  createdAt: PropTypes.string,
  title: PropTypes.string,
};

export function PostContent({ title, view, comment, share, createdAt, index }) {
  const isDesktop = useResponsive('up', 'md');

  const linkTo = `${PATH_DASHBOARD.karaoke.root}/post/${paramCase(title)}`;

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
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
        {""}
      </Typography>

      <Link to={linkTo} color="inherit" component={RouterLink}>
        <TextMaxLine variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'} line={2} persistent>
          {title}
        </TextMaxLine>
      </Link>
      <Button
          flexWrap="wrap"
           variant="contained"
           component={RouterLink}
           to={""} 
         >
           Play this song
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
